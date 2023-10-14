import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const CartCountContext = createContext();

export default function  CartCountContextProvider({children}){

    let [cartCount , setCartCount] = useState(0);

    useEffect(()=>{
        getUserCart()
    },[])

    async function getUserCart(){
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers:{
            token: localStorage.getItem("token"),
          }
        })
        
        setCartCount(res?.data.numOfCartItems);

    }


    return(<CartCountContext.Provider value={{cartCount , setCartCount}}>
    
    {children}
    </CartCountContext.Provider>
    )
}