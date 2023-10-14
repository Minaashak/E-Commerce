import axios from "axios";
import React, { useEffect, useState } from "react";
import Prodact from "../Prodact/Prodact";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSlider from "../HomeSlider/HomeSlider";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import HomeCategories from './../HomeCategories/HomeCategories';

function Home() {
  let [prodacts, setProdact] = useState([]);
  

  useEffect(() => {
    getAllProdact();
  }, []);

  async function getAllProdact() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data.data);
    setProdact(data?.data);
  }
  console.log(prodacts);

  // let { isLoading, isError, isFetched, data } = useQuery(
  //   "prodacts",
  //   getProdacts
  // );
  // function getProdacts() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  // }

 


  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HomeSlider />

      <HomeCategories/>

      <div className="row g-4">
        <div className="input py-4">
        <input type="text"  placeholder="Search..."  className="form-control  w-75 m-auto "/>
        </div>
        {prodacts.map((prodact) => {
          return (
            <div key={prodact?._id} className="col-md-6 col-lg-4 col-xl-3">
              <Prodact prodact={prodact} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
