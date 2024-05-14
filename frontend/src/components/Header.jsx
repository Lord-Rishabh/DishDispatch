import React, { useState, useEffect } from 'react';
import '../css/button_black.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div className='flex justify-between flex-row p-5 px-8 bg-slate-50'>
            <a href='/'>
                <p className='font-semibold'>Dish Dispatch</p>
            </a>
            <div className='flex justify-center flex-row gap-10'>
                <button className='font-semibold'>How it works?</button>
                <button className='font-semibold'>Contact</button>
            </div>
            {!token ? (
                <div className='flex justify-center flex-row gap-10'>
                    <Link to='/login'>
                        <button className='font-semibold'>Login</button>
                    </Link>
                    <Link to='/register'>
                        <button className='font-semibold text-orange-400'>Sign up</button>
                    </Link>
                </div>
            ) : (
                <div className='flex justify-center flex-row gap-10'>
                    <Link to='/login'>
                    <button className='font-semibold' onClick={handleLogout}>
                        Logout
                    </button>
                    </Link>
                </div>

            )}
        </div>
    );
};

export default Header;
