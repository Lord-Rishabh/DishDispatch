import React from 'react'
import '../css/button_black.css'

const Header = () => {
  return (
    <div className='flex justify-between flex-row p-5 px-8'>
        <a href='/'>
            <p className='font-semibold'>Dish Dispatch</p>
        </a>
        <div className='flex justify-center flex-row gap-10'>
            <button className='font-semibold'>
                How it works?
            </button>
            <button className='font-semibold'>
                Contact
            </button>
            
        </div>
        <div className='flex justify-center flex-row gap-10'>
            <button className='font-semibold'>
                Login
            </button>
            <button className='font-semibold text-orange-400'>
                Sign up
            </button>
        </div>
        
    </div>
  )
}

export default Header