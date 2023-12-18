import React from 'react'
import SideBar from './../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import NavBar from './../NavBar/NavBar';



export default function MasterLayout({ userData }) {
  return (

    <>
      <div className='d-flex'>
        <div className='sidebar-cont'>
            <SideBar />
        </div>
        <div className="w-100">
          <div>
            <NavBar userData={userData} />
            <div className='container-fluid'>
              <Outlet />
            </div>

          </div>
        </div>



      </div>

    </>

  )
}
