import React, { useEffect } from 'react'
import Navbar from "../components/Header";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import food from '../lotties/food.json';


const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between px-12   bg-white h-[80vh]">
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
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[470px] lg:h-[470px]">
          <Lottie options={{ animationData: food, loop: true, autoplay: true }}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </>
  )
}


export default Homepage