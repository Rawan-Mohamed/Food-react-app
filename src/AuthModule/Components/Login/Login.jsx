import React, { useContext } from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext)
  // some {properties} and receive return from hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha
  const onSubmit = (data) => {

    axios
      .post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
      
        getToastValue('success', "login successfully")
        localStorage.setItem("userToken", response.data.token); //m3ia el 7aga el tsbt any logged in
        saveUserData();
        navigate("/dashboard")
      })
      .catch((error) => {
        // getToastValue('error',"invaild mail")
        getToastValue("error", error.response.data.message)
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
              {/* //Password */}
              <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-lock position-absolute text-success " />
                {/* <i className="fa-solid fa-eye" /> */}
                <input
                  placeholder='Password'
                  className='form-control'

                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}

                />
                {errors.password && (
                  <span className='text-danger'>{errors.password.message}</span>)}
              </div>

              <div className='d-flex justify-content-between'>
                {/* Register password */}
                <div className='register'>
                  <Link to="/registeration" className=' text-success'>
                    Register now?
                  </Link>
                </div>
                {/* Forget password */}
                <div className='form-group forgetpass text-end '>
                  <Link to="/reset-pass-request" className=' text-success'>
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
