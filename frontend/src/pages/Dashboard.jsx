import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image_url: ''
  });

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
      fetchData();
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
      fetchData();
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

  const fetchData = async () => {
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

      setDishes(json);
    } else {
      navigate('/login');
    }
  };

  
  useEffect(() => {
    fetchUser();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchData(); // Fetch dishes after user state is updated
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <div className="container mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => toggleForm()}
          >
            Add Dish
          </button>
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
          <div className="grid grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <div key={dish._id} className="text-xl p-5 px-12 border border-gray-300 rounded">
                <h1>{dish.name}</h1>
                <p>{dish.description}</p>
                <p>{dish.category}</p>
                <p>{dish.price}</p>
                <img src={dish.image_url} alt={dish.name} />
                <div>
                  <button
                    className="bg-blue-500 mr-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteDish(dish._id)}
                  >
                    Delete Dish
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => toggleForm(dish)}
                  >
                    Update Dish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
