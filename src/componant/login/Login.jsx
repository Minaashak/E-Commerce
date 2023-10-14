import React, { useContext, useEffect, useState } from 'react'
import{Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  let navigate = useNavigate();
  let {isUserLoggedIn , setIsUserLoggedIn}= useContext(AuthContext)
  let [isLoading , setIsLoading] = useState(false)
  let [errorMessage , setErrorMessage] = useState("")
  
  
  useEffect(()=>{
    if(isUserLoggedIn){
      navigate('/home')
    }
  },[])

  
  async function login(values){
    console.log(values);
    setIsLoading(true);
    setErrorMessage("");
    let {data} = await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    })
    console.log(data);
    localStorage.setItem("token" , data.token);
    setIsLoading(false);
    setIsUserLoggedIn(true)
    navigate('/home');
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

    email:Yup.string().required("email is Required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Valid Email'),
    password: Yup.string().required("password is Required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , 'Password must have One Letter , Special Character , number and min length is 8'),
  })
  

  let formik = useFormik({
    initialValues:{
      
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit:login,
  })
  // console.log(formik);
  return (
    <>
      <div className="row g-4 justify-content-center ">
        <div className="col-lg-10 p-4    ">
          <div className="login w-100 my-3">
            <h2 className='mb-4'>login Now:</h2>
            <div className="form">
              <form onSubmit={formik.handleSubmit}>
                {/* !-----Email-input */}
                <label htmlFor="email">Email:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id='email'  className='form-control mb-3' name='email' />
                {formik.errors.email && formik.touched.email?<div className="alert alert-danger ">
                  <p> {formik.errors.email} </p>
                </div> : null }
                {/* !-----Password-input */}
                <label htmlFor="password">Password:</label>
                <input  onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id='password'  className='form-control mb-3' name='password' />
                {formik.errors.password && formik.touched.password?<div className="alert alert-danger ">
                  <p> {formik.errors.password} </p>
                </div> : null }

                    {/* !----Response-Error */}
                    {errorMessage?<div className="alert alert-danger ">
                        {errorMessage}
                    </div>:null}

                    {/* !-------Login-Button */}
                    {isLoading?
                    <button disabled type='btn'  className='btn btn-back text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>:
                    <button disabled={isLoading} type='submit'  className='btn btn-back text-white ms-auto d-block'>login</button>}
                
                
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Login