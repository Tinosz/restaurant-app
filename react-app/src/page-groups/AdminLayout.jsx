import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import NavigationBar from "../components/NavigationBar";

export default function AdminLayout() {
    const {adminToken} = useStateContext();
    if(!adminToken) {
        return <Navigate to="/" />
    }

    return(
        <>
        <NavigationBar />
        <Outlet />
        </>
    )

}