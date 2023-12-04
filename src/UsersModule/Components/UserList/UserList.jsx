import React, { useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';


export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([])
  const [searchString, setSearchString] = useState('');

  const handleClose = () => setModelState("close");


  const showDeletModel = (id) => {
    setItemId(id);
    setModelState("delete-model")
  }


  //Delete Users API
  const deleteUsers = () => {
    axios.delete(`https://upskilling-egypt.com:443/api/v1/Users/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })

      .then((response) => {
        toast.success("delete successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        handleClose();
        getAllUsers(response.data.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }


  //Get User API
  const getAllUsers = (pageNo, name) => {
    axios.get("https://upskilling-egypt.com:443/api/v1/Users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      params: {
        pageSize: 5,
        pageNumber: pageNo,
        userName:name ,

      }

    })
      .then((response) => {
        
        setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
        setUserList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    getAllUsers(1);



  }, []);

  const getNameVAlue = (input) => {
    // console.log(target);
    setSearchString(input.target.value);
    getAllUsers(1, input.target.value);
  }

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

        <div>
          <div  className='icon-input position-relative'>
          <i className="icons fa-solid fa-search position-absolute text-success" />
          <input onChange={getNameVAlue} placeholder='search by user name....' className='form-control input-field my-2' type="text" />

          </div>
          {userList.length > 0 ?
            <div>
              <table className="table my-5 table-striped">
                <thead className=' table-success'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (

                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{user.userName}</td>
                      <td >
                        <div className='img-container' >
                          {user.imagePath ?
                            <img
                              className=' img-fluid'
                              src={
                                `http://upskilling-egypt.com:3002/` +
                                user.imagePath} alt="" /> : (
                              <img className='img-fluid' src={noData} />
                            )}
                        </div>
                      </td>
                      <td >{user.phoneNumber}</td>



                      <td >

                        <i onClick={() => showDeletModel(user.id)}
                          className="fa-solid fa-trash text-danger"></i>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>

              <nav aria-label="...">
                <ul className="pagination justify-content-center pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li key={pageNo} onClick={() => getAllUsers(pageNo, searchString)} className="page-item">
                      <a className="page-link">
                        {pageNo}
                      </a>
                    </li>
                  ))}


                </ul>

              </nav>

            </div>


            :
            
              <NoData />
            }

        </div>

      </div>



    </>

  )
}
