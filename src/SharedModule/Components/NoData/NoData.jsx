import React from 'react'
import noData from "../../../assets/images/no-data.png"


export default function NoData() {
    return (
        <>
            <div className='text-center'>
                <img className='my-3' src={noData} alt="" />
                <h4>No Data !</h4>
                <p className='text-muted text-wrapper '>There is no Data here !!</p>
            </div>

        </>
    )
}
