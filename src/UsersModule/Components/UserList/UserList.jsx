import React, { useContext, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import CustomPagination from './../../../SharedModule/Components/CustomPagination/CustomPagination';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { LineWave } from 'react-loader-spinner'


export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([])
  const [searchString, setSearchString] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const { requestHeaders, baseUrl } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [visiblePages, setVisiblePages] = useState([]); // Currently visible pages
  const [loading, setLoading] = useState(true); // Add this line
  const handleClose = () => setModelState("close");


  const showDeletModel = (id) => {
    setItemId(id);
    setModelState("delete-model")
  }


  //Delete Users API
  const deleteUsers = () => {
    // Check if the logged-in user is an admin
    if (userList.some(user => user.id === itemId && user.userRole === 'admin')) {
      // Display a toast message indicating that admins cannot be deleted
      getToastValue("error", error.response.data.message);
      handleClose();
      return; // Do not proceed with the deletion
    }

    axios.delete(`${baseUrl}/Users/${itemId}`, {
      headers: requestHeaders,
    })

      .then((response) => {
        getToastValue("success", "delete successfully");
        handleClose();
        // getAllUsers(response.data.data);
        getAllUsers(currentPage, searchString, selectedRole);


      })
      .catch((error) => {
        getToastValue("error", error.response.data.message);
      })
  }


  //Get User API
  const getAllUsers = (pageNo, name, roleId) => {
    setLoading(true);
    axios.get(`${baseUrl}/Users/`, {
      headers: requestHeaders,
      params: {
        pageSize: 5,
        pageNumber: pageNo,
        userName: name,
        groups: roleId,


      }
    })
      .then((response) => {
        setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
        setUserList(response?.data?.data);
        // setCurrentPage(pageNo);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is complete
      });
  }


  useEffect(() => {
    getAllUsers(currentPage);



  }, [currentPage]);

  const getNameVAlue = (input) => {
    console.log(input);
    setSearchString(input.target.value);
    getAllUsers(1, input.target.value, selectedRole);
  }

  const getRoleValue = (select) => {
    setSelectedRole(select.target.value);
    getAllUsers(1, searchString, select.target.value);
  };


  return (
    <>
      <ToastContainer />
      <Header
        title={'Users List'}
        paragraph={'You can now add your items that any user can order it from the Application and you can edit'}
      />

      {/* Delete Recipe Model   */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>

        <Modal.Body>
          <div className='text-center'>
            <img src={noData} alt="" />
            <h5 className='my-3'>Delete This User ?</h5>
            <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
            <div className='text-end my-3'>
              <button onClick={deleteUsers} className='btn btn-outline-danger'>Delete this item</button>

            </div>
          </div>


        </Modal.Body>

      </Modal>

      {/* Get Users Table  */}

      <div className='row mx-4 p-3'>
        <h6>Users Table Details</h6>
        <span className=' text-muted'>You can check all details</span>

        <div >
          <div className='row my-2'>
            <div className='col-md-6'>
              <div className='icon-input position-relative'>
                <i className="icons fa-solid fa-search position-absolute text-success" />
                <input onChange={getNameVAlue} placeholder='search by user name....' className='form-control input-field my-2' type="text" />

              </div>
            </div>
            <div className='col-md-6 my-2'>
              <div>
                <select className='form-select' onChange={getRoleValue}>
                  <option value="" className='text-muted'> search by Role</option>
                  <option value="1">admin</option>
                  <option value="2">user</option>
                </select>
              </div>

            </div>
          </div>


          {userList.length > 0 ?
            <div>
              <table className="table custom-table my-5 table-striped">
                <thead className=' table-success'>
                  <tr className='text-center'>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>


                      <th scope="col">Action</th>


                  </tr>
                </thead>
                <tbody className='text-center'>
                  {userList.map((user, index) => (

                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{user.userName}</td>
                      <td className='text-center'>
                        <div className='img-container' >
                          {user.imagePath ?
                            <img
                              className=' img-fluid '
                              src={
                                `https://upskilling-egypt.com:443/` +
                                user.imagePath} alt="" /> :
                            <i className="fas fa-user-circle text-success " />

                            //     (
                            //   <img className='img-fluid' src={noData} />
                            // )
                          }
                        </div>
                      </td>
                      <td >{user.phoneNumber}</td>
                      <td >{user.email}</td>



                        <td className='text-center'>

                          <i onClick={() => showDeletModel(user.id)}
                            className="fa-solid fa-trash text-danger"></i>
                        </td>

                    </tr>

                  ))}
                </tbody>
              </table>
              <CustomPagination totalPages={pagesArray.length} currentPage={currentPage} onPageChange={setCurrentPage} />

            </div>
            :// <NoData />
            <div  className=' sweet-loading d-flex justify-content-center align-items-center p-5 m-3'>
              {loading ?
             <LineWave
                  visible={true}
                  height="200"
                  width="200"
                  color="#4fa94d"
                  ariaLabel="rotating-square-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              :
              <NoData/>}
            </div>
          }

        </div>

      </div>



    </>

  )
}
