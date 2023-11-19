import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../assets/images/3.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ForgetPass from './../../../AuthModule/Components/ForgetPass/ForgetPass';
import ChangePass from '../../../AuthModule/Components/ChangePass/ChangePass';

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login")
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='sidebar-container'>

      <Modal show={show} onHide={handleClose}>

        <Modal.Body>
          <ChangePass handleClose={handleClose}/>
          </Modal.Body>
  
      </Modal>

      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem onClick={handleToggle} icon={<img src={logo} className='sidebar-logo w-100'></img>} ></MenuItem>
          {/* <MenuItem onClick={handleToggle} icon={<i className="fa-solid fa-bars"></i>} ></MenuItem> */}
          <MenuItem icon={<i class="fa fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<i className='fa-solid fa-user' aire-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-utensils"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i class="fa-solid fa-shapes"></i>} component={<Link to="/dashboard/categories" />}> Categoeies</MenuItem>
          <MenuItem onClick={handleShow} icon={<i class="fa-solid fa-unlock-keyhole"></i>}> Change password</MenuItem>
          <MenuItem onClick={logOut} icon={<i class="fa-solid fa-right-from-bracket"></i>} component={<Link to="/login" />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>


    // <div>
    //   SideBar
    //   <button className='btn btn-danger' onClick={logOut}>Logout</button>
    // </div>

  )
}