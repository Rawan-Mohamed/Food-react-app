import React from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ saveAdminData }) {
  const navigate = useNavigate();
  // some {properties} and receive return from hook useForm 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha 
  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Login", data)
      .then((response) => {
        // setTimeout(toast("wow logiiiiin!"),2000);
        localStorage.setItem("adminToken", response.data.token); //m3ia el 7aga el tsbt any logged in 
        saveAdminData();
        navigate("/dashboard")
      })
      .catch((error) => {
        toast(error.response.data.message);
        // console.log(error.response.data.message);
      });
  };



  return (
    <div className="Auth-container container-fluid">
      <ToastContainer />
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white p-2">
            <div className="logo-cont text-center">
              <img src={logo} className='w-25' alt="logo" />
            </div>

            {/* form */}
            {/* onSubmit={handleSubmit(onSubmit)} passly data el mogoda onsubmite gwa el handleSubmit */}
            <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
              <h2>Log in</h2>
              <p>Welcome Back! Please enter your details</p>
              {/* /Email/ */}
              <div className="form-grup my-3">
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
              {/* //Password */}
              <div className="form-grup my-3">
                <input
                  placeholder='Password'
                  className='form-control'
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className='text-danger'>password is required</span>)}
              </div>

              <div className='row'>
                {/* Register password */}
                {/* <div className='register col-md-6'>
                <a href="#" className="text-black">Register now</a>
              </div> */}
                {/* Forget password */}
                <div className='form-group my-3 position-relative d-flex justify-content-end forgetpass '>
                  <Link to = "/reset-pass-request" className=' text-success'>
                    Forget Password?
                  </Link>
                </div>
              </div>

              {/* Buttuon login */}
              <div className="form-grup my-3">
                <button className=' btn btn-success w-100'>Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
