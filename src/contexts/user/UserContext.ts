import { createContext } from 'react'

export type UserState = UserSummary | null

const UserContext = createContext<UserState>(null)

export default UserContext
