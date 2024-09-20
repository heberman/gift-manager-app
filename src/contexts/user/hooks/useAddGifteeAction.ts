import useUserDispatch from './useUserDispatch'

export type AddGifteeAction = {
    type: 'ADD_GIFTEE'
    payload: GifteeMeta
}

const useAddGifteeAction = () => {
    const dispatch = useUserDispatch()
    return (gifteeMeta: GifteeMeta) => {
        const action: AddGifteeAction = { type: 'ADD_GIFTEE', payload: gifteeMeta }
        dispatch(action)
    }
}

export default useAddGifteeAction
