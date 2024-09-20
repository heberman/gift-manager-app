import { useState } from 'react'
import { addNewGiftee } from '~/services/api'

const useAddGiftee = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const addGiftee = async (userId: string, newGiftee: NewGiftee) => {
        setIsLoading(true)
        setError(null)

        let result: GifteeMeta | null = null
        try {
            result = await addNewGiftee(userId, newGiftee)
            console.log(result)
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        }

        setIsLoading(false)
        return result
    }

    return { addGiftee, isLoading, error }
}

export default useAddGiftee
