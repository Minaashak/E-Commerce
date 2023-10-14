import React from 'react';
import img1 from '../../Assits/image/1.png';
import Slider from "react-slick";
import img2 from '../../Assits/image/2.jpeg';
import img3 from '../../Assits/image/3.jpeg';
import img4 from '../../Assits/image/4.jpeg';

function HomeSlider() {
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
          <div className={className} onClick={onClick}>
            <i class="fa-solid fa-chevron-right arrow"></i>
          </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
          <div className={className} onClick={onClick}>
            <i className="fa-solid fa-angle-left arrow"></i>
          </div>
        );
      }
    

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows :false ,
        autoplay: true,
        autoplaySpeed: 1000,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
        
      };
  return (
    <>
     <div className="row">
        <div className="col-lg-9 p-0 my-4 py-3">
          <Slider {...settings}>
            <img src={img1} height={450} className="w-100" alt="" />
            <img src={img2} height={450} className="w-100" alt="" />
          </Slider>
        </div>
        <div className=" col-lg-3 p-0 my-4 py-3">
          <img src={img3} height={225} className="w-100" alt="" />
          <img src={img4} height={225} className="w-100" alt="" />
        </div>
      </div>
    </>
  )
}

export default HomeSlider