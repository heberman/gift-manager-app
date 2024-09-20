import { useState, useEffect, useCallback } from 'react'
import { fetchGifteeData } from '~/services/api'

const useFetchGifteeData = (userId: string, gifteeId: string) => {
    const [giftee, setGiftee] = useState<GifteeDetails | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const gifteeData = await fetchGifteeData(userId, gifteeId)
            console.log(gifteeData)
            setGiftee(gifteeData)
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setIsLoading(false)
        }
    }, [userId, gifteeId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { giftee, isLoading, error }
}

export default useFetchGifteeData
