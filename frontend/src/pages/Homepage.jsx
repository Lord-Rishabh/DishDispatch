import React from 'react'
import Navbar from "../components/Header";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between px-12 pr-0  bg-white h-[80vh]">
      <div className="lg:w-2/3 px-12">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Transform Your Restaurant</span>{' '}
        <span className="block text-blue-600 xl:inline">Go Digital!</span>
      </h1>
      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-lg md:mt-5 md:text-xl lg:mx-0">
        Embrace the future of dining with our digital solutions. Let your customers experience seamless ordering through digital menu at your restaurant. Simplify your operations and enhance customer satisfaction.
      </p>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">

        <div className="rounded-md shadow">
          <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10">
            Get Started
          </Link>
        </div>
      </div>
    </div>
        <div className="pt-10">
          <img
            height={300}
            width={1000}
            src='/salad.jpg'
            alt="Salad"
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