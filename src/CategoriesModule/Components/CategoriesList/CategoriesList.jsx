import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CategoriesList() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
   
  } = useForm();


  // Add Category API
  const onSubmit = (data) => {
    // console.log(data)
    
    axios.post("https://upskilling-egypt.com:443/api/v1/Category/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
    
      .then((response) => {
        toast.success("Add successfully", {
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
        getCategoriesList();
        


      })
      .catch((error) => {
        console.log(error)
      })

      
    
  };
  const [categoriesList, setCategoriesList] = useState([]);
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);


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
  const handleClose = () => setModelState("close");

  //Delete Category API
  const deleteCategory = () => {
    axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`, {
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
        getCategoriesList(response.data.data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Update Category API
  const updateCategory = (data) => {
    axios
    .put(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`,data ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })

      .then((response) => {
        toast.success("Update successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        getCategoriesList();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      })
  }



  const getCategoriesList = () => {
    axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setCategoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    getCategoriesList()
  }, [])



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
          {categoriesList.length > 0 ?
            (<table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {categoriesList.map((category) => (

                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td >{category.name}</td>
                    <td >
                      <i onClick={() => showUpdateModel(category)} className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
                      <i onClick={() => showDeletModel(category.id)} className="fa-solid fa-trash text-danger"></i>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>) :
            (
              <NoData />
            )}

        </div>

      </div>


    </>
  )
}
