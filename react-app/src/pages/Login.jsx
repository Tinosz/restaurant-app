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
          animation: "fadeInUp 1s",
          opacity: isVisible ? 1 : 0
        }}
      >
        <h1 style={{ ...styles.title, fontFamily: 'Lora' }}>Sign in to your account</h1><br></br>
        <form onSubmit={onSubmit}>
          <div style={{ ...styles.inputGroup, fontFamily: 'Karla' }}>
            <label style={styles.label}>Email/Username:</label>
            {errors && errors.login && (
              <p className="text-red-600">{errors.login[0]}</p>
            )}
            <div>
              <input
                ref={loginRef}
                placeholder="Enter your Email/Username"
                style={{...styles.input, fontFamily: 'Karla',}}
              />
            </div>
          </div>
          <div style={{ ...styles.inputGroup,fontFamily: 'Karla' }}>
            <label style={styles.label}>Password</label>
            {errors && errors.password && (
              <p className="text-red-600">{errors.password[0]}</p>
            )}
            <div>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter your Password"
                style={{...styles.input, fontFamily: 'Karla', outline: 'none', color:"white"}}
              />
            </div>
          </div>
          <button style={{ ...styles.button, ...styles.hoverButton }}>Sign In</button>
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={{...styles.orText, fontFamily: 'Karla' }}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
          <p style={{ ...styles.text, fontFamily: 'Karla' }}>
            Don't have an account? <a href="/SignUp" style={{ ...styles.link, ...styles.hoverLink, color:"#7a3320" }}>Sign Up here.</a>
          </p>
          <p style={{ ...styles.text, fontFamily: 'Karla' }}>
            Are you an Admin? <a href="/AdminLogin" style={{ ...styles.link, ...styles.hoverLink, color:"#7a3320" }}>Log In here.</a>
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
    backgroundColor: "#957964",
    textAlign: "left",
  },
  title: {
    color: "#FBEC52",
    fontWeight: "bold", // Membuat teks menjadi bold
    fontSize: "30px",
  },
  label: {
    color: "#fff", // Mengganti warna label menjadi hitam
    fontSize: "20px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "1px solid #fff",
    borderRadius: "10px",
    padding: "10px",
    color: "#fff",
    outline: 'none',
    '::placeholder': {
      color: '#fff', // Mengganti warna teks placeholder menjadi putih
    },
    fontSize: "20px",
  },
    
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#fff", // Mengganti warna tombol menjadi hitam
    width: "100%",
    borderRadius: "20px",
    fontSize: "20px",
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
    color: "#fff", // Mengganti warna teks menjadi hitam
    marginTop: "10px",
    fontsize:"20px",
  },
  link: {
    color: "#fff", // Mengganti warna tautan menjadi hitam
    transition: "color 0.3s",
  },
  hoverButton: {
    cursor: "pointer",
  },
  hoverLink: {
    cursor: "pointer",
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
