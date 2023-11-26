import React from 'react'

import Header from '../../../SharedModule/Components/Header/Header'

export default function CategoriesList() {
  return (
    <>
     <Header
        title={'Categories Item'}
        paragraph={'This is a welcoming screen for the entry of the application , you can now see the options'}
         />
    {/* <Header>
        <div className='header-content  m-2 rounded-3 text-white'>
          <div className=' container-fluid'>
            <div className="row px-4 py-2 g-0 align-items-center">
              <div className="col-md-10">
                <h3>Welcome Categories</h3>
                <p>You can now add your items that any user can order it from the Application and you can edit</p>
              </div>
              <div className="col-md-2">
                <img className=' img-fluid' src={headerBg} alt='' />
              </div>
            </div>
          </div>


        </div>
      </Header> */}

        <div>CategoriesList</div>

    </>
  )
}
