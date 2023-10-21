import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);
    axiosClient
      .post("login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              login: [response.data.message],
            });
          }
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#957964", // Latar belakang halaman
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          backgroundColor: "rgba(94, 18, 25, 0.8)", // Transparan 80%
          textAlign: "center", // Teks di tengah
        }}
      >
        <h1 style={{ color: "#fff" }}>Sign in to your account</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label style={{ color: "#fff" }}>Email/Username:</label>
            {errors && errors.login && (
              <p className="text-red-600">{errors.login[0]}</p>
            )}
            <div>
              <input
                ref={loginRef}
                placeholder="Enter your Email/Username"
                style={{ width: "100%", background: "transparent" }}
              />
            </div>
          </div>
          <div>
            <label style={{ color: "#fff" }}>Password</label>
            {errors && errors.password && (
              <p className="text-red-600">{errors.password[0]}</p>
            )}
            <div>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter your Password"
                style={{ width: "100%", background: "transparent" }}
              />
            </div>
          </div>
          <button style={{ backgroundColor: "#fff", color: "#5E1219" }}>
            Sign In
          </button>
          <p style={{ color: "#fff", marginTop: "10px" }}>
            Don't have an account?{" "}
            <a style={{ color: "#fff" }} href="/SignUp">
              Sign Up here.
            </a>
          </p>
          <p style={{ color: "#fff" }}>
            Are you an Admin?{" "}
            <a style={{ color: "#fff" }} href="/AdminLogin">
              Log In here.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
