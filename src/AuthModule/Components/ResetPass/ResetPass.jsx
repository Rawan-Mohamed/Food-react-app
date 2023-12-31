import React, { useContext } from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';


export default function ResetPass() {
  const navigate = useNavigate();
  const {baseUrl} = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,

  } = useForm();


  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Users/Reset`, data)
      .then((response) => {
        navigate("/login");
        getToastValue("sucess","password is reset login now!")



      })
      .catch((error) => {
        getToastValue("error", error.response.data.message)


      });
  };





  return (
    <>
      <ToastContainer />
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
                <h4 className=' fw-bolder fs-6'>Request Password</h4>
                <span className=' text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
                {/* /Email/ */}
                <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-envelope position-absolute text-success  "/>
                  <input
                    placeholder='Email'
                    className='form-control text-muted'
                    type="email"
                    {...register("email", {
                      required: "This field is required",
                      pattern:{
                        value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                        message :"Enter correct Email"
                      } ,
                    })}
                  />
                  {errors.email  && (
                    <span className='text-danger'>{errors?.email?.message}</span>)}
                  {/* {errors.email && errors.email.type === "pattern" && (
                    <span className='text-danger'>invaild mail</span>)} */}
                </div>
                {/* OTP */}
                <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-key position-absolute text-success" />
                  <input
                    placeholder='OTP'
                    className='form-control mb-1 text-muted'
                    type="text"
                    {...register("seed", {
                      required: "Otp is required",

                    })}
                  />
                  {errors.seed && (
                    <span className='text-danger'>{errors?.seed?.message}</span>)}
                </div>
                {/* //New Password */}
                <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-lock position-absolute text-success" />
                  <input
                    placeholder='New Password'
                    className='form-control text-muted'
                    type="password"
                    {...register("password", {
                      required: "This field is required",
                      pattern:{
                        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Invaild password" ,
                      }

                      // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

                    })}
                  />
                  {errors.password && (
                    <span className='text-danger'>{errors.password.message}</span>)}
                  {/* <div className="invalid-feedback">{errors.password?.message}</div> */}

                </div>
                {/* //Confirm Password */}
                <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-lock position-absolute text-success" />
                  <input
                    placeholder='Confirm New Password'
                    className='form-control text-muted'
                    type="password"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        getValues("password") === value || "Password don't match",
                        pattern:{
                          value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "Invaild password" ,
                        }
                      // required: true,
                      // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

                    })}
                  />
                  {errors.confirmPassword && (
                    <span className='text-danger'>{errors.confirmPassword.message}</span>)}

                </div>

                <div className='form-group my-3'>
                  <button className='btn w-100 btn-success'>Reset Password</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>

  )
}
