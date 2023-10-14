import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Orders() {

   let{id} = useParams();

   useEffect(()=>{
      // getAllOrders()
   },[])
  
  async function getAllOrders(){
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id);
    console.log(res.data);
  }
  
  return (
    <>
    
    </>
  )
}

export default Orders