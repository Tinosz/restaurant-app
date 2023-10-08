import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AccessableLayout() {

    return(
        <>
        <h1>
            Everyone can Access this Layout
        </h1>
        <Outlet />
        </>
    )

}