import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContext } from './../../../Context/ToastContext';
import { AuthContext } from '../../../Context/AuthContext';
import CustomPagination from '../../../SharedModule/Components/CustomPagination/CustomPagination';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { LineWave } from 'react-loader-spinner'

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([])
  const [searchString, setSearchString] = useState("");
  const { requestHeaders, baseUrl } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add this line

  const handleClose = () => setModelState("close");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm();


  // Add Category API
  const onSubmit = (data) => {
    // console.log(data)
    axios.post(`${baseUrl}/Category/`, data, {
      headers: requestHeaders
    })
      .then((response) => {
        getToastValue("success", "Added Successfuly")
        handleClose();
        getCategoriesList();

      })
      .catch((error) => {
        // console.log(error)
        getToastValue(error.response.data.message)

      })



  };

  const showAddModel = () => {
    setValue("name", null);
    setModelState("model-one")
  }

  const showDeletModel = (id) => {
    setItemId(id)
    setModelState("model-two")
  }

  const showUpdateModel = (categoryItem) => {
    setItemId(categoryItem.id)
    setValue("name", categoryItem.name);
    setModelState("model-three")
  }



  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);


  //Delete Category API
  const deleteCategory = () => {
    axios.delete(`${baseUrl}/Category/${itemId}`, {
      headers: requestHeaders
    })
      .then((response) => {
        getToastValue("success", "deleted Successfuly")
        getCategoriesList(response.data.data);
        handleClose();
      })
      .catch((error) => {
        getToastValue(error.response.data.message)
      })
  }

  //Update Category API
  const updateCategory = (data) => {
    axios
      .put(`${baseUrl}/Category/${itemId}`, data, {
        headers: requestHeaders
      })

      .then((response) => {
        getToastValue("success", "Updated Successfuly")
        getCategoriesList();
        handleClose();
      })
      .catch((error) => {
        getToastValue(error.response.data.message)
      })
  }



  const getCategoriesList = (pageNo, name) => {
    axios.get(`${baseUrl}/Category/`,
      {
        headers: requestHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name

        }
      })
      .then((response) => {
        setCategoriesList(response.data.data);
        setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    getCategoriesList(currentPage)
  }, [currentPage])

  const getNameVAlue = (input) => {
    setSearchString(input.target.value)
    getCategoriesList(1, input.target.value);
  }


  return (
    <>
      <ToastContainer />

      <Header
        title={'Categories Item'}
        paragraph={'This is a welcoming screen for the entry of the application , you can now see the options'}
      />
      {/* Add Category Model 1  */}
      <Modal show={modelState == "model-one"} onHide={handleClose}>

        <Modal.Body>
          <h4>Add new category</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group my-3'>
              <input type="text" className="form-control"
                placeholder='please enter category name '
                {...register("name",
                  {
                    required: true
                  })}
              />
              {errors.name && errors.name.type === "required"
                && (<span className='text-danger my-3'>Filed is required</span>)}
            </div>
            <div className="form-group">
              <button className='btn btn-success w-100'>Add Category</button>
            </div>
          </form>

        </Modal.Body>

      </Modal>

      {/* Delete Category Model 2  */}
      <Modal show={modelState == "model-two"} onHide={handleClose}>

        <Modal.Body>
          <div className=' text-center'>
            <img src={noData} alt="" />
            <h5 className='my-3'>Delete This Category ?</h5>
            <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
            <div className='text-end my-3'>
              <button onClick={deleteCategory} className='btn btn-outline-danger'>Delete this item</button>

            </div>
          </div>


        </Modal.Body>

      </Modal>


      {/* Update Category Model 3 */}
      <Modal show={modelState == "model-three"} onHide={handleClose}>
        <Modal.Body>
          <h4>Update new category</h4>
          <form onSubmit={handleSubmit(updateCategory)}>
            <div className='form-group my-3'>
              <input type="text" className="form-control"
                placeholder='please enter category name '
                {...register("name",
                  {
                    required: true
                  })}
              />
              {errors.name && errors.name.type === "required"
                && (<span className='text-danger my-3'>Filed is required</span>)}
            </div>
            <div className="form-group">
              <button className='btn btn-success w-100'>Update Category</button>
            </div>
          </form>

        </Modal.Body>

      </Modal>



      <div className='row mx-4 p-3'>
        <div className='col-md-6'>
          <div>
            <h6>Categories Table Details</h6>
            <span className=' text-muted'>You can check all details</span>
          </div>
        </div>

        <div className='col-md-6 '>
          <div className='text-end'>
            <button onClick={showAddModel} className=' btn btn-success'>Add New Category</button>
          </div>
        </div>

        <div>
          <div className='icon-input position-relative'>
            <i className="icons fa-solid fa-search position-absolute text-success" />
            <input onChange={getNameVAlue} placeholder='search by category name....' className='form-control my-2' type="text" />

          </div>

          {categoriesList.length > 0 ?
            <div>

              <table className="table custom-table table-striped">
                <thead className=' table-success'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((category, index) => (

                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{category.name}</td>
                      <td >
                        <i onClick={() => showUpdateModel(category)} className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
                        <i onClick={() => showDeletModel(category.id)} className="fa-solid fa-trash text-danger"></i>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>

              {/* <nav aria-label="...">
                <ul className="pagination justify-content-center pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li key={pageNo} onClick={() => getCategoriesList(pageNo,searchString)} className="page-item">
                      <a className="page-link">
                        {pageNo}
                      </a>
                    </li>
                  ))}


                </ul>

              </nav> */}
              <CustomPagination totalPages={pagesArray.length} currentPage={currentPage} onPageChange={setCurrentPage} />

            </div>
            :
            // <NoData />
            <div className=' sweet-loading d-flex justify-content-center align-items-center p-5 m-3'>
              {loading ?

                // <ClimbingBoxLoader
                //   size={30}
                //   color="#009247"
                //   loading={loading}

                // />
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
                <NoData />}
            </div>
          }

        </div>

      </div>


    </>
  )
}
