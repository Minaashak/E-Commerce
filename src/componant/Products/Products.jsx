import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {
  let[allProduct , setAllProduct] = useState([])
  useEffect(()=>{
    getAllproduct()
  },[])

  async function getAllproduct(){
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(res?.data.data);
    setAllProduct(res?.data.data);
  }
  
  return (
    <>
    <div className="row g-4">
      {allProduct?.map((product)=>{
        return <div className="col-md-6 col-lg-3 prodact p-3" key={product._id}>
        <div className="about-product">
          <img src={product.imageCover} className='w-100' alt="" />
          <h3 className='main'> {product.category.name} </h3>
          <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
          <div className="icon d-flex justify-content-between">
            <p>{product.price}</p>
            <p>
            <i className="fa-solid fa-star star"></i>{product.ratingsAverage}
            </p>
          </div>
          <button className='btn btn-back text-white w-100'>Add To Cart</button>
        </div>
      </div>
      })}
    </div>
    
    </>
  )
}

export default Products