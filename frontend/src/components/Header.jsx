import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrRestaurant } from "react-icons/gr";

const Header = () => {
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-white w-full px-10 py-5 md:px-auto">
      <div className="container mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-center md:order-1">
          <GrRestaurant size={27} />
          <p className="text-xl font-bold pl-3 text-black">Dish Dispatch</p>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto w-full order-3 md:order-2`}>
          <div className="flex flex-col md:flex-row font-semibold justify-between w-full md:w-auto md:space-y-0 space-y-2 py-3 md:py-0 bg-white md:bg-transparent max-md:flex-col max-md:items-center max-md:space-y-3 ">
            <Link to="/" className="md:px-4 md:py-2 hover:text-black hover:font-bold relative group" >
              Home
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" ></span>
            </Link>
            <Link to="/dashboard" className="md:px-4 md:py-2 hover:text-black hover:font-bold relative group" >
              Dashboard
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" ></span>
            </Link>
            <Link to="/contact" className="md:px-4 md:py-2 hover:text-black hover:font-bold relative group" >
              Contact
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" ></span>
            </Link>
          </div>

          <div className="md:hidden flex flex-col gap-2 mt-2 items-center">
            {!token ? (
              <>
                <Link to="/login">
                  <button className="text-white font-semibold bg-black rounded-xl text-center py-2 px-12">Login</button>
                </Link>
                <Link to="/register">
                  <button className="text-black rounded-xl text-center border-2 border-black py-2 px-10">Sign up</button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button className="text-black rounded-xl text-center border-2 border-black py-1 px-2" onClick={handleLogout}>Logout</button>
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:flex order-2 md:order-3 mt-4 md:mt-0">
          {!token ? (
            <>
              <Link to="/login">
                <button className="bg-black  hover:scale-105 transtion-transform duration-150 rounded-xl text-white font-bold px-4 xl:px-6 py-2 xl:py-3 mr-3">Login</button>
              </Link>
              <Link to="/register">
                <button className="text-black border-2 border-black hover:scale-105 transtion-transform duration-150 rounded-xl font-bold px-4 xl:px-6 py-2 xl:py-3">Sign up</button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="text-black border-2 border-black hover:scale-105 transtion-transform duration-150 rounded-xl font-bold px-4 xl:px-6 py-2 xl:py-3" onClick={handleLogout}>Logout</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
