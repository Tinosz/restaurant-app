import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import NavigationBar from "../components/NavigationBar";

export default function GuestLayout() {
    const {token, adminToken} = useStateContext();
    if (token) {
        return <Navigate to="/" />
    }
    if (adminToken) {
        return <Navigate to="/" />
    }
    return(
        <>
        <NavigationBar />
        <Outlet />
        </>
    )
}