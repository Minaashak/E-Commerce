import React from 'react'
import style from "./Footer.module.css"

function Footer() {
  return (
    <>
    <footer className='section'>
        <div className="container">
            <div className="row g-4">
                <h2>Get the Fresh Cart App</h2>
                <p className='lead'>We Will send you a link , open it on your phone to download the app</p>
                <div className="col-sm-12 col-lg-10">
                    <input className='form-control' type="email" placeholder='Email..' name='email' />
                </div>
                <div className="col-sm-12 col-lg-2">
                    <button className='btn-back'><a href="" className='aColor'>Share App Link</a></button>
                </div>
                <hr />
                <div className="col-lg-6">
                    <div className="payment">
                        <h4>Payment Partners</h4>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="deliveries">
                        <h4>Get deliveries With Fresh Cart</h4>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer