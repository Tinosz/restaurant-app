import axiosClient from "../axios-client";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './Styles/LoginStyles.css';

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
      <div className="flex justify-center align-middle my-10">
        <form style={{ ...styles.signUpForm, opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20%, 0)', }} onSubmit={onSubmit}>
          <h1 className="Young-serif-font" style={{ ...styles.title}}>Create your Account!</h1><br></br>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Username:</label>
            {errors && errors.username && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.username[0]}</p>
              </div>
            )}
            <div>
              <input ref={usernameRef} placeholder="Username" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.nameGroup}>
              <div style={styles.nameInput}>
                <label className="Karla-font" style={{ ...styles.label}}>First Name:</label>
                {errors && errors.first_name && (
                  <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                    <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.first_name[0]}</p>
                  </div>
                )}
                <input ref={firstNameRef} placeholder="Your First Name" style={{ ...styles.input, fontFamily: 'Karla' }} />
              </div>
              <div style={styles.nameInput}>
                <label style={{ ...styles.label, fontFamily: 'Karla' }}>Last Name:</label>
                {errors && errors.last_name && (
                  <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                    <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.last_name[0]}</p>
                  </div>
                )}
                <input ref={lastNameRef} placeholder="Your Last Name" style={{ ...styles.input, fontFamily: 'Karla' }} />
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Email:</label>
            {errors && errors.email && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.email[0]}</p>
              </div>
            )}
            <div>
              <input ref={emailRef} placeholder="Email" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Gender:</label>
            {errors && errors.gender && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.gender[0]}</p>
              </div>
            )}
            <div style={styles.radioGroup}>
              <div style={styles.radioOption}>
                <input className="mr-4" type="radio" name="gender" value="Male" ref={maleGenderRef} />
                <label className="Lora-font" style={{ ...styles.radioLabel, fontFamily: 'Karla' }}>Male</label>
              </div>
              <div style={styles.radioOption}>
                <input className="mr-4" type= "radio" name="gender" value="Female" ref={femaleGenderRef} />
                <label className="Karla-font" style={{ ...styles.radioLabel }}>Female</label>
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Date of Birth:</label>
            {errors && errors.date_of_birth && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.date_of_birth[0]}</p>
              </div>
            )}
            <div>
              <input ref={dateOfBirthRef} type="date" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Password (Min. 8 Characters):</label>
            {errors && errors.password && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.password[0]}</p>
              </div>
            )}
            <div>
              <input ref={passwordRef} type="password" placeholder="Enter your Password" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontFamily: 'Karla' }}>Password Confirmation:</label>
            {errors && errors.password_confirmation && (
              <div className="bg-red-300 rounded-xl p-2 my-2 border-red-600">
                <p className="text-red-600" style={{ ...styles.karlaText, fontFamily: 'Karla' }}>{errors.password_confirmation[0]}</p>
              </div>
            )}
            <div>
              <input ref={passwordConfirmationRef} type="password" placeholder="Re-enter your password" style={{ ...styles.input, fontFamily: 'Karla' }} />
            </div>
          </div>
          <button style={{ ...styles.button, fontFamily: 'Karla' }}>Sign Up</button>
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={{ ...styles.orText }}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p className="Karla-font" style={{ ...styles.text, fontFamily: 'Karla' }}>
              Have an Account?{" "}
              <a className="Young-serif-font" style={{ ...styles.link, color:"#7a3320" }} href="/Login">
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
    backgroundColor: "#5E1219",
  },

  signUpForm: {
    backgroundColor: "#fefcff",
    padding: "5%",
    borderRadius: "8px",
    width: "450px",
    marginTop: "",
    textAlign: "left",
    transition: "opacity 1s, transform 2s",
  },
  title: {
    color: "#2a1c1",
    fontSize: "30px",
  },
  label: {
    color: "#2a1c1c",
    fontSize: "20px",
  },
  nameGroup: {
    display: "flex",
    justifyContent: "space between",
  },
  nameInput: {
    flex: 1,
    paddingRight: "10px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    border: "2px solid #2a1c1c",
    borderRadius: "10px",
    padding: "5px",
    color: "#2a1c1c",
    fontSize: "20px",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#2a1c1c",
    border: "2px solid #2a1c1c",
    width: "100%",
    borderRadius: "20px",
    fontSize: "20px",
    padding: "3px",
    marginTop: "20px",
  },
  text: {
    color: "#2a1c1c",
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
    color: "#2a1c1c",
    fontSize: "20px",
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
