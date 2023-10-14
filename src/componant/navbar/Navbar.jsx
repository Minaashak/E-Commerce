import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logoImage from "../../Assits/image/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./../Context/AuthContext";
import { CartCountContext } from "../Context/CartCount";

function Navbar() {
  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
  let navigate = useNavigate();
  let {cartCount} = useContext(CartCountContext)

  function logOut() {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar fixed-top w-100 navbar-expand-lg section">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>
            <img src={logoImage} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isUserLoggedIn ? (
              <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/home"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/wishlist"}>
                    Wish List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categories"}>
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/brands"}>
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/allorders"}>
                    Orders
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="text-center align-items-center ms-auto">
              <Link to={"/cart"}>
              <li className="li d-flex align-items-center">
                <p>{cartCount}</p><i className="fa-solid fa-cart-shopping"></i>
              </li>
              </Link>
              <li>
                <i className="fa-brands fa-instagram" />
              </li>
              <li>
                <i className="fa-brands fa-facebook" />
              </li>
              <li>
                <i className="fa-brands fa-tiktok" />
              </li>
              <li>
                <i className="fa-brands fa-twitter" />
              </li>
              <li>
                <i className="fa-brands fa-linkedin" />
              </li>
              <li>
                <i className="fa-brands fa-youtube" />
              </li>
              
            </ul>
            <div className="d-flex justify-content-center">
              {!isUserLoggedIn ? (
                <>
                  <button className="btn-back">
                    <Link to={"/login"} className="aColor">
                      Login
                    </Link>
                  </button>
                  <button className="btn-back">
                    <Link to={"/register"} className="aColor">
                      Regester
                    </Link>
                  </button>
                </>
              ) : null}
              {isUserLoggedIn ? (
                <button className="btn-back">
                  <Link onClick={logOut} to={""} className="aColor">
                    Log Out
                  </Link>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
