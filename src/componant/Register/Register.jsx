import React, { useState } from 'react'
import styleRegister from './Register.modul.css'
import{Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  let [isLoading , setIsLoading] = useState(false)
  let [errorMessage , setErrorMessage] = useState("")

  async function register(values){
    console.log(values);
    setIsLoading(true);
    setErrorMessage("");
    let {data} = await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    })
    console.log(data);
    setIsLoading(false);
    navigate('/login')
  }


  // function validate(values){
  //   let errors={};
    
  //   if(values.name == ""){
  //     errors.name = "Name is Required";
  //   }else if(values.name.length < 3 ){
  //     errors.name = "Min Length must be grater thwn 3 Characters";
  //   }else if(values.name.length > 20){
  //     errors.name= "Max Length must be less than 20 Characters";
  //   }

  //   if(values.email == ""){
  //     errors.email = "email is Required";
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email = "Enter Valid Email";
  //   }

  //   if(values.password == ""){
  //     errors.password = "password is Required";
  //   }else if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
  //     errors.password = "Password must have One Letter , Special Character , number and min length is 8";
  //   }

  //   if(values.rePassword == ""){
  //     errors.rePassword = "Password is Required";
  //   }else if( values.password != values.rePassword ){
  //     errors.rePassword = "Password and repassword doesn't match";
  //   }

  //   if(values.phone == ""){
  //     errors.phone = "phone is Required";
  //   }else if(/^01[0125][0-9]{8}}$/.test(values.phone)){
  //     errors.phone = "Enter Valid Egyptian Phone Number";
  //   }

  //   return errors;
  // }


  let validationSchema = Yup.object({
    name:Yup.string().min(3,"Min Length must be grater thwn 3 Characters").max(20,"Max Length must be less than 20 Characters").required("Name is Required"),
    email:Yup.string().required("email is Required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Valid Email'),
    password: Yup.string().required("password is Required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , 'Password must have One Letter , Special Character , number and min length is 8'),
    rePassword : Yup.string().required("password is Required").oneOf([Yup.ref('password')], "Password and repassword doesn't match"),
    phone: Yup.string().required("phone is Required").matches(/^01[0125][0-9]{8}$/,'Enter Valid Egyptian Phone Number'),
  })
  

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema,
    onSubmit:register,
  })
  // console.log(formik);
  return (
    <>
      <div className="row g-4 justify-content-center ">
        <div className="col-lg-10 p-4    ">
          <div className="register w-100 my-3">
            <h2 className='mb-4'>Register Now:</h2>
            <div className="form">
              <form onSubmit={formik.handleSubmit}>
                <label  htmlFor="name" >Name:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" id='name'  className='form-control mb-3' name='name' />
                
                {formik.errors.name && formik.touched.name?<div className="alert alert-danger ">
                  <p> {formik.errors.name} </p>
                </div> : null }
                


                <label htmlFor="email">Email:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id='email'  className='form-control mb-3' name='email' />
                {formik.errors.email && formik.touched.email?<div className="alert alert-danger ">
                  <p> {formik.errors.email} </p>
                </div> : null }
                
                <label htmlFor="password">Password:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id='password'  className='form-control mb-3' name='password' />
                {formik.errors.password && formik.touched.password?<div className="alert alert-danger ">
                  <p> {formik.errors.password} </p>
                </div> : null }

                <label htmlFor="rePassword">RePassword:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" id='rePassword'  className='form-control mb-3' name='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger ">
                  <p> {formik.errors.rePassword} </p>
                </div> : null }

                <label htmlFor="phone">Phone:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" id='phone'  className='form-control mb-3' name='phone' />
                {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger ">
                  <p> {formik.errors.phone} </p>
                </div> : null }


                    {errorMessage?<div className="alert alert-danger ">
                        {errorMessage}
                    </div>:null}

                    {isLoading?
                    <button disabled type='btn'  className='btn btn-back text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>:
                    <button disabled={isLoading} type='submit'  className='btn btn-back text-white ms-auto d-block'>Register</button>}
                
                
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Register