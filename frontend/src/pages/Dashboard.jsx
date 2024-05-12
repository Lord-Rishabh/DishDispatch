import React, {useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from "../components/Header"

const Dasboard = () => {
  let navigate = useNavigate();
  let token = null;
  
  useEffect(() => {
    token = localStorage.getItem('token');
    // to logOut, just make logout function and use localStorage.removeItem('token');
    if(token)
        console.log(token);
    else
        navigate('/login');
}, []);

  return (
  <>
    <Navbar/>
    <div className="flex justify-center items-center h-[80vh] text-3xl">
      Dashboard
    </div>
  </>
  )
}

export default Dasboard