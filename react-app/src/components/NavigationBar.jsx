import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import adminAxiosClient from "../axios-admin-client";

export default function NavigationBar() {
    const { user, token, adminToken, setUser, setToken, setAdminToken } =
        useStateContext();
    const username = token
        ? user.username
        : adminToken
        ? user.username
        : "Visitor";

    const Logout = (e) => {
        e.preventDefault();
        if (token) {
            axiosClient.post("logout").then(() => {
                setUser({});
                setToken(null);
                localStorage.removeItem("order");
                window.location.href = "/";
            });
        } else if (adminToken) {
            adminAxiosClient.post("logout").then(() => {
                setUser({});
                setAdminToken(null);
                localStorage.removeItem("order");
                window.location.href = "/";
            });
        }
    };

    useEffect(() => {
        if (token) {
            axiosClient.get("/user").then(({ data }) => {
                setUser(data);
            });
        } else if (adminToken) {
            adminAxiosClient.get("/admin/user").then(({ data }) => {
                setUser(data);
            });
        }
    }, []);

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex justify-between">
                <div>
                    <a href="/">Elegante</a>
                </div>
                <div className="space-x-4">
                    <a href="/Menu" className="text-white">
                        Menu
                    </a>
                    <a href="/AboutUs" className="text-white">
                        About Us
                    </a>
                </div>
                <div className="flex space-x-4">
                    {token && 
                    <a href="/Order">Your Orders</a>
                    }
                    <div>Hello {username}!</div>
                    {token || adminToken ? (
                        <a href="/" onClick={Logout}>
                            Logout
                        </a>
                    ) : (
                        <a href="/Login">Log In</a>
                    )}
                </div>
            </div>
        </nav>
    );
}
