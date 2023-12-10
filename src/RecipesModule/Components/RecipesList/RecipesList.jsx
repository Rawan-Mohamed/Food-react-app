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
  const [recipe, setRecipe] = useState();
  const [pagesArray, setPagesArray] = useState([])
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [selectedCateId, setSelectedCateId] = useState("");


  const showAddModel = () => {

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
    // -------------------
    // try way 
    // const formData = new FormData();

    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const value = data[key];
    //     if (Array.isArray(value)) {
    //       for (let i = 0; i < value.length; i++) {
    //         formData.append(`${key}[${i}]`, value[i]);
    //       }
    //     } else {
    //       formData.append(key, value);
    //     }
    //   }
    // }


    // ---------------------------
    const addFormData = new FormData();
    addFormData.append("name", data['name']);
    addFormData.append("price", data['price']);
    addFormData.append("description", data['description']);
    addFormData.append("tagId", data['tagId']);
    addFormData.append("categoriesIds", data['categoriesIds']);
    addFormData.append("recipeImage", data['recipeImage'][0]);
    // Object.entries(data).forEach(([key, value]) => {
    //   if (Array.isArray(value)) {
    //     value.forEach((item, index) => {
    //       formData.append(`${key}[${index}]`, item);
    //     });
    //   } else {
    //     formData.append(key, value);
    //   }
    // })
    console.log(data);
    axios.post("https://upskilling-egypt.com:443/api/v1/Recipe/", addFormData
      // { 
      //   ...addFormData,
      //    recipeImage: addFormData.recipeImage[0] 
      //   },

      , {
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

    reset();
  };

  //Get Recipe API
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    axios.get("https://upskilling-egypt.com:443/api/v1/Recipe/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
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
        setRecipesList(response?.data?.data);

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

  //Update Recipe API
  const updateRecipe = (data) => {

      // -------------------
    // try way 
    // const formData = new FormData();

    // for (let key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const value = data[key];

    //     if (key === 'recipImage') {
    //       if (value && value.length > 0) {
    //         value = value[0];
    //       } else {
    //         // handle case when no file is selected
    //         console.log('No file selected for the recipient image.');
    //       }
    //     }

    //     formData.append(key, value[0]);
    //   }
    // }


    // ---------------------------

    const addFormData = new FormData();
    addFormData.append("name", data['name']);
    addFormData.append("price", data['price']);
    addFormData.append("description", data['description']);
    addFormData.append("tagId", data['tagId']);
    addFormData.append("categoriesIds", data['categoriesIds']);
    addFormData.append("recipeImage", data['recipeImage'][0]);
    axios
      .put(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`, addFormData, {
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
        getAllRecipes();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      })
  }

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

  //Get Category List
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

  // useEffect(() => {
  //   getCategoryList();
  //   getAllTags();
  // }, []);


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

  useEffect(() => {
    getAllRecipes(1);
    getCategoryList();
    getAllTags();
    
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
                //  onChange={handleSelect} 
                //  id="tags"
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

              {/* {errors.recipeImage && <span>{errors.recipeImage.message}</span>} */}
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

      {/* Update Recipe Model   */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>

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
                //  onChange={handleSelect} 
                //  id="tags"
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
              <button className='btn btn-success w-100'>Update Recipes</button>
            </div>
          </form>


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
              <table className="table table-striped rounded-3">
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
                          <img className='img-fluid'src={noData} />
                        )}
                        </div>
                      </td>
                      <td >{recipe.description}</td>
                      <td >{recipe.price}</td>
                      <td >{recipe?.category[0]?.name}</td>

                      <td >
                        {recipe.tag.name}

                      </td>
                      <td >
                        <i onClick={() => showUpdateModel(recipe)}
                          className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
                        <i onClick={() => showDeletModel(recipe.id)}
                          className="fa-solid fa-trash text-danger"></i>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>


              <nav aria-label="...">
                <ul className="pagination justify-content-center pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li key={pageNo} onClick={() => getAllRecipes(pageNo, searchString)} className="page-item">
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



