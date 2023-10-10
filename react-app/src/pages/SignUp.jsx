import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export default function SignUp () {
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
        let selectedGender = '';
        if (maleGenderRef.current.checked) {
            selectedGender = 'Male';
        } else if (femaleGenderRef.current.checked) {
            selectedGender = 'Female';
        }

        const payload = {
            username: usernameRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            gender: selectedGender,
            date_of_birth: dateOfBirthRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(() => {
                navigate('/Login')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setError(response.data.errors);
                }
            })
    } 
    return (
        <>
        <h1>Create your Account!</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Username:
                </label>
                {errors && errors.username && (
                    <p className="text-red-600">{errors.username[0]}</p>
                )}
                <div>
                    <input ref={usernameRef} placeholder="Username"/>
                </div>
            </div>
            <div>
            <label>
                    First Name:
                </label>
                {errors && errors.first_name && (
                    <p className="text-red-600">{errors.first_name[0]}</p>
                )}
                <div>
                    <input ref={firstNameRef} placeholder="Your First Name"/>
                </div>
            </div>
            <div>
            <label>
                    Last Name:
                </label>
                {errors && errors.last_name && (
                    <p className="text-red-600">{errors.last_name[0]}</p>
                )}
                <div>
                    <input ref={lastNameRef} placeholder="Your Last Name"/>
                </div>
            </div>
            <div>
                <label>
                    Email:
                </label>
                {errors && errors.email && (
                    <p className="text-red-600">{errors.email[0]}</p>
                )}
                <div>
                    <input ref={emailRef} placeholder="Email"/>
                </div>
            </div>
            <div>
                <label>Gender:</label>
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
            <div>
                <label>
                    Date of Birth
                </label>
                {errors && errors.date_of_birth && (
                    <p className="text-red-600">{errors.date_of_birth[0]}</p>
                )}
                <div>
                    <input ref={dateOfBirthRef} type="date" />
                </div>
            </div>
            <div>
                <label>
                    Password (Min. 8 Characters)
                </label>
                {errors && errors.password && (
                    <p className="text-red-600">{errors.password[0]}</p>
                )}
                <div>
                    <input ref={passwordRef} type="password" placeholder="Enter your Password"/>
                </div>
            </div>
            <div>
                <label>
                    Password Confirmation
                </label>
                {errors && errors.password_confirmation && (
                    <p className="text-red-600">{errors.password_confirmation[0]}</p>
                )}
                <div>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Re-enter your password"/>
                </div>
            </div>
            <button>
                Sign In
            </button>
            <p>
                Have an Account?{" "}
                <a style={{ margin: "10px 0" }} href="/Login">Login Here.</a>
            </p>
        </form>
        </>
    )    
}