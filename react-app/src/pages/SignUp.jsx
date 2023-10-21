import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
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

  const styles = {
    pageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#957964",
    },
    signUpForm: {
      backgroundColor: "#5E1219",
      padding: "1%",
      borderRadius: "8px",
      width: "400px",
      margin: "auto", // Tengah horisontal
      marginTop: "100px", // Atur jarak dari atas
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
    // ... (Gaya yang lain)
  };

  return (
    <div style={styles.pageContainer}>
      <div>
        <h1 style={styles.title}>Create your Account!</h1>
        <form style={styles.signUpForm} onSubmit={onSubmit}>
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
            <label style={styles.label}>First Name:</label>
            {errors && errors.first_name && (
              <p className="text-red-600">{errors.first_name[0]}</p>
            )}
            <div>
              <input ref={firstNameRef} placeholder="Your First Name" style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name:</label>
            {errors && errors.last_name && (
              <p className="text-red-600">{errors.last_name[0]}</p>
            )}
            <div>
              <input ref={lastNameRef} placeholder="Your Last Name" style={styles.input} />
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
            <div>
              <label>
                Male
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  ref={maleGenderRef}
                />
              </label>
              <label>
                Female
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  ref={femaleGenderRef}
                />
              </label>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth:</label>
            {errors && errors.date_of_birth && (
              <p className="text-red-600">{errors.date_of_birth[0]}</p>
            )}
            <div>
              <input
                ref={dateOfBirthRef}
                type="date"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password (Min. 8 Characters):</label>
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password Confirmation:</label>
            {errors && errors.password_confirmation && (
              <p className="text-red-600">{errors.password_confirmation[0]}</p>
            )}
            <div>
              <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Re-enter your password"
                style={styles.input}
              />
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
