import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Login () {
    const loginRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            login: loginRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null)
        axiosClient.post('login', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        login: [response.data.message]
                    })
                }
            }
        })
    }

    return (
        <>
        <h1>Sign in to your account</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Email/Username:
                </label>
                {errors && errors.login && (
                    <p className="text-red-600">{errors.login[0]}</p>
                )}
                <div>
                    <input ref={loginRef} placeholder="Enter your Email/Username"/>
                </div>
            </div>
            <div>
                <label>
                    Password
                </label>
                {errors && errors.password && (
                    <p className="text-red-600">{errors.password[0]}</p>
                )}
                <div>
                    <input ref={passwordRef} type="password" placeholder="Enter your Password"/>
                </div>
            </div>
            <button>
                Sign In
            </button>
            <p>
                Don't have an account?{" "}
                <a style={{ margin: "10px 0" }} href="/SignUp">Sign Up here.</a>
            </p>
            <p>
            Are you an Admin?{" "}
                <a style={{ margin: "10px 0" }} href="/AdminLogin">Log In here.</a>
            </p>
        </form>
        </>
    )    
}