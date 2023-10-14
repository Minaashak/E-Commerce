import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartCountContext } from "../Context/CartCount";
import { date } from "yup";

function Prodact({ prodact }) {


  let {setCartCount} = useContext(CartCountContext)

  async function addProdactToCart(productId) {
    let res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        toast.error(err.respponse.data.message);
      });
    // console.log(res.data);
    setCartCount(res?.data.numOfCartItems)
    if (res?.data.status == "success") {
      toast.success(res?.data.message, {
        duration: 1500,
      });
    }
  }


  async function addProdactToWishList(productId){
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {productId},{
      headers:{
        token: localStorage.getItem('token')
      }
    }).catch((err)=>{
      toast.error(err.respponse.data.message)
    })
    console.log(res.data);
    if(res.data.status == 'success' ){
      toast.success(res.data.message);
    }
  }
  

  return (
    <>
      <div className="prodact p-4">
        <Link to={"/prodactdetails/" + prodact?._id}>
          <img
            src={prodact?.imageCover}
            alt="prodact-image"
            className="w-100"
          />
          
          <h3>{prodact.title.split(" ").slice(0, 2).join(" ")}</h3>
          
          <h5 className="main">{prodact?.category.name}</h5>
          <p className="d-flex justify-content-between medium-font fw-bold">
            Price:{prodact.price} EGP{" "}
            <i className="fa-solid fa-star star ms-auto"></i>
            {prodact.ratingsAverage}{" "}
          </p>
        </Link>
          <div className="btn-cart d-flex ">
        <button
          onClick={() => addProdactToCart(prodact?._id)}
          className="w-100 btn-back text-white"
        >
          Add To Cart
        </button>
          
          <button onClick={()=> addProdactToWishList(prodact?._id)} className="btn" ><i className="fa-regular fa-heart"></i></button>
          </div>
      </div>
    </>
  );
}

export default Prodact;
