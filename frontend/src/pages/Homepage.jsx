import React from 'react'
import Navbar from "../components/Header";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>  
        <Navbar/>
        <section className='flex flex-col ml-12 mr-12'>
          <div className='h-[70vh] flex justify-center items-center flex-col'>
          <p className='font-bold text-7xl'>
          ORDER JUST A <span className='text-orange-400'>&nbsp;SCAN&nbsp;</span>AWAY
          </p>
          <p className='p-5 text-gray-500'>Enabling customer to browse menus and place orders via their device.</p>
          <Link to='/register'>
            <button className='px-4 py-2 bg-orange-400 rounded-xl font-semibold text-white hover:bg-orange-500'>
              Take part
            </button>
          </Link>
          
          </div>
          

        </section>     
    </>
  )
}

export default Homepage