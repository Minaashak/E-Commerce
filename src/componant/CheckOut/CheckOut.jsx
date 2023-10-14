import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";

function CheckOut() {


    let {id} = useParams()


    async function CheckOut(shippingAddress) {
        // console.log(values);
        fetchCheckOut(shippingAddress)

    }


    async function fetchCheckOut(shippingAddress){
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
            shippingAddress
        },{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        window.location.href = res?.data.session.url;
    }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: CheckOut,
  });
  return (
    <>
        <div className="row g-4 justify-content-center my-4">
            <div className="col-md-9 py-3">
            <form onSubmit={formik.handleSubmit}>
                {/* !-----Email-input */}
                <label htmlFor="details">Details:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="text" id='details'  className='form-control mb-3' name='details' />
                
                {/* !-----City-input */}
                <label htmlFor="city">City:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="text" id='city'  className='form-control mb-3' name='city' />
                    
                {/* !-----Password-input */}
                <label htmlFor="phone">Phone:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="tel" id='phone'  className='form-control mb-3' name='phone' />
                    
                {/* !-------Submit-Button */}
                <button type='submit'  className='btn btn-back text-white ms-auto d-block'>Order</button>
                
                
        </form>
            </div>
        </div>
    </>
  );
}

export default CheckOut;
