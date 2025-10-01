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
import AdminProfile from "../Components/AdminProfile";
import AllUsers from "../Components/AllUsers";
import ManageBookingConfirm from "../Components/ManageBookingConfirm";
import MemberRoute from "./MemberRoute";
import MemberProfile from "../Components/MemberProfile";
import ConfirmedBookings from "../Components/ConfirmedBookings";
import Forbidden from "../Components/Forbidden";




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
  path:'forbidden',
  Component:Forbidden
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
    element:<MemberRoute><ApprovedBookings></ApprovedBookings></MemberRoute>
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
  {
    path:'adminProfile',
    element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
  },
  {
    path:'allUsers',
    element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
  },
  {
    path:'bookingCorfirm',
    element:<AdminRoute><ManageBookingConfirm></ManageBookingConfirm></AdminRoute>
  },
{
    path: 'paymentHistory',
    element:<MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>
  },
  {
    path:'memberProfile',
    element:<MemberRoute><MemberProfile></MemberProfile></MemberRoute>
  },
  {
    path:'confirmedBookings',
    element:<MemberRoute><ConfirmedBookings></ConfirmedBookings></MemberRoute>
  }
 
]
 },
  
  
 
 
]);