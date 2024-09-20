import { useState, useEffect, useCallback } from 'react'
import { fetchUserData } from '~/services/api'
import { transformUserData } from './utils/transformers'
import { useUser, useSetUserAction } from '~/contexts/user/hooks'

const useFetchUserData = (userId: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const user = useUser()
    const setUser = useSetUserAction()

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const userData = await fetchUserData(userId)
            const userSummary = transformUserData(userData)
            console.log(userSummary)
            setUser(userSummary)
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { user, isLoading, error }
}

export default useFetchUserData
