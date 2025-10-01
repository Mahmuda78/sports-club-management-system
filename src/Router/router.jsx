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
import PaymentPage from "../Layout/DashBoardLayout/PaymentPage";

import ApprovedBookings from "../Layout/DashBoardLayout/Admin/ApprovedBookings";
import ManageBookings from "../Layout/DashBoardLayout/Admin/ManageBookings";
import ManageMembers from "../Layout/DashBoardLayout/Admin/ManageMember";
import Payment from "../Pages/Payment/Payment";
import Coupons from "../Pages/ManageCoupons/Coupons";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import ManageBookingsAdmin from "../Layout/DashBoardLayout/Admin/ManageBokings Admin";
import ManageAnnouncements from "../Layout/DashBoardLayout/Admin/ManageAnnouncements";
import AnnouncementsList from "../Layout/DashBoardLayout/AnnouncementsList";
import MakeAdmin from "../Pages/MakeAdmin";
import CourtManage from "../Pages/CourtManage";
import AdminRoute from "./AdminRoute";




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
path: "announcements",
element:<AnnouncementsList></AnnouncementsList>
      },
  {
    path:'bookings',
    Component:PendingBookings
  },
  {
    path:'payment',
    Component:PaymentPage
  },
  {
   path:'approvedBookings',
   Component:ApprovedBookings
  },
  {
    path:'manageBookings',
    Component: ManageBookings
  },
  {
    path:'manageMember',
    element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
  },
  {
    path: 'approved',
    Component: ApprovedBookings
  },
  {
  path:'manage',
  element:<ManageBookingsAdmin></ManageBookingsAdmin>
 },
 {
  path: 'manageAnnouncements',
  element: <ManageAnnouncements></ManageAnnouncements>
 },
 {
  path:'makeAdmin',
  element: <MakeAdmin></MakeAdmin>
 },
 {
  path:'courtmanage',
  element:<CourtManage></CourtManage>
 },
 { path: "payment/:bookingId", element: <Payment /> },
  {
    path:'manageCoupons',
    element:<AdminRoute><Coupons></Coupons></AdminRoute>
  },
 
]
 },
  
  {
    path: 'paymentHistory',
    Component: PaymentHistory
  },
 
 
]);