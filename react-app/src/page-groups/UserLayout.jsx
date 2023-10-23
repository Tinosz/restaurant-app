import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

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
        <Outlet />
        </>
    )
}