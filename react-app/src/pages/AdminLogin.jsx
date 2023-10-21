import adminAxiosClient from "../axios-admin-client";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";

export default function AdminLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setAdminToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);
    adminAxiosClient
      .post("adminlogin", payload)
      .then(({ data }) => {
        setUser(data.admin);
        setAdminToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              username: [response.data.message],
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
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Sign in to the Admin Account</h1><br></br>
        <form onSubmit={onSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Username:</label>
            {errors && errors.username && (
              <p className="text-red-600">{errors.username[0]}</p>
            )}
            <div>
              <input
                ref={usernameRef}
                placeholder="Enter the Admin Username"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <div>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter the Password"
                style={styles.input}
              />
            </div>
          </div>
          <button style={styles.button}>Sign In</button>

          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={styles.orText}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p style={styles.text}>
              Are you a User?{" "}
              <a style={styles.link} href="/Login">
                Log In here.
              </a>
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
};

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