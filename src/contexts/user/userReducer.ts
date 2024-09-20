import { AddGifteeAction } from './hooks/useAddGifteeAction'
import { SetUserAction } from './hooks/useSetUserAction'
import { UserState } from './UserContext'

type Action = SetUserAction | AddGifteeAction

const userReducer = (oldState: UserState, action: Action): UserState => {
    switch (action.type) {
        case 'SET_USER': {
            const state = { ...action.payload }
            return state
        }
        case 'ADD_GIFTEE': {
            if (oldState === null) {
                throw new Error('Cannot operate on a null user')
            }
            const newState = { ...oldState, giftees: [...oldState.giftees, action.payload] }
            return newState
        }
        default: {
            throw new Error(`Unknown action: ${JSON.stringify(action)}`)
        }
    }
}

export default userReducer
