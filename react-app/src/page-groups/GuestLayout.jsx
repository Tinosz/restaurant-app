import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

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
        <h1>
            You are in the Guest Section
        </h1>
        <Outlet />
        </>
    )
}