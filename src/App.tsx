import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Shell from './Shell'
import routeMap from './routes'
import { CssBaseline } from '@mui/material'
import { Global } from '@emotion/react'
import UserProvider from './contexts/user/UserProvider'

const routes = Object.values(routeMap)

const router = createBrowserRouter([
    {
        element: (
            <Shell>
                <Outlet />
            </Shell>
        ),
        children: routes,
    },
])

function App() {
    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    body: {
                        margin: 0,
                    },
                }}
            />
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </>
    )
}

export default App
