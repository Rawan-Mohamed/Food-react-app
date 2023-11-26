import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CategoriesList from '../../../CategoriesModule/Components/CategoriesList/CategoriesList';
import HeaderHome from '../../../SharedModule/Components/Header/HeaderHome';



export default function Home() {
  {/* ------------------------------------------ */ }

  {/* ------------------------------------------ */ }
  return (
    <>
      <HeaderHome
        title={'Welcom UpSkilling'}
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
                Fill Recopes
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
