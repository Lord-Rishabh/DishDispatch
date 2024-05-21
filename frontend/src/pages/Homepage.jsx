import React from 'react'
import Navbar from "../components/Header";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>  
        <Navbar/>
        <div className="flex flex-col lg:flex-row items-center justify-between px-6  bg-white h-screen">
        <div className="lg:w-2/3 px-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Life is too short. Wear</span>{' '}
            <span className="block text-blue-600 xl:inline">Style!</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-lg  md:mt-5 md:text-xl lg:mx-0">
            Fashion is part of the daily air and it changes all the time, with all the events. You can even see the approaching of a revolution in clothes. You can see and feel everything in clothes.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link to="/buy-now" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:mt-0 relative">
          <div className="absolute inset-0 rounded-full border-8 border-blue-600"></div>
          <img
            className="relative z-10 rounded-full w-auto h-auto scale-105"
            src='../../public/salad.jpg'
            alt="Fashion"
          />
        </div>
      </div>
        {/* <section className='flex flex-col ml-12 mr-12'>
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
          

        </section>      */}
    </>
  )
}

export default Homepage