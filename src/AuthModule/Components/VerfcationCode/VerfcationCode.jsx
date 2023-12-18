import React, { useState } from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';

export default function VerfcationCode() {
    const { getToastValue } = useContext(ToastContext)

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const { requestHeaders, baseUrl } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);


    const verifyModel = (code,email) => {
        setItemCode(code);
        setItemEmail(email);}

    // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha
    const onSubmit = (data) => {
        // console.log(data);
        axios
            .put(`${baseUrl}/Users/Verify`,data
                // {
                //     email: itemEmail,
                //     code: itemCode,
                // }

                , {
                    headers: requestHeaders,
                }
            )
            .then((response) => {
                // handleClose();
                navigate("/login")
                getToastValue("sucess","Mail is verification")


            })
            .catch((error) => {
                getToastValue(error.response.data.message)
                // console.log(error.response.data.message);
            });
    };



    return (
        <div className=" container-fluid">
            <ToastContainer />
            <div className="row  justify-content-center align-items-center">
                <div className="col-sm-12">
                    <div className="bg-white py-2 rounded-2">
                        <div className="logo-cont text-center">
                            <img src={logo} className='w-50' alt="logo" />
                        </div>

                        {/* form */}
                        {/* onSubmit={handleSubmit(onSubmit)} passly data el mogoda onsubmite gwa el handleSubmit */}
                        <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
                            <h2>Verify your Email</h2>
                            <p>Enter your Email and verifcation below</p>

                            {/* // old Password */}
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

                            {/* Buttuon login */}
                            <div className="form-group my-3">
                                <button  className=' btn btn-success w-100'
                                disabled={isLoading}>  {isLoading ? 'Loading...' : 'Verifay'}
                                </button>
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </div>
    )
}
