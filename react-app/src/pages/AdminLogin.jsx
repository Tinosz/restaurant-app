import adminAxiosClient from "../axios-admin-client";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";

export default function AdminLogin () {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setAdminToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null)
        adminAxiosClient.post('adminlogin', payload)
        .then(({data}) => {
            setUser(data.admin)
            setAdminToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        username: [response.data.message]
                    })
                }
            }
        })
    }

    return (
        <>
        <h1>Sign in to the Admin Account</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Admin Username:
                </label>
                {errors && errors.username && (
                    <p className="text-red-600">{errors.username[0]}</p>
                )}
                <div>
                    <input ref={usernameRef} placeholder="Enter the Admin Username"/>
                </div>
            </div>
            <div>
                <label>
                    Password
                </label>
                <div>
                    <input ref={passwordRef} type="password" placeholder="Enter the Password"/>
                </div>
            </div>
            <button>
                Sign In
            </button>
            <p>
            Are you a User?{" "}
                <a style={{ margin: "10px 0" }} href="/Login">Log In here.</a>
            </p>
        </form>
        </>
    )    
}