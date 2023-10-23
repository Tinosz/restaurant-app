import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import adminAxiosClient from "../axios-admin-client";
import "./styles/NavigationBar.css";
import logo from "./styles/images/elegante-logo.png";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export default function NavigationBar() {
        const { user, token, adminToken, setUser, setToken, setAdminToken } =
            useStateContext();
        const username = token
            ? user.username
            : adminToken
            ? user.username
            : "Visitor";

        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        };

        const handleMobileMenuToggle = (e) => {

            e.preventDefault();

            toggleMobileMenu();
        };

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

        const currentURL = window.location.pathname;

        const navClass = currentURL === "/Menu" || currentURL === "/" ? "absolute z-10 w-full" : "";
        
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
    <nav className={`navigation-bar-color p-4 h-20 ${navClass}`}>
        <div className="nav-desktop">
            <div className="flex justify-between mx-auto h-full container"> 
                <div className="ml-0 my-auto"> 
                    <a href="/"><img className="w-20" src={logo} /></a>
                </div>
                <div className="flex items-center justify-center space-x-4 flex-1 text-center left-20 z-10 relative text-xl">
                    <div className="navigation-bar-text-color-main with-line-nav">
                        <a href="/Menu">Menu</a>
                    </div>
                    <div className="h-4 border-l border-gray-400 mx-2"></div>
                    <div className="navigation-bar-text-color-main relative with-line-nav">
                        <a href="/AboutUs">About Us</a>
                    </div>
                </div>
                <div className="flex space-x-4 my-auto mr-0 z-20">
                    {token && 
                    <>
                        <a href="/Order" className="navigation-bar-text-color-submain my-auto">
                            <span className="text-float-up-your-order">
                                Your Orders
                            </span>
                            <span className="line-navigation-bar-your-order"></span>
                        </a>
                    </>
                    }
                    <div className="navigation-bar-text-color-submain my-auto">Hello {username}!</div>
                    {token || adminToken ? (
                        <a href="/" onClick={Logout} className="navigation-bar-text-color-submain relative">
                        <span className="text-float-up">Logout</span>
                        <span className="line-navigation-bar"></span>
                    </a>
                    ) : (
                        <a href="/Login" className="navigation-bar-text-color-submain my-auto">
                            <span className="text-float-up-login">Log In</span>
                            <span className="line-navigation-bar"></span>
                            </a>
                    )}
                    
                </div>
            </div>
        </div>
        <div className="mobile-nav">
                <div className="flex">
                    <div className="ml-0 my-auto">
                        <a href="/">
                            <img className="w-20" src={logo} />
                        </a>
                    </div>
                    <div className="ml-auto flex">
                        <div className="navigation-bar-text-color-submain my-auto mr-4">
                            Hello {username}!
                        </div>
                        <div
                            className="my-auto"
                            onClick={toggleMobileMenu}
                            onTouchStart={handleMobileMenuToggle}
                        >
                            {isMobileMenuOpen ? (
                                <FontAwesomeIcon icon={faX} className="text-4xl my-auto mobile-nav" />
                            ) : (
                                <FontAwesomeIcon icon={faBars} className="text-4xl my-auto mobile-nav" />
                            )}
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className={`mobile-menu-wrapper ${isMobileMenuOpen ? 'mobile-menu-wrapper-open' : ''}`}>
                    <div className="dropdown-menu-navbar">
                        <a href="/menu" className="navigation-bar-text-color-main mb-10 text-5xl">Menu</a>
                        {token && (
                            <a href="/Order" className="navigation-bar-text-color-main mb-10 text-5xl">Your Orders</a>
                        )}
                        <a href="/AboutUs" className="navigation-bar-text-color-main mb-10 text-5xl">About Us</a>
                        {token || adminToken ? (
                            <a href="/" onClick={Logout} className="navigation-bar-text-color-main mb-10 text-5xl">
                            Log Out
                            </a>
                        ) : (
                            <a href="/Login" className="navigation-bar-text-color-main mb-10 text-5xl">Log In</a>
                        )}
                        </div>
                        <div
                        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'mobile-menu-backdrop-open' : ''}`}
                        onClick={toggleMobileMenu}
                        ></div>
                    </div> 
                )}
            </div>
    </nav>
    );
}
