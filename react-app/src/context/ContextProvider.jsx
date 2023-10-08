import { createContext, useContext, useState } from "react";


//Makes it so that people can't access other pages without the token
//except the default page
const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        username: 'John'
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setAdminToken = (adminToken) => {
        _setAdminToken(adminToken);
        if (adminToken) {
            localStorage.setItem(`ADMIN_ACCESS_TOKEN`, adminToken);
        } else {
            localStorage.removeItem(`ADMIN_ACCESS_TOKEN`);
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            adminToken,
            setUser,
            setToken,
            setAdminToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)