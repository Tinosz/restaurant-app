import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const maleGenderRef = useRef();
  const femaleGenderRef = useRef();
  const dateOfBirthRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const [errors, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    let selectedGender = "";
    if (maleGenderRef.current.checked) {
      selectedGender = "Male";
    } else if (femaleGenderRef.current.checked) {
      selectedGender = "Female";
    }

    const payload = {
      username: usernameRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      gender: selectedGender,
      date_of_birth: dateOfBirthRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(() => {
        navigate("/Login");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setError(response.data.errors);
        }
      });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []); 

  return (
    <div style={styles.pageContainer}>
      <div style={{ ...styles.centeredText, fontFamily: 'Karla' }}>
        <form style={{ ...styles.signUpForm, opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)', }} onSubmit={onSubmit}>
          <h1 style={{ ...styles.title, fontFamily: 'Lora' }}>Create your Account!</h1><br></br>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Username:</label>
            {errors && errors.username && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.username[0]}</p>
            )}
            <div>
              <input ref={usernameRef} placeholder="Username" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.nameGroup}>
              <div style={styles.nameInput}>
                <label style={{ ...styles.label, fontFamily: 'Karla' }}>First Name:</label>
                {errors && errors.first_name && (
                  <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.first_name[0]}</p>
                )}
                <input ref={firstNameRef} placeholder="Your First Name" style={{ ...styles.input, fontFamily: 'Karla' }} />
              </div>
              <div style={styles.nameInput}>
                <label style={{ ...styles.label, fontFamily: 'Karla' }}>Last Name:</label>
                {errors && errors.last_name && (
                  <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.last_name[0]}</p>
                )}
                <input ref={lastNameRef} placeholder="Your Last Name" style={{ ...styles.input, fontFamily: 'Karla' }} />
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Email:</label>
            {errors && errors.email && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.email[0]}</p>
            )}
            <div>
              <input ref={emailRef} placeholder="Email" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Gender:</label>
            {errors && errors.gender && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.gender[0]}</p>
            )}
            <div style={styles.radioGroup}>
              <div style={styles.radioOption}>
                <input type="radio" name="gender" value="Male" ref={maleGenderRef} />
                <label style={{ ...styles.radioLabel, fontFamily: 'Karla' }}>Male</label>
              </div>
              <div style={styles.radioOption}>
                <input type= "radio" name="gender" value="Female" ref={femaleGenderRef} />
                <label style={{ ...styles.radioLabel, fontFamily: 'Karla' }}>Female</label>
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Date of Birth:</label>
            {errors && errors.date_of_birth && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.date_of_birth[0]}</p>
            )}
            <div>
              <input ref={dateOfBirthRef} type="date" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Password (Min. 8 Characters):</label>
            {errors && errors.password && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.password[0]}</p>
            )}
            <div>
              <input ref={passwordRef} type="password" placeholder="Enter your Password" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Password Confirmation:</label>
            {errors && errors.password_confirmation && (
              <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.password_confirmation[0]}</p>
            )}
            <div>
              <input ref={passwordConfirmationRef} type="password" placeholder="Re-enter your password" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <button style={{ ...styles.button, fontFamily: 'Karla' }}>Sign Up</button>
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={{ ...styles.orText, fontFamily: 'Karla' }}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p style={{ ...styles.text, fontFamily: 'Karla' }}>
              Have an Account?{" "}
              <a style={{ ...styles.link, fontFamily: 'Karla', color:"#7a3320" }} href="/Login">
                Login Here.
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
    height: "120vh",
    backgroundColor: "#5E1219",
  },
  centeredText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signUpForm: {
    backgroundColor: "#957964",
    padding: "5%",
    borderRadius: "8px",
    width: "450px",
    marginTop: "",
    textAlign: "left",
    transition: "opacity 1s, transform 1s",
  },
  title: {
    color: "#FBEC52",
    fontFamily: "Lora, serif",
    fontSize: "30px",
  },
  label: {
    color: "#fff",
    fontFamily: "Karla, sans-serif",
    fontSize: "20px",
  },
  nameGroup: {
    display: "flex",
    justifyContent: "space between",
    fontFamily: "Karla, sans-serif",
  },
  nameInput: {
    flex: 1,
    paddingRight: "10px",
    fontFamily: "Karla, sans-serif",
  },
  inputGroup: {
    marginBottom: "10px",
    fontFamily: "Karla, sans-serif",
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "1px solid #fff",
    borderRadius: "4px",
    padding: "5px",
    color: "#fff",
    fontSize: "20px",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#fff",
    width: "100%",
    borderRadius: "20px",
    fontSize: "20px",
  },
  text: {
    color: "#fff",
    fontFamily: "Karla, sans-serif",
    fontSize: "20px",
  },
  radioGroup: {
    display: "flex",
    width: "auto",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto",
  },
  radioLabel: {
    color: "#fff",
    fontFamily: "Karla, sans-serif",
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