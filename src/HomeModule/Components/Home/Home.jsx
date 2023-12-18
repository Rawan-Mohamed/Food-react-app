import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderHome from '../../../SharedModule/Components/Header/HeaderHome';
import { AuthContext } from '../../../Context/AuthContext';



export default function Home() {
  {/* ------------------------------------------ */ }
  const {userData} =useContext(AuthContext)
  {/* ------------------------------------------ */ }
  return (
    <>
      <HeaderHome
        title={"Welcome "+userData?.userName || "user"}
        paragraph={'This is a welcoming screen for the entry of the application , you can now see the options'}

      />


      <div className="row section-container mx-4 py-4 rounded-3 align-items-center ">
        <div className="col-md-6">
          <div>
            <h4>Fill the Recipes !</h4>
            <p>
              you can now fill the meals easily using the table and form , click here and sill it with the table !
            </p>
          </div>
        </div>

        <div className="col-md-6 ">
          <div className=' text-end'>
            <button className='btn btn-success'>
              <Link className=' text-white text-decoration-none' to="/dashboard/recipes">
                Fill Recipes
                <i className=' fa fa-arrow-right p-2'></i>
              </Link>
            </button>

          </div>
        </div>
      </div>
      {/* ------------------------------------------ */}

      {/* ------------------------------------------ */}

    </>

  )
}
