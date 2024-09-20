const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
    DynamoDBDocumentClient,
    QueryCommand,
    PutCommand,
    GetCommand,
} = require('@aws-sdk/lib-dynamodb')
const crypto = require('crypto')

const client = new DynamoDBClient({
    endpoint: process.env.IS_OFFLINE ? 'http://localhost:8000' : undefined,
})
const docClient = DynamoDBDocumentClient.from(client)

const TABLE_NAME = 'gift-manager-table'

const pk = (userId) => `USER#${userId}`

const getFullUserData = async (userId) => {
    const prefixes = ['META', 'GM#', 'HM#', 'HGM#']
    const userData = {
        meta: null,
        giftees: [],
        holidays: [],
        holidayGiftees: [],
    }

    for (const prefix of prefixes) {
        const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': pk(userId),
                ':sk': prefix,
            },
        }

        const command = new QueryCommand(params)
        const result = await docClient.send(command)

        result.Items.forEach((item) => {
            const newItem = {
                ...item,
                PK: undefined,
                SK: undefined,
            }
            if (prefix === 'META') {
                userData.meta = newItem
            } else if (prefix === 'GM#') {
                userData.giftees.push(newItem)
            } else if (prefix === 'HM#') {
                userData.holidays.push(newItem)
            } else if (prefix === 'HGM#') {
                userData.holidayGiftees.push(newItem)
            }
        })
    }

    return userData
}

const addHoliday = async (userId, holidayData) => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            PK: `USER#${userId}`,
            SK: `HOLIDAY#${holidayData.date}`,
            ...holidayData,
        },
    })
    await docClient.send(command)
    return holidayData
}

const getGfitee = async (userId, gifteeId) => {
    const metaParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: pk(userId),
            SK: `GM#${gifteeId}`,
        },
    }

    const getCommand = new GetCommand(metaParams)
    const metaResult = await docClient.send(getCommand)

    if (!metaResult.Item) {
        return null
    }

    const giftee = { ...metaResult.Item, PK: undefined, SK: undefined }

    const giftsParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': pk(userId),
            ':sk': `GD#${gifteeId}#GIFT#`,
        },
    }

    const queryCommand = new QueryCommand(giftsParams)
    const giftsResult = await docClient.send(queryCommand)
    const giftIdeas = giftsResult.Items.map((gift) => ({
        ...gift,
        PK: undefined,
        SK: undefined,
        gifteeId: undefined,
    }))
    giftee.giftIdeas = giftIdeas

    return giftee
}

const addGiftee = async (userId, gifteeData) => {
    const gifteeId = crypto.randomUUID()
    const newGiftee = { ...gifteeData, id: gifteeId }
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            PK: `USER#${userId}`,
            SK: `GM#${gifteeId}`,
            ...newGiftee,
        },
    })
    await docClient.send(command)
    return newGiftee
}

const addGiftIdea = async (userId, gifteeId, giftData) => {
    const giftId = crypto.randomUUID()
    const newGift = { ...giftData, id: giftId, gifteeId }
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            PK: `USER#${userId}`,
            SK: `GD#${gifteeId}#GIFT#${giftId}`,
            ...newGift,
        },
    })
    await docClient.send(command)
    return newGift
}

exports.handler = async (event) => {
    const { httpMethod, resource, body } = event

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    }

    const userId = event.pathParameters?.userId
    const gifteeId = event.pathParameters?.gifteeId

    if (!userId) {
        response.statusCode = 400
        response.body = JSON.stringify({ error: 'Missing userId parameter' })
    }

    try {
        let result
        switch (`${httpMethod} ${resource}`) {
            case 'GET /user/{userId}':
                result = await getFullUserData(userId)

                if (!result.meta) {
                    response.statusCode = 404
                    response.body = JSON.stringify({ error: 'User not found' })
                    return response
                }

                break
            case 'POST /user/holiday':
                const holidayData = JSON.parse(body)
                result = await addHoliday(userId, holidayData)
                response.statusCode = 201
                break
            case 'GET /user/{userId}/giftee/{gifteeId}':
                if (!gifteeId) {
                    response.statusCode = 400
                    response.body = JSON.stringify({ error: 'Missing gifteeId parameter' })
                }

                result = await getGfitee(userId, gifteeId)

                if (!result) {
                    response.statusCode = 404
                    response.body = JSON.stringify({ error: 'Giftee not found' })
                    return response
                }

                break
            case 'POST /user/{userId}/giftee':
                const gifteeData = JSON.parse(body)
                result = await addGiftee(userId, gifteeData)
                response.statusCode = 201
                break
            case 'POST /user/{userId}/giftee/{gifteeId}/gift':
                const giftData = JSON.parse(body)

                if (!gifteeId) {
                    response.statusCode = 400
                    response.body = JSON.stringify({ error: 'Missing gifteeId parameter' })
                }

                result = await addGiftIdea(userId, gifteeId, giftData)
                response.statusCode = 201
                break
            default:
                throw new Error(`Unsupported route: "${httpMethod} ${resource}"`)
        }

        response.body = JSON.stringify(result)
        return response
    } catch (error) {
        console.error('Error:', error)
        response.statusCode = 500
        response.body = JSON.stringify(error)
        return response
    }
}
