import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './App.css';
import Navbar from "./componant/navbar/Navbar";
import Footer from "./componant/Footer/Footer";
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from './componant/Layout/Layout';
import Home from './componant/Home/Home';
import Brand from './componant/Brands/Brand';
import Cart from './componant/Cart/Cart';
import Categories from './componant/Categories/Categories';
import Login from './componant/login/Login';
import Products from './componant/Products/Products';
import Register from './componant/Register/Register';
import NotFound from './componant/Notfound/NotFound';
import Orders from './componant/Orders/Orders';
import ProtectedRoute from './componant/Protected Route/ProtectedRoute';
import ProdactDetails from "./componant/ProdactDetails/ProdactDetails";
import CheckOut from "./componant/CheckOut/CheckOut";
import WishList from "./componant/WishList/WishList";

function App() {

  let routers = createHashRouter([
    {path :"" , element : <Layout/>, children:[
      {path :""  ,element :<Navigate to={'home'}/>},
      {path :"home" ,element : <ProtectedRoute> <Home/> </ProtectedRoute>  },
      {path :"brands" ,element : <ProtectedRoute> <Brand/> </ProtectedRoute> },
      {path :"cart" ,element : <ProtectedRoute> <Cart/> </ProtectedRoute> },
      {path :"categories" ,element : <ProtectedRoute> <Categories/></ProtectedRoute> },
      {path :"login" ,element :<Login/>},
      {path :"products" ,element :  <ProtectedRoute> <Products/> </ProtectedRoute> },
      {path :"register" ,element :<Register/>},
      {path :"allorders" ,element : <ProtectedRoute> <Orders/> </ProtectedRoute> },
      {path :"wishlist" ,element : <ProtectedRoute> <WishList/> </ProtectedRoute> },
      {path :"prodactdetails/:id" ,element : <ProtectedRoute> <ProdactDetails/> </ProtectedRoute> },
      {path :"checkout/:id" ,element : <ProtectedRoute> <CheckOut/> </ProtectedRoute> },
      {path :"*" ,element :<NotFound/>},
    ]}
  ]);

  return (<>
    
    <RouterProvider router={routers}>
      
    </RouterProvider>
    </>
  );
}

export default App;
