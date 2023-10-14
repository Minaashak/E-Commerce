import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartCountContext } from '../Context/CartCount';

function Cart() {

  let [numOfCartItem , setNumOfCartItem] = useState(0);
  let [totalCartPrice , setTotalCartPrice] = useState(0);
  let [cartprodacts , setCartProdacts] = useState([]);
  let [requestTimeOut , setRequestTimeOut] = useState();
  let [cartId , setCartId] = useState();
  let {setCartCount} = useContext(CartCountContext);


  useEffect(()=>{
    getUserCart()
  },[])
  
  async function getUserCart(){
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers:{
          token: localStorage.getItem("token"),
        }
      })
      setCartId(res?.data.data._id)
      setNumOfCartItem(res?.data.numOfCartItems);
      setTotalCartPrice(res?.data.data.totalCartPrice);
      setCartProdacts(res?.data.data.products);

  }

  async function removeCartItem(productId){
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId ,{
      headers:{
        token: localStorage.getItem("token"),
      }
    }).catch((err)=>{
      console.log(err);
    })
    console.log(res?.data);
    
    setNumOfCartItem(res?.data.numOfCartItems);
    setCartCount(res?.data.numOfCartItems);
    setTotalCartPrice(res?.data.data.totalCartPrice);
    setCartProdacts(res?.data.data.products);
  }
  async function clearCartItem(){
    setNumOfCartItem(0);
    setTotalCartPrice(0);
    setCartProdacts([]);

    
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token: localStorage.getItem("token"),
      }
    }).catch((err)=>{
      console.log(err);
    })    
  }

  async function updataProdactCount(prodactId , count , index){
        
    // console.log(prodactId , count);
    let newCartProdacts = [...cartprodacts];
    newCartProdacts[index]['count'] = count;
    setCartProdacts(newCartProdacts);

    clearTimeout(requestTimeOut);
    setRequestTimeOut(setTimeout( async ()=>{
        
      let res = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + prodactId ,{
        count
      },{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      console.log(res.data);
      setNumOfCartItem(res?.data.numOfCartItems);
      setTotalCartPrice(res?.data.data.totalCartPrice);
      setCartProdacts(res?.data.data.products);
    
    },500));
  }
  
  return (
    <>

    <Helmet>
      <title>Cart</title>
    </Helmet>


    <div className='text-end mt-4'>
      <button onClick={()=>clearCartItem() } className='btn btn-outline-danger'>Clear All Cart</button>
    </div>
      


    {cartprodacts?.map((product , index)=>{
      return <div className="row my-4 align-items-center p-2 cart " key={product._id}>
      <div className="col-lg-2">
        <div>
            <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
      </div>

      <div className="col-md-8">
        <div>
          <h3>{product.product.title}</h3>
          <h5 className='main'>{product.product.category.name}</h5>
          <p>EGP: {product.price}</p>
          <p><i className="fa-solid fa-star star"></i> {product.product.ratingsAverage}</p>
        </div>
      </div>

      <div className="col-md-2">
        <div className='text-center'>
          <button onClick={()=>removeCartItem(product.product._id)} className='btn btn-outline-danger '>Remove</button>
        </div>
        <div  className='d-flex align-items-center pt-3 justify-content-center'>
          <button onClick={()=> updataProdactCount(product.product._id, product.count - 1 , index )} className='btn mx-2 bg-main'>-</button>
          <span>{product.count}</span>
          <button onClick={()=> updataProdactCount(product.product._id , product.count + 1 , index)} className='btn mx-2 bg-main'>+</button>
        </div>
      </div>
    </div>
    })}
    <div className='my-4 d-flex justify-content-between align-items-center'>
      <Link to={"/checkout/" + cartId}>
      <button className='btn btn-back text-white'>Check Out</button>
      </Link>
      <h4>Total Cart Price: {totalCartPrice} EGP</h4> 
    </div>
    </>
  )
}

export default Cart