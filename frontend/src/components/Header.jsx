import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    <nav className="bg-white w-full px-8 py-3 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-center md:order-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
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
          <div className="flex flex-col md:flex-row font-semibold justify-between w-full md:w-auto max-md:items-center max-md:space-y-2 max-md:py-3 max-md:bg-white">

            <div className="md:px-4 md:py-2 hover:text-black hover:font-bold"><Link to="/">Home</Link></div>
            <div className="md:px-4 md:py-2 hover:text-black hover:font-bold"><Link to="/dashboard">Dashboard</Link></div>
            <div className="md:px-4 md:py-2 hover:text-black hover:font-bold"><Link to="/">Contact</Link></div>
          </div>


          {/* For small screens : */}
          <div className="bg-white  ">
            <div className="md:hidden flex flex-col gap-2 mt-2 items-center ">
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
        </div>

        {/* For Large screens : */}
        <div className="hidden md:flex order-2 md:order-3 mt-4 md:mt-0">
          {!token ? (
            <>
              <Link to="/login">
                <button className="bg-black hover:bg-gray-700 hover:scale-105 ease-in-out rounded-xl text-white font-bold px-4 xl:px-6 py-2 xl:py-3 mr-3">Login</button>
              </Link>
              <Link to="/register">
                <button className="text-black border-2 border-black hover:scale-105 ease-in-out rounded-xl font-bold px-4 xl:px-6 py-2 xl:py-3">Sign up</button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="text-black border-2 border-black hover:scale-105 ease-in-out rounded-xl font-bold px-4 xl:px-6 py-2 xl:py-3" onClick={handleLogout}>Logout</button>
            </Link>
          )}
        </div>
      </div>
    </nav>

  );
};

export default Header;
