import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Header';
import QRCodeGenerator from './qrcode';
import Spinner from '../components/Spinner';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pageLoad, setPageLoad] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image_url: ''
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (category) => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  const categorizedByCategory = (dishes) => {
    const menu = {};
    dishes.forEach((dish) => {
      if (!menu[dish.category])
        menu[dish.category] = [];
      menu[dish.category].push(dish);
    });
    setDishes(menu);
  }

  const toggleForm = (dishDetails = null) => {
    setIsFormOpen(!isFormOpen);
    if (dishDetails) {
      setFormData(dishDetails);
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        image_url: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoad(true);
    try {
      const url = formData._id ? `${import.meta.env.VITE_serverUrl}/api/dish/${user}/dishes/${formData._id}` : `${import.meta.env.VITE_serverUrl}/api/dish/${user}/dishes`;
      const method = formData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      setIsFormOpen(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        image_url: ''
      });
      if (formData._id)
        toast.success('Dish updated successfully!');
      else
        toast.success('Dish added successfully!');

      fetchDishes();
    } catch (error) {
      toast.error(error.message);
    }
    setButtonLoad(false);
  };

  const deleteDish = async (dishId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/dish/${user}/dishes/${dishId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      toast.success('Dish deleted successfully!');  
      fetchDishes();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/auth/userDetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json();

      setUser(json.username);
    } else {
      navigate('/login');
    }
  };

  const fetchDishes = async () => {
    const token = localStorage.getItem('token');
    fetchUser();
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/dish/${user}/dishes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      categorizedByCategory(json);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    setPageLoad(true);
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDishes().finally(() => setPageLoad(false)); // Fetch dishes after user state is updated

    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {pageLoad ? <Spinner /> :
        <div className="p-5">
          <div className="container mx-auto">
            <div className="flex justify-around">
              <button
                className="bg-gray-800 hover:scale-105 ease-in-out rounded-lg text-white text-lg font-semibold py-2 px-4 mb-4 mr-4"
                onClick={() => toggleForm()}
              >
                Add Dish
              </button>
              <QRCodeGenerator />
              <button
                className="bg-gray-800 hover:scale-105 ease-in-out rounded-lg text-white text-lg font-semibold py-2 px-4 mb-4 mr-4 "
                onClick={() => navigate('/orders')}
              >
                View Orders
              </button>
            </div>


            {isFormOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                  <button
                    onClick={toggleForm}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-700 transition duration-200 ease-in-out"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dish Information</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-md text-gray-600 mb-2" htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter the dish name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border rounded-md w-full outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-md text-gray-600 mb-2" htmlFor="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter the description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border rounded-md w-full outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-md text-gray-600 mb-2" htmlFor="category">Category</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter the category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border rounded-md w-full outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-md text-gray-600 mb-2" htmlFor="price">Price</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter the price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border rounded-md w-full outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-md text-gray-600 mb-2" htmlFor="image_url">Image URL</label>
                      <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        placeholder="Enter the image URL"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border rounded-md w-full outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out mr-2">
                        {buttonLoad ? <Loader /> : 'Submit'}
                      </button>
                      <button type="button" onClick={toggleForm} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-200 ease-in-out">Close</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* new menu */}
            <div className="container mx-auto p-4">
              {Object.entries(dishes).map(([category, dishes]) => (
                <div key={category} className="mb-12">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center justify-between w-full py-3 px-5 rounded-lg bg-white border-black border-2 hover:bg-gray-200 focus:outline-none  "
                  >
                    <span className="text-xl font-bold">{category}</span>
                    <span className="text-xl">{expandedCategories[category] ? '-' : '+'}</span>
                  </button>
                  {expandedCategories[category] && (
                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {dishes.map((dish) => (
                        <li key={dish._id} className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300">
                            <div className="flex flex-col sm:flex-row p-4 bg-white">
                                <img src={dish.image_url} alt={dish.name} className="w-full sm:w-32 sm:h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4" />
                                <div className="flex flex-col justify-between flex-grow">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-semibold">{dish.name}</h2>
                                        <p className="text-gray-500 text-sm sm:text-base mt-1">{dish.description}</p>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>Category: {dish.category}</p>
                                        <p>Price: Rs {dish.price}</p>
                                    </div>
                                </div>
                            </div>
                          <div className="flex justify-center py-3 bg-gray-200">
                            <button onClick={() => deleteDish(dish._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mr-2 transition-colors hover:bg-red-600">Delete</button>
                            <button onClick={() => toggleForm(dish)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:bg-blue-600">Update</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {/* new menu ends here */}

          </div>
        </div>}
    </div>

  );
};

export default Dashboard;
