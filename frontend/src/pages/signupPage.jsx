import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const json = await response.json();
      if (response.ok) {
        // Success - do something here, like showing a success message
        toast.success('User registered successfully!');
        navigate('/dashboard');
      } else {
        // Handle errors - maybe show an error message
        toast.error(json.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    // Reset form fields after submission
    setFormData({
      username: '',
      name: '',
      email: '',
      password: ''
    });
    setLoading(false);
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
        <div className="px-3 ">
      <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
            <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Create a new account
            </h2>
            <div className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
              Or &nbsp;
              <Link to='/login'>
                <a
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  login to your account
                </a>
              </Link>

            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form method="POST" action="#" onSubmit={handleSubmit}>
                <div >
                  <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">Username</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input id="username" name="username" placeholder="john" type="text" required="" onChange={handleChange} value={formData.username} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="name" name="name" placeholder="John Doe" type="text" required="" value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd">
                        </path>
                      </svg>
                    </div>
                  </div>
                </div>



                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="email" name="email" placeholder="user@example.com" type="email" required="" value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                "/>
                    <div className="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input id="password" name="password" type="password" required="" value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>

                {/* <div className="mt-6">
                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="password_confirmation" name="password_confirmation" type="password" required="" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                </div>
              </div> */}

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                      { loading ? <Loader/> : 'Create account'}
                    </button>
                  </span>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signupPage