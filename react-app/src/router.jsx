import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./page-groups/GuestLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Food from "./pages/Food";
import Drinks from "./pages/Drinks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserLayout from "./page-groups/UserLayout";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import AdminLayout from "./page-groups/AdminLayout";
import EditMenu from "./pages/EditMenu";
import AboutUs from "./pages/AboutUs";
import EditProfile from "./pages/EditProfile";
import AdminLogin from "./pages/AdminLogin";
import AccessableLayout from "./page-groups/AccessibleLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AccessableLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/Menu',
                element: <Menu />
            },
            {
                path: '/Menu/Food',
                element: <Food />
            },
            {
                path: '/Menu/Drinks',
                element: <Drinks />
            },
            {
                path: '/AboutUs',
                element: <AboutUs />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/Login',
                element: <Login />
            },
            {
                path: '/Signup',
                element: <SignUp />
            },
            {
                path: '/AdminLogin',
                element: <AdminLogin />
            }
            
        ]
    },
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/Order',
                element: <Order />
            },
            {
                path: '/OrderHistory',
                element: <OrderHistory />
            },
            {
                path: '/EditProfile',
                element: <EditProfile />
            }
        ]
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/EditMenu',
                element: <EditMenu />
            }
        ]
    }


])

export default router;