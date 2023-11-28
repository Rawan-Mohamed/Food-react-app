import React from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ResetPassRequest() {
  const navigate = useNavigate();
  // some {properties} and receive return from hook useForm 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
    setIsLoading(true);
    axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Reset/Request", data)
      .then((response) => {
        navigate("/reset-pass");


       
          toast.success("Mail sent successfull", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",

          });
       
      })
      .catch((error) => {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "colored",
        });
        // console.log(error.response.data.message);

      });
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <div className="Auth-container container-fluid">
        <div className="row bg-overlay vh-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="bg-white py-4 rounded-2">
              <div className="logo-cont text-center">
                <img src={logo} className='w-25' alt="logo" />
              </div>

              {/* form */}
              {/* onSubmit={handleSubmit(onSubmit)} passly data el mogoda onsubmite gwa el handleSubmit */}
              <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
                <h4>Request Reset  Password</h4>
                <span className=' text-muted'>Please Enter Your Email And Check Your Inbox</span>
                {/* /Email/ */}
                <div className="form-group my-3 position-relative">
                  <input
                    placeholder='Enter your E-mail'
                    className='form-control'
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                    })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className='text-danger'>email is required</span>)}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className='text-danger'>invaild mail</span>)}
                </div>

                <div className='form-group my-3'>
                  <button className='btn w-100 btn-success' disabled={isLoading}>  {isLoading ? 'Loading...' : 'Send'}</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

