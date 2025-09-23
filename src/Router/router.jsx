import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddCourt from "../Components/AddCourt";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>
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
    path:'/addCourt',
    Component:AddCourt
  }
]);