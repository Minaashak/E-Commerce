import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Brand() {

  let[brand , setBrands]= useState([]);


  useEffect(()=>{
    getAllBrands()
  },[])
  async function getAllBrands(){
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      // console.log(res?.data.data);
      setBrands(res?.data.data);
  }
  return (
    <>
    <div className="row g-4">
      <h2 className='main fw-bold text-center'>All Brands</h2>
      {brand?.map((brand)=>{
        return <div className="col-md-6 col-lg-3 text-center" key={brand._id}>
        <div className="about-brand cart-info">
          <img src={brand.image} className='w-100' alt="" />
          <h3 className='main'>{brand.name} </h3>
        </div>
      </div>
      })}
    </div>
    
    </>
  )
}

export default Brand