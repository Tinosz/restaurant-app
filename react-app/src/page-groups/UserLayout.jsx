import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import NavigationBar from "../components/NavigationBar";

export default function UserLayout() {
    const {token, adminToken} = useStateContext();
    if (!token) {
        return <Navigate to="/Login" />
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