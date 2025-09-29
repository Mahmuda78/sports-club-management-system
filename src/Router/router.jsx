import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import Home from "../Components/Home/Home";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import PrivateRoute from "../Provider/PriveteRoute";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import MyProfile from "../Layout/DashBoardLayout/MyProfile";
import PendingBookings from "../Layout/DashBoardLayout/PendingBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[{
      index:true,
      element:<Home></Home>
    },
   {
    path: 'courts',
    element:<CourtsPage></CourtsPage>
  }]
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:"/register",
    element:<Register></Register>
  },

 {
  path:'/dashboard',
  element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
  children:[ {
        index: true,
        element: <MyProfile />  
      },
      {
        path: "myProfile",
        element: <MyProfile />  
      },
  {
    path:'bookings',
    Component:PendingBookings
  }
]
 }
]);