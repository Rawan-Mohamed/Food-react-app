import React from 'react'
import logo from '../../../assets/images/4 3.png'
import notFound from '../../../assets/images/Error.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (

    <>
      <div className=''>
        <nav className="notfound navbar ">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img src={logo}
                // width={160} height={150}
                className="w-50" />

            </a>
          </div>
        </nav>
      </div>


      <div className='row py-2 g-0'>

        <div className='col-md-4 px-5 py-0 text-center'>
          <h2>Oops....</h2>
          <h3 className=' text-success'>Page not found </h3>
          <h5 className=' py-3'>This Page doesn’t exist or was removed!
            We suggest you  back to home.</h5>
            <button className='btn btn-success'>
              <Link className=' text-white text-decoration-none' to="/dashboard">
                
                <i className=' fa fa-arrow-left p-2'></i>
                Back to Home
              </Link>
            </button>

        </div>
        <div className='col-md-8 py-3'>
          <div className='notfound-bg'>
            <img src={notFound} alt="" />
          </div>
        </div>

      </div>
    </>

  )
}
