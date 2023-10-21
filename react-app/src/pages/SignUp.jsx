import { useRef, useState } from "react";
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
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.centeredText}>
        <form style={styles.signUpForm} onSubmit={onSubmit}>
          <h1 style={styles.title}>Create your Account!</h1><br></br>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            {errors && errors.username && (
              <p className="text-red-600">{errors.username[0]}</p>
            )}
            <div>
              <input ref={usernameRef} placeholder="Username" style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.nameGroup}>
              <div style={styles.nameInput}>
                <label style={styles.label}>First Name:</label>
                {errors && errors.first_name && (
                  <p className="text-red-600">{errors.first_name[0]}</p>
                )}
                <input ref={firstNameRef} placeholder="Your First Name" style={styles.input} />
              </div>
              <div style={styles.nameInput}>
                <label style={styles.label}>Last Name:</label>
                {errors && errors.last_name && (
                  <p className="text-red-600">{errors.last_name[0]}</p>
                )}
                <input ref={lastNameRef} placeholder="Your Last Name" style={styles.input} />
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            {errors && errors.email && (
              <p className="text-red-600">{errors.email[0]}</p>
            )}
            <div>
              <input ref={emailRef} placeholder="Email" style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender:</label>
            {errors && errors.gender && (
              <p className="text-red-600">{errors.gender[0]}</p>
            )}
            <div style={styles.radioGroup}>
              <div style={styles.radioOption}>
                <input type="radio" name="gender" value="Male" ref={maleGenderRef} />
                <label style={styles.radioLabel}>Male</label>
              </div>
              <div style={styles.radioOption}>
                <input type="radio" name="gender" value="Female" ref={femaleGenderRef} />
                <label style={styles.radioLabel}>Female</label>
              </div>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth:</label>
            {errors && errors.date_of_birth && (
              <p className="text-red-600">{errors.date_of_birth[0]}</p>
            )}
            <div>
              <input ref={dateOfBirthRef} type="date" style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password (Min. 8 Characters):</label>
            {errors && errors.password && (
              <p className="text-red-600">{errors.password[0]}</p>
            )}
            <div>
              <input ref={passwordRef} type="password" placeholder="Enter your Password" style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password Confirmation:</label>
            {errors && errors.password_confirmation && (
              <p className="text-red-600">{errors.password_confirmation[0]}</p>
            )}
            <div>
              <input ref={passwordConfirmationRef} type="password" placeholder="Re-enter your password" style={styles.input} />
            </div>
          </div>
          <button style={styles.button}>Sign Up</button>
          <p style={styles.text}>
            Have an Account?{" "}
            <a style={styles.link} href="/Login">
              Login Here.
            </a>
          </p>
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
  centeredText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signUpForm: {
    backgroundColor: "#5E1219",
    padding: "3%",
    borderRadius: "8px",
    width: "400px",
    margin: "auto",
    marginTop: "10px",
    textAlign: "left",
    transition: "opacity 1s, transform 1s",
  },
  title: {
    color: "#fff",
  },
  label: {
    color: "#fff",
  },
  nameGroup: {
    display: "flex",
    justifyContent: "space-between",
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
  text: {
    color: "#fff",
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