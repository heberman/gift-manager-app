import { RouteObject } from 'react-router-dom'
import { Home } from './pages'
import GifteeDetails from './pages/GifteeDetails'

const home: RouteObject = {
    path: '/',
    element: <Home />,
}

const gifteeDetails: RouteObject = {
    path: '/giftee/:gifteeId',
    element: <GifteeDetails />,
}

const routeMap = {
    home,
    gifteeDetails,
} as const

export default routeMap
