import { useReducer, type PropsWithChildren } from 'react'
import reducer from './userReducer'
import UserContext from './UserContext'
import UserDispatchContext from './UserDispatchContext'

function UserProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, null)

    return (
        <UserContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider
