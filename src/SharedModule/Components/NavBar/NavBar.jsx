import React from 'react'
import avater from "../../../assets/images/avatar.png"

export default function NavBar({adminData}) {

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-black" href="#">
                  <img src={avater} className='m-2' alt='user-image' />
                  {adminData?.userName || "user"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
