import { useContext } from 'react'
import UserDispatchContext from '../UserDispatchContext'

const useUserDispatch = () => useContext(UserDispatchContext)

export default useUserDispatch
