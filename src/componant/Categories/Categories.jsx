import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Categories() {

  let [categories , setCategories] = useState([])


  useEffect(()=>{
    getCategories();
  },[]);

  async function getCategories(){
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(res.data.data);
    setCategories(res?.data.data)
  }

  return (
    <>

    <section>
    <div className="row g-4">
    {categories?.map((categorie)=>{
      return<div className="col-xl-4 text-center">
      <div className="about categorie-cart card-info">
        <img src={categorie.image} height={350} className='w-100' alt="" />
        <h3 className='categorie-title'>{categorie.name}</h3>
      </div>
    </div>
    })}
    </div>
    </section>
    
    </>
  )
}

export default Categories