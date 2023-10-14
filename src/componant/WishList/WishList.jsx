import axios from 'axios'
import React, { useEffect, useState } from 'react'

function WishList() {

  let [wishList , setWishList] = useState()

  useEffect(()=>{
    getAllWishList()
  },[])


  async function getAllWishList(){
    let res =await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers:{
        token: localStorage.getItem('token')
      }
    })

    setWishList(res?.data.data);
  }
  return (
    <>
    <div className="row justify-content-center wishList">
      <div className="col-md-10 p-3">
      <div className="wishList">
        <h2>My Wish List</h2>


        {wishList?.map((wish)=>{
          return  <div className="card border-0 wishList my-3" key={wish._id}>
          <div className="row align-items-center g-4">
            <div className="col-sm-3">
              <div className="img">
                <img src={wish.imageCover}  className='w-100' alt="" />
              </div>
            </div>
            <div className="col-sm-9 d-flex justify-content-between align-items-center ">
              <div className="about">
                <h3>{wish.category.name}</h3>
                <h5 className='main'>{wish.title}</h5>
                <p>Price: {wish.price} EGP</p>
                <p><i class="fa-solid fa-star star"></i> {wish.ratingsAverage}</p>
                <button className='btn btn-outline-danger '> <i class="fa-solid fa-trash"></i>Remove</button>
              </div>
              <div className="button">
                <button className='btn btn-back text-white '>Add To Cart</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        })}


      </div>
      </div>
    </div>
    </>
  )
}

export default WishList