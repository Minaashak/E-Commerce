import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

function ProdactDetails() {

    let params = useParams();
    let [prodactDetails , setProdactDetails]= useState();
    let [isLoading , setIsLoading]= useState();

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    // console.log(params.id);
    useEffect(()=>{
        getProdactDetails(params.id);
    },[])


    async function getProdactDetails(prodactId){
        setIsLoading(true);
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + prodactId);
        setIsLoading(false);
        // console.log(res.data.data);
        setProdactDetails(res.data.data);
    }

  return (<>
            <Helmet>
                <title>{prodactDetails?.title}</title>
            </Helmet>

  {!isLoading? <div className="row align-items-center py-4">
    <div className="col-md-3">
      <div className="img">

        <Slider {...settings}>
            {prodactDetails?.images.map((img)=>{
              return <img key={img} src={prodactDetails?.imageCover} className='w-100' alt="" />
            })}
        </Slider>

      </div>
    </div>
    <div className="col-md-9">
      <div className="content">
        <h1>{prodactDetails?.title}</h1>
        <h5 className='main'>{prodactDetails?.category.name}</h5>
        <p>{prodactDetails?.description}</p>
        <p className='fw-bold'>Price: {prodactDetails?.price} </p>
        <p><i className="fa-solid fa-star star"></i> {prodactDetails?.ratingsAverage} </p>
      </div>
    </div>
  </div> :<span className="loader py-4 m-4 text-center"></span> }
  </>
  )
}

export default ProdactDetails