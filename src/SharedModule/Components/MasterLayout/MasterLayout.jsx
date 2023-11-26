import React from 'react'
import SideBar from './../SideBar/SideBar';
import NavBar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';



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
              <div className='container-fluid'>
                <Outlet />
              </div>

            </div>
          </div>
        </div>
      </div>



    </div>
   
  )
}
