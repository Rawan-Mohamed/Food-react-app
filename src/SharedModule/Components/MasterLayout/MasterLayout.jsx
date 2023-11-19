import React from 'react'
import SideBar from './../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import NavBar from './../Navbar/Navbar';
import Header from './../Header/Header';
import header from "../../../assets/images/header.png"

export default function MasterLayout({ adminData }) {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div>
              <SideBar />
            </div>
          </div>
          <div className="col-md-10 p-0">
            <div>
              <NavBar adminData={adminData} />
              <Header>
                <div className='bg-danger h-25  px-2'>
                  <div className="row align-items-center">
                    <div className="col-md-10">
                      <h3>Recipes items</h3>
                      <p>You can now add your items that any user can order it from the Application and you can edit</p>
                    </div>
                    <div className="col-md-2">
                      <img className=' img-fluid' src={header} alt='' />
                    </div>
                  </div>

                </div>
              </Header>
              <Outlet />
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}
