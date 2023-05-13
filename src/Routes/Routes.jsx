import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import Home from '../Pages/Home/Home/Home'
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";

import BookServices from "../Pages/BookServices/BookServices";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRouter from "../PrivateRouter/PrivateRouter";



 const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[

        {
            path:'/',
            
            element: <Home></Home>
            
        },
        {
            path:'/login',
            
            element: <Login></Login>
        },
        {
            path:'/singUp',
            
            element: <SingUp></SingUp>
        },

        {
          path:'/book/:id',
          element: <PrivateRouter>
            <BookServices></BookServices>
          </PrivateRouter>,
          loader:({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        },
       
        {
          path:'/bookings',
          element: <PrivateRouter>
            <Bookings></Bookings>
          </PrivateRouter>
        }
        
      ]
    },
  ]);


  export default router