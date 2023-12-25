import React, { useContext } from 'react'
import avater from "../../../assets/images/avatar.png"
import { AuthContext } from '../../../Context/AuthContext'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const { userData, userRole } = useContext(AuthContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex ">

                <a className="nav-link text-black" >
                  <div>
                    {userData?.imagePath ?
                      <img src={userData?.imagePath} className='rounded  img-thumbnail' /> :
                      <img src={avater} className='m-2 px-1' alt='user-image' />}
                    {userData?.userName || "user"}
                  </div>
                  {/* <img src={avater} className='m-2' alt='user-image' /> */}
                </a>
                <li className="nav-item dropdown my-2 py-1">
                  <a className="nav-link dropdown-toggle text-success" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData?.userGroup}
                  </a>
                   {userRole != 'SuperAdmin' ?
                  <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                    <li><Link
                     to="/dashboard/profile"
                    className="dropdown-item bg-success-subtle" >My Profile</Link></li>
                  </ul>
                  :''}
                </li>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
