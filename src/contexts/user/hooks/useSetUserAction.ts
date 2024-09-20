import useUserDispatch from './useUserDispatch'

export type SetUserAction = {
    type: 'SET_USER'
    payload: UserSummary
}

const useSetUserAction = () => {
    const dispatch = useUserDispatch()
    return (userData: UserSummary) => {
        const action: SetUserAction = { type: 'SET_USER', payload: userData }
        dispatch(action)
    }
}

export default useSetUserAction
