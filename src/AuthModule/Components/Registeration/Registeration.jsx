import React, { useState } from 'react';
import logo from '../../../assets/images/1.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons'

export default function Registration() {
    // Context and state variables
    const { getToastValue } = useContext(ToastContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const REDIRECT_URI = 'http:localhost';
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const { requestHeaders, baseUrl } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm();

    // Function to handle submission for step 1 (Registration)
    const onSubmitStep1 = (data) => {
        setIsLoading(true);

        axios.post(`${baseUrl}/Users/Register`, data, {
            headers: requestHeaders,
        })
            .then((response) => {
                getToastValue("success", "Register done successfully");
                setCurrentStep(2);
                setIsLoading(false);
            })
            .catch((error) => {
                getToastValue("error", error.response.data.message);
                setIsLoading(false);
            });
    };

    // Function to handle submission for step 2 (Verification)
    const onSubmitStep2 = (data) => {
        setIsLoading(true);

        axios.put(`${baseUrl}/Users/Verify`, data, {
            headers: requestHeaders,
        })
            .then((response) => {
                getToastValue("success", "Mail is verified");
                navigate("/login");
                setIsLoading(false);
                reset(); // Optionally reset the form
            })
            .catch((error) => {
                getToastValue("error", error.response.data.message);
                setIsLoading(false);
            });
    };

    return (
        <div className=" Auth-container container-fluid">
            <ToastContainer />
            <div className="row  bg-overlay vh-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="bg-white py-2 rounded-2">
                        <div className="logo-cont text-center">
                            <img src={logo} className='w-25' alt="logo" />
                        </div>

                        {/* form */}
                        <form className='w-75 m-auto' onSubmit={currentStep === 1 ? handleSubmit(onSubmitStep1) : handleSubmit(onSubmitStep2)}>
                            <h2>{currentStep === 1 ? 'Register' : 'Verify Your Email'}</h2>
                            <p>{currentStep === 1 ? 'Enter your details below' : 'Enter your email and verification code below'}</p>

                            {currentStep === 1 && (
                                <>
                                    {/* Registration fields */}
                                    <div className='row'>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-user position-absolute text-success  " />
                                            <input
                                                placeholder='Enter your Name'
                                                className='form-control input-field'
                                                type="type"
                                                {...register("userName", {
                                                    required: true,
                                                    pattern: {
                                                        value: /.*\d.*/,
                                                        message: "Name is required"
                                                    }
                                                })}
                                            />
                                            {errors.userName && (
                                                <span className='text-danger'>{errors.userName.message}</span>)}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-envelope position-absolute text-success  " />
                                            <input
                                                placeholder='Enter your E-mail'
                                                className='form-control input-field'
                                                type="email"
                                                {...register("email", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                                                        message: "email is required"
                                                    }
                                                })}
                                            />
                                            {errors.email && (
                                                <span className='text-danger'>{errors.email.message}</span>)}

                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-location-dot position-absolute text-success  " />
                                            <input
                                                placeholder='Country'
                                                className='form-control input-field'
                                                type="type"
                                                {...register("country", {
                                                    required: true,
                                                    message: "country is required"

                                                })}
                                            />
                                            {errors.country && (
                                                <span className='text-danger'>{errors.country.message}</span>)}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-mobile position-absolute text-success  " />
                                            <input
                                                placeholder='Phone Number'
                                                className='form-control input-field'
                                                type="number"
                                                {...register("phoneNumber", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^01[0-2]{1}\d{8}$/,
                                                        message: "phone number is required"
                                                    }
                                                })}
                                            />
                                            {errors.phoneNumber && (
                                                <span className='text-danger'>{errors.phoneNumber.message}</span>)}

                                        </div>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-lock position-absolute text-success " />
                                            <input
                                                placeholder='Password'
                                                className='form-control input-field '
                                                type="password"
                                                {...register("password", {
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                        message: "Invaild password",
                                                    }

                                                })}
                                            />

                                            {errors.password && (
                                                <span className='text-danger'>{errors?.password?.message}</span>)}
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group my-3 input-icons position-relative">
                                            <i className="icons fa-solid fa-lock position-absolute text-success " />
                                            <input
                                                placeholder='Confirm Password'
                                                className='form-control input-field'
                                                type="password"
                                                {...register("confirmPassword", {
                                                    validate: (value) =>
                                                        getValues("password") === value || "Password don't match",
                                                    // required: true,
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                        message: "Invaild password",
                                                    }

                                                })}
                                            />
                                            {errors.confirmPassword && (
                                                <span className='text-danger'>{errors?.confirmPassword?.message}</span>)}
                                        </div>

                                    </div>
                                </div>




                                <div className='form-group my-3 text-end'>

                                    <Link to="/login" className=' text-success'>
                                        Login now?
                                    </Link>
                                </div>

                                {/* Buttuon login */}
                                {/* <div className="form-grup my-3">
                                    <button onClick={handleShow}
                                        className=' btn btn-success w-100'
                                        disabled={!isValid}>

                                        Register</button>
                                </div> */}



                                    <div className="form-group my-3">
                                        <button type="submit" className='btn btn-success w-100' disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Next'}
                                        </button>
                                    </div>


                                {/* ---------------social media-------------------- */}
                                <div>
                                    {!profile ? (
                                        <div className='row'>
                                            <p className='title text-center line'>or Login with</p>
                                            <LoginSocialFacebook
                                                className='col-md-6'
                                                isOnlyGetToken
                                                appId={197550470089607 || ''}
                                                onResolve={(response) => {
                                                    setProfile(response.data)
                                                }}
                                                onReject={(error) => {
                                                }}
                                            >
                                                <FacebookLoginButton className='facbook-button' />
                                            </LoginSocialFacebook>




                                            <LoginSocialGoogle
                                                isOnlyGetToken
                                                className='col-md-6 '
                                                client_id={"801611910502-al5r7ssavjtdcq54jolka8evvdt528rk.apps.googleusercontent.com" || ''}
                                                // redirectUri={REDIRECT_URI}
                                                onResolve={(response) => {
                                                    setProfile(response.data)
                                                }}
                                                onReject={(error) => {
                                                }}
                                            >
                                                <GoogleLoginButton />
                                            </LoginSocialGoogle>

                                        </div>


                                    ) : ''}
                                </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    {/* Verification fields */}
                                        {/* // Email */}
                            <div className="form-group my-3 input-icons position-relative">
                                <i className="icons fa-solid fa-envelope position-absolute text-success  " />
                                <input
                                    placeholder='Enter your E-mail'
                                    className='form-control input-field'
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                                            message: "email is required"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <span className='text-danger'>{errors.email.message}</span>)}
                                {/* {errors.email && errors.email.type === "pattern" && (
                <span className='text-danger'>invaild mail</span>)} */}
                            </div>
                            {/* Code */}
                            <div className="form-group my-3 input-icons position-relative">
                                <i className="icons fa-solid fa-key position-absolute text-success" />
                                <input
                                    placeholder='code'
                                    className='form-control mb-1 text-muted'
                                    type="text"
                                    {...register("code", {
                                        required: "Verifcation code required",

                                    })}
                                />
                                {errors.code && (
                                    <span className='text-danger'>{errors?.code?.message}</span>)}
                            </div>
                                    <div className="form-group my-3">
                                        <button type="submit" className='btn btn-success w-100' disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Verify'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
