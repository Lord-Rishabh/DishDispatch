import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Header';
import QRCodeGenerator from './qrcode';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
    console.log(menu);
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
    try {
      const url = formData._id ? `http://localhost:3000/api/dish/${user}/dishes/${formData._id}` : `http://localhost:3000/api/dish/${user}/dishes`;
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
      console.log(json);
      setIsFormOpen(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        image_url: ''
      });
      fetchDishes();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteDish = async (dishId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/dish/${user}/dishes/${dishId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      fetchDishes();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://localhost:3000/api/auth/userDetails', {
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
      const response = await fetch(`http://localhost:3000/api/dish/${user}/dishes`, {
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
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDishes(); // Fetch dishes after user state is updated
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <div className="container mx-auto">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
              onClick={() => toggleForm()}
            >
              Add Dish
            </button>
            <QRCodeGenerator />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4"
              onClick={() => navigate('/orders')}
            >
              View Orders
            </button>
          </div>


          {isFormOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-lg">
                <div className="mb-4">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-2 border rounded-md w-full outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-2 border rounded-md w-full outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-2 border rounded-md w-full outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-2 border rounded-md w-full outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="image_url">Image URL</label>
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-2 border rounded-md w-full outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mr-2">Submit</button>
                  <button type="button" onClick={() => toggleForm()} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">Close</button>
                </div>
              </form>
            </div>
          )}

          {/* new menu */}
          <div className="container mx-auto p-4">
            {Object.entries(dishes).map(([category, dishes]) => (
              <div key={category} className="mb-12">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full py-3 px-5 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                  <span className="text-xl font-semibold">{category}</span>
                  <span className="text-xl">{expandedCategories[category] ? '-' : '+'}</span>
                </button>
                {expandedCategories[category] && (
                  <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dishes.map((dish) => (
                      <li key={dish._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex p-4 bg-white">
                          <img src={dish.image_url} alt={dish.name} className="w-32 h-32 object-cover rounded-md mr-4" />
                          <div className="flex flex-col justify-between">
                            <div>
                              <h2 className="text-lg font-semibold">{dish.name}</h2>
                              <p className="text-gray-600 mt-1">{dish.description}</p>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>Category: {dish.category}</p>
                              <p>Price: {dish.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center py-3 bg-gray-50">
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
      </div>
    </div>

  );
};

export default Dashboard;
