import React, { useEffect, useState } from "react";
import Navbar from "./../navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import AuthContextProvider from "../Context/AuthContext";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import CartCountContextProvider from "../Context/CartCount";

function Layout() {
  let queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartCountContextProvider>
          <AuthContextProvider>
            <Navbar />
            <section>
              <div className="container">
                <Outlet />
              </div>
            </section>
            <Footer />
            <div>
              <Offline className="Offline">
                <i class="fa-solid fa-circle-exclamation"></i>Only shown offline
                (surprise!)
              </Offline>
            </div>
            <Toaster />
          </AuthContextProvider>
        </CartCountContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default Layout;
