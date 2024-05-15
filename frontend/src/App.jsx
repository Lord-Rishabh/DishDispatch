import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/loginPage";
import Register from "./pages/signupPage";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";

const App = () => {
  return (
    <>
      <Homepage/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;