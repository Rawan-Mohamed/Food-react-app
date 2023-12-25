import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import HeaderHome from '../../../SharedModule/Components/Header/HeaderHome';

export default function UserProfile() {
    const [userId, setUserId] = useState(0);
    const [updatedData, setUpdatedData] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const { requestHeaders, baseUrl, userData, updateUserData } = useContext(AuthContext);
    const { getToastValue } = useContext(ToastContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();


    useEffect(() => {
        axios.get(`${baseUrl}/Users/currentUser`, {
            headers: requestHeaders,
        })
            .then(response => {
                const userData = response.data;

                setValue("userName", userData.userName);
                setValue("email", userData.email);
                setValue("country", userData.country);
                setValue("phoneNumber", userData.phoneNumber);
                // setValue("confirmPassword", userData.confirmPassword);

                setUserId(userData.id);
                setUpdatedData(userData);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching user data:', error);
            });
    }, [baseUrl, requestHeaders, setValue]);

    const onSubmit = (data) => {
        setIsLoading(true);
        const updatedUserData = {
            userName: data.userName,
            email: data.email,
            country: data.country,
            phoneNumber: data.phoneNumber,
            confirmPassword: data.confirmPassword,
            profileImage: data.profileImage
        };
        axios
            .put(`${baseUrl}/Users/`, updatedUserData,
                {
                    headers: requestHeaders
                })
            .then((response) => {
                getToastValue("success", "Updated Successfuly")

                updateUserData(updatedUserData);

                setIsLoading(false);
            })
            .catch((error) => {
                getToastValue("error", error.response.data.message)
                setIsLoading(false);
            });
        if (isLoading) {
            return <p>Loading...</p>;
        }

    };

    return (

        <>
        <HeaderHome
            title={"Welcome " + userData?.userName || "user"}
            paragraph={'This is a welcoming screen for the entry of the application , you can now see the options'}

        />
        <div className=" container-fluid">
            <ToastContainer />
            <div className=" justify-content-center align-items-center">
                <div className="">
                    <div className="bg-white ">


                        {/* form */}
                        <form className=' m-auto profile-w' onSubmit={handleSubmit(onSubmit)}>
                            <h2>My Profile</h2>
                            <p>Your details</p>
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
                                            disabled
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
                                            {...register("confirmPassword", {
                                                required: "This field is required",
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
                            {/* Buttuon Update */}
                            <div className="form-grup my-3">
                                <button className=' btn btn-success w-100'>Update Profile Data</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    </>

    )
}
