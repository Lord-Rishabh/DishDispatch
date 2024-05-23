import React from 'react'
import {
  createBrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/loginPage";
import Register from "./pages/signupPage";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import QRCodeGenerator from './pages/qrcode';
import Cart from './pages/Cart';

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
    path: `/menu/:restaurantName/:tableNumber`,
    element: <Menu />,
  },
  {
    path: `/cart/:restaurantName/:tableNumber/`,
    element: <Cart />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/qrcode",
    element: <QRCodeGenerator />,
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