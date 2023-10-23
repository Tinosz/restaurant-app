import adminAxiosClient from "../axios-admin-client";
import { useRef, useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";

import './Styles/MenuStyles.css';

export default function AdminLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

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
      <div style={{
          ...styles.loginBox,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)',
        }}
      >
        <h1 className="Young-serif-font" style={{...styles.title}}>Sign in to the Admin Account</h1><br></br>
        <form onSubmit={onSubmit}>
          <div style={styles.inputGroup}>
            <label className="Karla-font" style={{...styles.label}}>Admin Username:</label>
            {errors && errors.username && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{fontFamily: 'Karla'}}>{errors.username[0]}</p>
              </div>
            )}
            <div>
              <input
                ref={usernameRef}
                placeholder="Enter the Admin Username"
                style={{...styles.input}}
                className="Lora-font"
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{...styles.label, fontFamily: 'Karla'}}>Password:</label>
            <div>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter the Password"
                style={{...styles.input, fontFamily: 'Karla', outline: 'none'}}
              />
            </div>
          </div>
          <button style={{...styles.button, fontFamily: 'Karla'}}>Sign In</button>

          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={styles.orText}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p className="Karla-font" style={{...styles.text}}>
              Are you a User?{" "}
              <a className="Young-serif-font" style={{...styles.link, color:"#7a3320"}} href="/Login">
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
    backgroundColor: "#5E1219",
  },
  loginBox: {
    border: "none",
    padding: "1%",
    borderRadius: "8px",
    width: "400px",
    backgroundColor: "#fefcff",
    textAlign: "left",
    transition: "opacity 1s, transform 1s",
  },
  title: {
    color: "#2a1c1c",
    fontWeight: "bold",
    fontSize: "30px",
  },
  label: {
    color: "#2a1c1c",
    fontSize: "20px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    border: "2px solid #2a1c1c",
    borderRadius: "10px",
    padding: "10px",
    color: "#2a1c1c",
    fontSize: "20px",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    border: "2px solid #2a1c1c",
    padding: "3px",
    color: "#fff",
    width: "100%",
    borderRadius: "20px",
    fontSize: "20px",
  },
  centeredText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "#2a1c1c",
    marginTop: "10px",
    fontSize: "20px",
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
    borderBottom: "1px solid #2a1c1c",
  },
  orText: {
    color: "#2a1c1c",
    padding: "10px",
  },
};

const keyframes = {
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translate3d(0, -20%, 0)',
      '-webkit-transform': 'translate3d(0, -20%, 0)', 
      '-moz-transform': 'translate3d(0, -20%, 0)',    
      '-ms-transform': 'translate3d(0, -20%, 0)',    
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      '-webkit-transform': 'translate3d(0, 0, 0)',
      '-moz-transform': 'translate3d(0, 0, 0)',
      '-ms-transform': 'translate3d(0, 0, 0)',
    },
  },
};
