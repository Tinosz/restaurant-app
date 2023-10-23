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
    <div style={styles.pageContainer}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Sign in to your account</h1>
        <form onSubmit={onSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email/Username:</label>
            {errors && errors.login && (
              <p className="text-red-600">{errors.login[0]}</p>
            )}
            <div>
              <input
                ref={loginRef}
                placeholder="Enter your Email/Username"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            {errors && errors.password && (
              <p className="text-red-600">{errors.password[0]}</p>
            )}
            <div>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter your Password"
                style={styles.input}
              />
            </div>
          </div>
          <button style={styles.button}>Sign In</button>
          <p style={{ ...styles.text, marginTop: "20px" }}>Don't have an account? <a href="/SignUp">Sign Up here.</a></p>
          <p style={styles.text}>Are you an Admin? <a href="/AdminLogin">Log In here.</a></p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#957964", // Latar belakang halaman
  },
  loginBox: {
    border: "none", // Menghilangkan border
    padding: "3%",
    borderRadius: "8px",
    width: "400px", // Lebih besar
    backgroundColor: "rgba(94, 18, 25, 0.7)", // Transparan 30%
    textAlign: "left", // Teks di kiri
  },
  title: {
    color: "#fff",
  },
  label: {
    color: "#fff",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    background: "transparent",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Transparan 30%
    color: "#5E1219",
  },
  text: {
    color: "#fff",
    marginTop: "10px",
  },
};
