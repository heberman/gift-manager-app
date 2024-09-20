import { useState } from 'react'
import { addNewGiftIdea } from '~/services/api'

const useAddGiftIdea = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const addGiftIdea = async (userId: string, gifteeId: string, newGift: NewGift) => {
        setIsLoading(true)
        setError(null)

        let result: GiftDetails | null = null
        try {
            result = await addNewGiftIdea(userId, gifteeId, newGift)
            console.log(result)
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        }

        setIsLoading(false)
        return result
    }

    return { addGiftIdea, isLoading, error }
}

export default useAddGiftIdea
