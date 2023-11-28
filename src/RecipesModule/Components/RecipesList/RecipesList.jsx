import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RecipesList() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [recipesList, setRecipesList] = useState([]);
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  // const [selectedTag, setSelectedTag] = useState('');
  // const [tableData, setTableData] = useState([]);

  const showAddModel = () => {
    getCategoryList();
    getAllTags();
    setValue("name", null);
    setModelState("Add-model")
  }


  const showDeletModel = (id) => {
    setItemId(id);
    setModelState("delete-model")
  }

  const handleClose = () => setModelState("close");

  // Add recipe API
  const onSubmit = (data) => {
    
console.log(data);
    axios.post("https://upskilling-egypt.com:443/api/v1/Recipe/", 
    { ...data, recipeImage: data.recipeImage[0] },
     {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log(response)
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
        getAllRecipes();


      })
      .catch((error) => {
        console.log(error)
      })

      // reset();
  };

  //Get Recipe API
  const getAllRecipes = () => {
    axios.get("https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=20&pageNumber=1", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      
    })
      .then((response) => {
        setRecipesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Delete Recipe API
  const deleteRecipes = () => {
    axios.delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`, {
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
        getAllRecipes(response.data.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }



  // ------------------------------------------
  const getAllTags = () => {
    // Fetch tags from the API
    axios.get('https://upskilling-egypt.com:443/api/v1/tag/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then(response => {
        setTagsList(response?.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  };


  const getCategoryList = () => {
    // Fetch category from the API
    axios.get('https://upskilling-egypt.com:443/api/v1/Category/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then(response => {
        setCategoriesList(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching catgories:', error);
      });
  }

  //   const [value,setValuee] = useState('')
  //   function handleSelect(event){
  // setValuee(event.target.value)


  // useEffect(() => {
  //   getCategoryList();
  //   getAllTags();


  // }, []);


  useEffect(() => {
    getAllRecipes();


  }, []);


  return (
    <>
      <ToastContainer />

      <Header
        title={'Recipes Items '}
        paragraph={'You can now add your items that any user can order it from the Application and you can edit'}

      />

      {/* Add Recipe Model   */}
      <Modal show={modelState == "Add-model"} onHide={handleClose}>

        <Modal.Body>
          <h4 className='text-center'>Add new recipe</h4>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className='form-group my-3 ' >
              <input type="text" className="form-control text-muted"
                placeholder='Recipe Name '
                {...register("name",
                  {
                    required: true
                  })}
              />
              {errors.name && errors.name.type === "required"
                && (<span className='text-danger my-3'>Filed is required</span>)}
            </div>


            <div className='form-group my-3 ' >
              <input type="number" className="form-control "
                placeholder='Price '
                {...register("price",
                  {
                    required: "Price is required",
                    pattern: {
                      value: /^\d+(\.\d{2})?$/,
                      message: "Enter correct price"

                    }
                  })}
              />
              {errors.price &&
                (<span className='text-danger my-3'>{errors.price.message}</span>)}
            </div>

            <div className="form-group my-3 mb-3">
              <select className="form-control"
                //  onChange={handleSelect} 
                //  id="tags"
                {...register('tagId', {
                  required: "Please select an option",
                }
                )}>

                <option >Select a Tag Id</option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>{tag.id} - {tag.name}</option>
                ))}

              </select>
              {errors.tagId &&
                (<span className='text-danger my-3'>{errors.tagId.message}</span>)}
            </div>

            <div className="form-group my-3 mb-3">
              <select className="form-control"
                id="catgories"
                {...register('categoriesIds')}>
                <option >Select a Cargory Id</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id} - {category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group my-3 mb-3">
              <input className="form-control"
                type="file"
                placeholder='choose file'
                accept='image/*'
                {...register("recipeImage",
                  { required: 'image is required' })} />

              {/* {errors.recipeImage && <span>{errors.recipeImage.message}</span>} */}
            </div>
            <div className='form-group my-3 ' >
              <textarea type="text" className="form-control" placeholder="Leave a comment here " rows={4}
                {...register("description",
                  {
                    required: "Description is required"
                  })}

              ></textarea>
              {errors.description &&
                (<span className='text-danger my-3'>{errors.description.message}</span>)}
            </div>
            {/* -------------------------------------- */}



            {/* 
            <div className='form-group my-3 '>
              <select id="tag" value={selectedTag} onChange={handleTagChange}>
                <option value="">Select a Tag</option>
                {tags.map(tag => (
                  <option key={recipe.tag.id} value={recipe.tag.name}>{recipe.tag.name}</option>
                ))}
              </select>
            </div>
 */}




            {/* -------------------------------------------- */}

            <div className="form-group">
              <button className='btn btn-success w-100'>Add Recipes</button>
            </div>
          </form>


        </Modal.Body>

      </Modal>


      {/* Delete Recipe Model   */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>

        <Modal.Body>
          <div className='text-center'>
            <img src={noData} alt="" />
            <h5 className='my-3'>Delete This Recipe ?</h5>
            <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
            <div className='text-end my-3'>
              <button onClick={deleteRecipes} className='btn btn-outline-danger'>Delete this item</button>

            </div>
          </div>


        </Modal.Body>

      </Modal>




      <div className='row mx-4 p-3'>
        <div className='col-md-6'>
          <div>
            <h6>Recipes Table Details</h6>
            <span className=' text-muted'>You can check all details</span>
          </div>
        </div>

        <div className='col-md-6 '>
          <div className='text-end'>
            <button onClick={showAddModel} className=' btn btn-success'>Add New Recipe</button>
          </div>
        </div>

        <div>
          {recipesList.length > 0 ?
            (<table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipe) => (

                  <tr key={recipe.id}>
                    <th scope="row">{recipe.id}</th>
                    <td >{recipe.name}</td>
                    <td >
                      <div className='img-container' >
                        <img
                          className=' img-fluid'
                          src={
                            `https://upskilling-egypt.com:443/` +
                            recipe.imagePath} alt="" />
                        {/* {recipe.recipeImage ? <img
                          className=' img-fluid'
                          src={
                            `http://upskilling-egypt.com:3002/` +
                            recipe.recipeImage} alt="" /> : (
                          <img className='img-fluid'src={noData} />
                        )} */}
                      </div>
                    </td>
                    <td >{recipe.description}</td>
                    <td >{recipe.price}</td>
                    <td >{recipe?.category[0]?.name}</td>

                    <td >
                      {recipe.tag.name}

                    </td>
                    <td >
                      <i onClick={() => showUpdateModel(category)} 
                      className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
                      <i onClick={() => showDeletModel(recipe.id)}
                        className="fa-solid fa-trash text-danger"></i>
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

