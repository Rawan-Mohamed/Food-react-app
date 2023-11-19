import React from 'react'
import avater from "../../../assets/images/avatar.png"
export default function NavBar({adminData}) {
  console.log(adminData);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-info">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            <img src={avater} alt='user-image'/>
            {adminData.userName}
          </a>
        </li>


      </ul>
  
    </div>
  </div>
</nav>
    </>
  )
}
