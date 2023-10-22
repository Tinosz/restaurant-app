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
  const [currentPhase, setCurrentPhase] = useState(1);

  const onNextClick = () => {
    setCurrentPhase(currentPhase === 1 ? 2 : 1);
  };

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
      <div style={{ ...styles.centeredText, fontFamily: "Karla" }}>
        <form
          style={{ ...styles.signUpForm, animation: "fadeInUp 1s" }}
          onSubmit={onSubmit}
        >
          <h1 style={{ ...styles.title, fontFamily: "Lora" }}>
            Create your Account!
          </h1>
          <div style={styles.phaseIndicator}>
            <div
              style={{
                ...styles.phaseCircle,
                ...(currentPhase === 1 ? styles.active : {}),
              }}
              onClick={() => setCurrentPhase(1)}
            >
              1
            </div>
            <div style={{
                ...styles.phaseLine,
              }} />
            <div
              style={{
                ...styles.phaseCircle,
                ...(currentPhase === 2 ? styles.active : {}),
              }}
              onClick={() => setCurrentPhase(2)}
            >
              2
            </div>
          </div>
          {currentPhase === 1 && (
            <div>
              {/* Fase Pertama */}
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  First Name:
                </label>
                {errors && errors.first_name && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.first_name[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={firstNameRef}
                    placeholder="Your First Name"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Last Name:
                </label>
                {errors && errors.last_name && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.last_name[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={lastNameRef}
                    placeholder="Your Last Name"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Gender:
                </label>
                {errors && errors.gender && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.gender[0]}
                  </p>
                )}
                <div style={styles.radioGroup}>
                  <div style={styles.radioOption}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      ref={maleGenderRef}
                    />
                    <label
                      style={{ ...styles.radioLabel, fontFamily: "Karla", color: "#000" }}
                    >
                      Male
                    </label>
                  </div>
                  <div style={styles.radioOption}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      ref={femaleGenderRef}
                    />
                    <label
                      style={{ ...styles.radioLabel, fontFamily: "Karla", color: "#000" }}
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Date of Birth:
                </label>
                {errors && errors.date_of_birth && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.date_of_birth[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={dateOfBirthRef}
                    type="date"
                    style={{ ...styles.input, fontFamily: "Karla",  color: "#000" }}
                  />
                </div>
              </div>
              <button
                style={{ ...styles.button, fontFamily: "Karla" }}
                onClick={onNextClick}
              >
                Next
              </button>
            </div>
          )}
          {currentPhase === 2 && (
            <div>
              {/* Fase Kedua */}
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Username:
                </label>
                {errors && errors.username && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.username[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={usernameRef}
                    placeholder="Username"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>Email:</label>
                {errors && errors.email && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.email[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={emailRef}
                    placeholder="Email"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Password (Min. 8 Characters):
                </label>
                {errors && errors.password && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.password[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter your Password"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ ...styles.label, fontFamily: "Karla", color: "#000" }}>
                  Password Confirmation:
                </label>
                {errors && errors.password_confirmation && (
                  <p
                    className="text-red-600"
                    style={{ ...styles.karlaText, fontFamily: "Karla" }}
                  >
                    {errors.password_confirmation[0]}
                  </p>
                )}
                <div>
                  <input
                    ref={passwordConfirmationRef}
                    type="password"
                    placeholder="Re-enter your password"
                    style={{ ...styles.input, fontFamily: "Karla" }}
                  />
                </div>
              </div>
              <button
                style={{ ...styles.button, fontFamily: "Karla", marginBottom: "10px"}}
                onClick={onNextClick}
              >
                Prev
              </button>
              <button style={{ ...styles.button, fontFamily: "Karla" }}>Sign Up</button>
            </div>
          )}
          <div style={styles.orLine}>
            <div style={styles.orCircle}></div>
            <div style={{ ...styles.orText, fontFamily: "Karla" }}>OR</div>
            <div style={styles.orCircle}></div>
          </div>
          <div style={styles.centeredText}>
            <p style={{ ...styles.text, fontFamily: "Karla" }}>
              Have an Account?{" "}
              <a style={{ ...styles.link, fontFamily: "Karla" }} href="/Login">
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
  },
  label: {
    color: "#000000",
    fontFamily: "Karla, sans-serif",
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
    borderRadius: "10px",
    padding: "10px",
    color: "000000",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#000000",
    width: "100%",
    borderRadius: "20px",
  },
  text: {
    color: "#000000",
    fontFamily: "Karla, sans-serif",
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
    color: "#000000",
    fontFamily: "Karla, sans-serif",
  },
  orLine: {
    display: "flex",
    alignItems: "center",
  },
  orCircle: {
    flex: "1",
    borderBottom: "1px solid #000000",
  },
  orText: {
    color: "#000000",
    padding: "10px",
  },
  phaseIndicator: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  // CSS untuk indikator fase (lingkaran nomor)
  phaseCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#fff",
    color: "#5E1219",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 10px",
    // Tambahkan gaya lain yang Anda perlukan di sini.
  },

  // CSS saat fase aktif
  active: {
    background: "#2a1c1c",
    color: "#fff",
  },
  phaseLine: {
    width: "100px",
    height: "0px", // Menyesuaikan tinggi garis sesuai kebutuhan
    background: "#fff",
    margin: "0px", // Menyesuaikan jarak antara garis dan lingkaran
  },
  // Tambahkan keyframes untuk fadeInUp di sini
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translate3d(0, -20%, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
  },
};
