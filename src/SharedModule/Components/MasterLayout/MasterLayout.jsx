import React from 'react'
import SideBar from './../SideBar/SideBar';
import NavBar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';



export default function MasterLayout({ adminData }) {
  return (

    <>
      <div className='d-flex'>
        <div className='sidebar-cont'>
            <SideBar />
        </div>
        <div className="w-100">
          <div>
            <NavBar adminData={adminData} />
            <div className='container-fluid'>
              <Outlet />
            </div>

          </div>
        </div>



      </div>

    </>

  )
}
