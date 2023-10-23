import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useRef, useState, useEffect} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import './Styles/LoginStyles.css';

import diningPhoto from './Styles/images/dining-photo.jpg'

export default function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const [recaptchaValue, setRecaptchaValue ] = useState(null);
  const [showCaptchaWarning, setShowCaptchaWarning] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setShowCaptchaWarning(true);
      return;
    }

    setShowCaptchaWarning(false);

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
      <div className="flex justify-center align-middle" style={{...styles.WholeLoginBox, opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)',}}>
      <img className="w-2/12 h-auto object-cover rounded-tl-xl rounded-bl-xl" src={diningPhoto} />
      <div
        style={{
          ...styles.loginBox,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)',
        }}
        className="rounded-tr-xl rounded-br-xl"
      >
        <h1 className="Young-serif-font" style={{ ...styles.title}}>Sign in to your account</h1><br></br>
        <form onSubmit={onSubmit}>
          <div style={{ ...styles.inputGroup}}>
            <label className="Karla-font" style={styles.label}>Email/Username:</label>
            {showCaptchaWarning && (
              <p style={{ color: "red" }}>Please complete the reCAPTCHA before proceeding.</p>
            )}
            {errors && errors.login && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600">{errors.login[0]}</p>
              </div>
            )}
            <div>
              <input
                ref={loginRef}
                placeholder="Enter your Email/Username"
                style={{...styles.input}}
                className="Lora-font"
              />
            </div>
          </div>
          <div style={{ ...styles.inputGroup}}>
            <label className="Karla-font" style={styles.label}>Password</label>
            {errors && errors.password && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600">{errors.password[0]}</p>
              </div>
            )}
            <div>
              <input
                ref={passwordRef}
                type="password"
                className="mb-3 Lora-font"
                placeholder="Enter your Password"
                style={{...styles.input, outline: 'none'}}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ReCAPTCHA
              sitekey="6Le_ycIoAAAAAA0Xzu13S7CWTANdjwlAtDgxFiV3"
              onChange={(value) => setRecaptchaValue(value)}
            />
          </div>
          <button style={{ ...styles.button, ...styles.hoverButton, opacity: !recaptchaValue ? 0.5: 1,  cursor: !recaptchaValue ? "" : "pointer",}} disabled={!recaptchaValue}>Sign In</button>
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={{...styles.orText}}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
          <p className="Karla-font" style={{ ...styles.text, fontSize: "20px", }}>
            Don't have an account? <a className="Young-serif-font" href="/SignUp" style={{ ...styles.link, ...styles.hoverLink, color:"#7a3320" }}>Sign Up here.</a>
          </p>
          <p className="Karla-font" style={{ ...styles.text, ...styles.fontImport, fontSize: "20px", }}>
            Are you an Admin? <a className="Young-serif-font" href="/AdminLogin" style={{ ...styles.link, ...styles.hoverLink, color:"#7a3320" }}>Log In here.</a>
          </p>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

const styles = {
  WholeLoginBox: {
    transition: "opacity 1s, transform 1s",
  },
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
    width: "30rem",
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
    borderRadius: "10px",
    padding: "10px",
    color: "#2a1c1c",
    border: "2px solid #2a1c1c",
    outline: 'none',
    '::placeholder': {
      color: '#2a1c1c', 
    },
    fontSize: "20px",
  },
    
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#2a1c1c",
    border: "2px solid #2a1c1c",
    width: "100%",
    borderRadius: "20px",
    fontSize: "20px",
    marginTop: "30px",
    padding: "3px",
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
  centeredText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "#2a1c1c", 
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
  fontImport: {
    fontFamily: 'Karla, sans-serif',
    '@import': "url('https://fonts.googleapis.com/css2?family=Karla:wght@300&family=Lora:ital,wght@0,400;0,700;1,700&family=Young+Serif&display=swap')",
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

