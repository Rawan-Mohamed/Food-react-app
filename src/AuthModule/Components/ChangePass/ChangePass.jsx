import React from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ChangePass({ handleClose }) {
  const navigate = useNavigate();
  // some {properties} and receive return from hook useForm 

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha 
  const onSubmit = (data) => {
    // console.log(data);
    axios
      .put("http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`

        },
      }
      )
      .then((response) => {
        handleClose();
        toast.success("password changed successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        navigate("/login")
      })
      .catch((error) => {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
              <h2>Change your password</h2>
              <p>Enter your details below</p>

              {/* // old Password */}
              <div className="form-group my-3">
                <input
                  placeholder='Old Password'
                  className='form-control ps-4 mb-1'
                  type="password"
                  {...register("oldPassword", {
                    required: "This field is required",
                    
                  })}
                />
                {errors.oldPassword &&  (
                  <span className='text-danger'>{errors.oldPassword.message}</span>)}
              </div>
              {/* //New Password */}
              <div className="form-group my-3">
                <input
                  placeholder='New Password'
                  className='form-control ps-4 mb-1'
                  type="password"
                  {...register("newPassword", {
                    required: "This field is required",
                    pattern:{
                      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Invaild password" ,
                    }
                    // required: true,
                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                {/* {errors.newPassword && errors.newPassword.type === "required" && (
                  <span className='text-danger'>newPassword is required</span>)} */}
                {errors.newPassword && (
                  <span className='text-danger'>{errors?.newPassword?.message}</span>)}
              </div>
              {/* //Confirm Password */}
              <div className="form-group my-3">
                <input
                  placeholder='Confirm New Password'
                  className='form-control ps-4 mb-1'
                  type="password"
                  {...register("confirmNewPassword", {
                    validate: (value) =>
                      getValues("newPassword") === value || "Password don't match",
                    // required: true,
                    pattern:{
                      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Invaild password" ,
                    }

                  })}
                />
                {errors.confirmNewPassword && (
                  <span className='text-danger'>{errors?.confirmNewPassword?.message}</span>)}
                {/* {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" && (
                  <span className='text-danger'>confirmNewPassword is required</span>)} */}
                {/* <div className="invalid-feedback">{errors.confirmNewPassword?.message}</div>
                {errors.confirmNewPassword && errors.confirmNewPassword.type === "pattern" && (
                  <span className='text-danger'> at least one uppercase letter, one lowercase letter, one number and one special character</span>)} */}
              </div>
              {/* Buttuon login */}
              <div className="form-group my-3">
                <button className=' btn btn-success w-100'>Change Password
                </button>
              </div>
            </form>



          </div>
        </div>
      </div>
    </div>
  )

}
