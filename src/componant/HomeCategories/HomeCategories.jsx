import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HomeCategories() {

  let[homeCategorie , setHomeCategorie] = useState();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  useEffect(()=>{
    getCategories();
  },[]);

  async function getCategories(){
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(res.data.data);
    setHomeCategorie(res?.data.data)
  }

  return (
    <>

  
    <div className="d-flex w-100">
    {homeCategorie?.map((categorie)=>{
      return<Slider {...settings}>
          <div>
            <img src={categorie.image} height={250} className='w-100' alt="" />
            <h6 className='categorie-title'>{categorie.name}</h6>
          </div>
        </Slider>
      
    })}
    </div>

    
    </>
  )
}

export default HomeCategories


{/* <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider> */}