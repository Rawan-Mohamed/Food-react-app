import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import CustomPagination from '../../../SharedModule/Components/CustomPagination/CustomPagination';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { LineWave } from 'react-loader-spinner'



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
  const [recipe, setRecipe] = useState();
  const [pagesArray, setPagesArray] = useState([])
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [selectedCateId, setSelectedCateId] = useState("");
  const { requestHeaders, baseUrl, userRole } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)
  const [recipeDetails, setRecipeDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add this line
  const [forceUpdate, setForceUpdate] = useState(false);

  const showAddModel = () => {

    setValue("name", null);
    setModelState("Add-model")
  }

  const showViewModel = (id) => {
    setItemId(id);
    setModelState("view-model")
    getRecipesDetails(id)
  }


  const showDeletModel = (id) => {
    setItemId(id);
    setModelState("delete-model")
  }

  const handleClose = () => setModelState("close");

  // Formate Data
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    return formData;
  };

  // Add recipe API
  const onSubmit = (data) => {
    console.log(data);
    const addFormData = appendToFormData(data);
    axios.post(`${baseUrl}/Recipe/`, addFormData
      , {
        headers: requestHeaders
      })
      .then((response) => {
        getToastValue("sucess", "Added successfully")
        getAllRecipes();


      })
      .then(() => {
        handleClose(); // Close the modal after updating
      })
      .catch((error) => {
        getToastValue(error.response.data.message)
      })

    reset();
  };

  //Get Recipe API
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    axios.get(`${baseUrl}/Recipe/`, {
      headers: requestHeaders,
      params: {
        pageSize: 5,
        pageNumber: pageNo,
        name: name,
        tagId: tagId,
        categoryId: categoryId,

      }

    })
      .then((response) => {
        setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
        setRecipesList([...response?.data?.data]);
        // setRecipesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Delete Recipe API
  const deleteRecipes = () => {
    axios.delete(`${baseUrl}/Recipe/${itemId}`, {
      headers: requestHeaders,
    })
    .then((response) => {
      getToastValue("success", "Recipe deleted successfully");
      return getAllRecipes(); // Return the promise
    })
    .then(() => {
      handleClose(); // Close the modal after updating
    })
    .catch((error) => {
      getToastValue(error.response.data.message);
    });
  };
  //Update Recipe API
  // const updateRecipe = (data) => {
  //   const updateFormData = appendToFormData(data);
  //   axios
  //     .put(`${baseUrl}/Recipe/${itemId}`, updateFormData, {
  //       headers: requestHeaders,
  //     })

  //     .then((response) => {
  //       getToastValue("sucess", "Updated successfully")
  //       getAllRecipes();
  //       handleClose();
  //       setForceUpdate(!forceUpdate); // Force re-render

  //     })
  //     .catch((error) => {
  //       getToastValue(error?.response?.data?.message)
  //     })
  // }
  const updateRecipe = (data) => {
    const updateFormData = appendToFormData(data);
    if (!Array.isArray(data.recipeImage) || !data.recipeImage.length) {
      // If no new image is selected and existing image path is available, include it
      if (recipe?.imagePath) {
        updateFormData.append("recipeImage", recipe?.imagePath);
      }
    }
    axios
      .put(`${baseUrl}/Recipe/${itemId}`, updateFormData, {
        headers: requestHeaders,
      })
      .then((response) => {
        getToastValue("success", "Updated successfully");
        return getAllRecipes(); // Return the promise
      })
      .then(() => {
        handleClose(); // Close the modal after updating
      })
      .catch((error) => {
        getToastValue(error?.response?.data?.message);
      });
  };
  const showUpdateModel = (item) => {
    // setRecipe(item);
    setModelState("update-model")
    getCategoryList();
    getAllTags();
    setRecipe(item);
    setValue("name", item?.name);
    setValue("price", item?.price);
    setValue("description", item?.description);
    setValue("tagId", item?.tag?.id);
    setValue("categoriesIds", item?.category[0]?.id);
    // setValue("recipeImage", item.imagePath[0]);
    setItemId(item?.id);

  }

  //Get Tag API
  const getAllTags = () => {
    // Fetch tags from the API
    axios.get(`${baseUrl}/tag/`, {
      headers: requestHeaders,
    })
      .then(response => {
        setTagsList(response?.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  };

  //Get Category List
  const getCategoryList = () => {
    // Fetch category from the API
    axios.get(`${baseUrl}/Category/`, {
      headers: requestHeaders,
    })
      .then(response => {
        setCategoriesList(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching catgories:', error);
      });
  }


  //View Recipe API
  const getRecipesDetails = (id) => {
    axios
      .get(`${baseUrl}/Recipe/${id}`, {
        headers: requestHeaders,
      })

      .then((response) => {
        // getToastValue("success","deleted Successfuly")
        // handleClose();
        console.log(response.data);
        setRecipeDetails(response.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getNameVAlue = (input) => {
    // console.log(target);
    setSearchString(input.target.value);
    getAllRecipes(1, input.target.value, selectedTagId, selectedCateId);
  }

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value)
    getAllRecipes(1, null, select.target.value, selectedCateId);
  };

  const getCategoryValue = (select) => {
    setSelectedCateId(select.target.value)
    getAllRecipes(1, null, selectedTagId, select.target.value);
  };
  const addToFavorit = () => {
    axios.post(`${baseUrl}/userRecipe/`,
      {
        recipeId: itemId,
      },
      {
        headers: requestHeaders
      })
      .then(response => {
        getToastValue("success", "Added Successfuly")
        handleClose();
        console.log(response)
      })
      .catch((error) =>
        console.log(error));
  }

  useEffect(() => {
    getAllRecipes(currentPage, searchString, selectedTagId, selectedCateId);
    getCategoryList();
    getAllTags();

  }, [currentPage, searchString, selectedTagId, selectedCateId]);



  return (
    <>
      <ToastContainer />

      <Header
        title={'Recipes Items '}
        paragraph={'You can now add your items that any user can order it from the Application and you can edit'}

      />
      {userRole === 'SuperAdmin' ?
        <>
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
                        valueAsNumber: true,
                        pattern: {
                          value: /^\d+(\.\d{2})?$/,
                          message: "Enter correct price"

                        }
                      })}
                  />
                  {errors.price &&
                    (<span className='text-danger my-3'>{errors.price.message}</span>)}
                </div>

                <div className="form-group my-2 ">
                  <select className="form-select"

                    {...register('tagId', {
                      required: true,
                      valueAsNumber: true,
                    }
                    )}>

                    <option >Select a Tag Id</option>
                    {tagsList.map((tag) => (
                      <option key={tag.id} value={tag.id}> {tag.name}</option>
                    ))}

                  </select>
                  {errors.tagId && errors.tagId.type === "required" &&
                    (<span className='text-danger my-2 '>Please Selsct an option</span>)}
                </div>

                <div className="form-group my-4">
                  <select className="form-select"
                    id="catgories"
                    {...register('categoriesIds',
                      {
                        // valueAsNumber: true,
                      }
                    )}>
                    <option >Select a Cargory Id</option>
                    {categoriesList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group my-3 ">
                  <input className="form-control"
                    type="file"
                    placeholder='choose file'
                    accept='image/*'
                    {...register("recipeImage",

                    )} />

                </div>
                <div className='form-group my-3 '>
                  <textarea type="text" className="form-control" placeholder="Leave a comment here " rows={4}
                    {...register("description",
                      {
                        required: "Description is required"
                      })}

                  ></textarea>
                  {errors.description &&
                    (<span className='text-danger my-3'>{errors.description.message}</span>)}
                </div>

                <div className="form-group">
                  <button className='btn btn-success w-100'>Add Recipes</button>
                </div>
              </form>


            </Modal.Body>

          </Modal >


          {/* Delete Recipe Model   */}
          <Modal show={modelState == "delete-model"
          } onHide={handleClose} >

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

          </Modal >

          {/* Update Recipe Model   */}
          < Modal show={modelState == "update-model"} onHide={handleClose} >

            <Modal.Body>
              <h4 className='text-center'>Update recipe</h4>
              <form onSubmit={handleSubmit(updateRecipe)} >
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
                        valueAsNumber: true,
                        pattern: {
                          value: /^\d+(\.\d{2})?$/,
                          message: "Enter correct price"

                        }
                      })}
                  />
                  {errors.price &&
                    (<span className='text-danger my-3'>{errors.price.message}</span>)}
                </div>

                <div className="form-group my-2 ">
                  <select className="form-select"
                    {...register('tagId', {
                      required: true,
                      valueAsNumber: true,
                    }
                    )}>

                    <option >Select a Tag Id</option>
                    {tagsList.map((tag) => (
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}

                  </select>
                  {errors.tagId && errors.tagId.type === "required" &&
                    (<span className='text-danger my-2 '>Please Selsct an option</span>)}
                </div>

                <div className="form-group my-4">
                  <select className="form-select"
                    id="catgories"
                    {...register('categoriesIds',
                      {
                        valueAsNumber: true,
                      }
                    )}>
                    <option >Select a Cargory </option>
                    {categoriesList?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group my-3 ">
                  <input className="form-control"
                    type="file"
                    placeholder='choose file'
                    accept='image/*'
                    {...register("recipeImage",

                    )} />
                  <img className='w-100'
                    src={`https://upskilling-egypt.com:443/` +
                      recipe?.imagePath} alt="" />

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

                <div className="form-group">
                  <button className='btn btn-success w-100'>Update Recipes</button>
                </div>
              </form>


            </Modal.Body>

          </Modal >
        </>

        : <Modal show={modelState === "view-model"} onHide={handleClose}>

          <Modal.Body>
            <h4 className=' text-success'> Recipe Details </h4>
            <div className='text-center'>
              {recipeDetails?.imagePath ?
                <img
                  className=' img-fluid'
                  src={`https://upskilling-egypt.com/` + recipeDetails?.imagePath} alt="" /> :
                <img className='img-fluid' src={noData} />
              }
              <p>Description:{recipeDetails?.description}</p>
              <p>Category:{recipeDetails?.category?.[0]?.name}</p>
              <p>Tag:{recipeDetails?.tag?.name}</p>

              <button
                onClick={addToFavorit}
                className='btn btn-outline-success '>Add to favorit</button>
            </div>

          </Modal.Body>

        </Modal>
      }
      <div className='row mx-4 p-3'>
        <div className='col-md-6'>
          <div>
            <h6>Recipes Table Details</h6>
            <span className=' text-muted'>You can check all details</span>
          </div>
        </div>
        {userRole === 'SuperAdmin' ?
          <div className='col-md-6 '>
            <div className='text-end'>
              <button onClick={showAddModel} className=' btn btn-success'>Add New Recipe</button>
            </div>
          </div> : null}

        <div>
          <div className="row my-2 ">
            <div className="col-md-4 ">
              <div className='icon-input position-relative'>
                <i className="icons fa-solid fa-search position-absolute text-success" />
                <input
                  onChange={getNameVAlue} placeholder='search by recipe name....' className='form-control my-2' type="text" />
              </div>


            </div>

            <div className="col-md-4 p-2">
              <select
                onChange={getTagValue} className="form-select">
                <option >Select a Tag Id</option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}> {tag.name}</option>
                ))}

              </select>
            </div>

            <div className="col-md-4 p-2">
              <select
                onChange={getCategoryValue} className="form-select">
                <option >Select a Category Id</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {recipesList.length > 0 ?
            <div>
              <table className="table custom-table table-striped rounded-3">
                <thead className=' table-success'>
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
                  {recipesList.map((recipe, index) => (

                    <tr key={recipe.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{recipe.name}</td>
                      <td >
                        <div className='img-container' >
                          {/* <img
                            className=' img-fluid'
                            src={
                              `https://upskilling-egypt.com:443/` +
                              recipe.imagePath} alt="" /> */}
                          {recipe.imagePath ?
                            <img
                              className=' img-fluid'
                              src={
                                `https://upskilling-egypt.com:443/` +
                                recipe.imagePath} alt="" /> : (
                              <img className='img-fluid' src={noData} />
                            )}
                        </div>
                      </td>
                      <td >{recipe.description}</td>
                      <td >{recipe.price}</td>
                      <td >{recipe?.category[0]?.name}</td>

                      <td >
                        {recipe.tag.name}

                      </td>
                      {userRole === 'SuperAdmin' ?
                        <td >
                          <i onClick={() => showUpdateModel(recipe)}
                            className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
                          <i onClick={() => showDeletModel(recipe.id)}
                            className="fa-solid fa-trash text-danger"></i>
                        </td> : <td >
                          <i onClick={() => showViewModel(recipe.id)}
                            className="fa-solid fa-eye text-success"></i>
                        </td>}
                    </tr>

                  ))}
                </tbody>
              </table>

              <CustomPagination totalPages={pagesArray.length} currentPage={currentPage} onPageChange={setCurrentPage} />

            </div>
            :
            <div className=' sweet-loading d-flex justify-content-center align-items-center p-5 m-3'>
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
                : <NoData />}
            </div>
          }

        </div>

      </div>


    </>

  )
}



