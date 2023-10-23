import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AdminLayout() {
    const {adminToken} = useStateContext();
    if(!adminToken) {
        return <Navigate to="/" />
    }

    return(
        <>
        <Outlet />
        </>
    )

}