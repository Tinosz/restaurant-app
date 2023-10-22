import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AccessableLayout() {

    return(
        <>
        <Outlet />
        </>
    )

}