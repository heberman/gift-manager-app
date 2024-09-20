import { createContext, type Dispatch } from 'react'
import userReducer from './userReducer'

const UserDispatchContext = createContext<Dispatch<Parameters<typeof userReducer>[1]>>(() => {})

export default UserDispatchContext
