import { useRef, useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

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
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);  

  return (
    <div style={styles.pageContainer}>
      <div
        style={{
          ...styles.loginBox,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)',
        }}
      >
        <h1 style={styles.title}>Sign in to your account</h1><br></br>
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
          <button style={{ ...styles.button, ...styles.hoverButton }}>Sign In</button>
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={styles.orText}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p style={styles.text}>
              Don't have an account? <a href="/SignUp" style={{ ...styles.link, ...styles.hoverLink }}>Sign Up here.</a>
            </p>
            <p style={styles.text}>
              Are you an Admin? <a href="/AdminLogin" style={{ ...styles.link, ...styles.hoverLink }}>Log In here.</a>
            </p>
          </div>
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
    backgroundColor: "#957964",
  },
  loginBox: {
    border: "none",
    padding: "1%",
    borderRadius: "8px",
    width: "400px",
    backgroundColor: "#5E1219",
    textAlign: "left",
    transition: "opacity 1s, transform 1s",
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
    border: "1px solid #fff",
    borderRadius: "4px",
    padding: "10px",
    color: "#fff",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#5E1219",
    width: "100%",
    borderRadius: "20px",
  },
  orLine: {
    display: "flex",
    alignItems: "center",
  },
  orCircle: {
    flex: "1",
    borderBottom: "1px solid #fff",
  },
  orText: {
    color: "#fff",
    padding: "10px",
  },
  centeredText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginTop: "10px",
  },
  link: {
    color: "#fff",
    transition: "color 0.3s",
  },
  hoverButton: {
    cursor: "pointer",
  },
  hoverLink: {
    cursor: "pointer",
  },
};

// Definisi keyframes di luar objek styles
const keyframes = {
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translate3d(0, -20%, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  },
};
