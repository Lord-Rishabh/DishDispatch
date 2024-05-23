import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);

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

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/order/${user}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      const pendingOrders = json.filter(order => !order.status);
      setOrders(pendingOrders);
      console.log(json);
    } else {
      navigate('/login');
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/order/${user}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      fetchOrders();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDishes = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/dish/${user}/dishes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
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
      fetchDishes();
      fetchOrders();

      // Set up interval to fetch orders every 7 seconds
      const interval = setInterval(() => {
        fetchOrders();
      }, 7000);

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [user]);

  const getDishNameById = (dishId) => {
    const dish = dishes.find(d => d._id === dishId);
    return dish ? dish.name : 'Unknown Dish';
  };

  const getDishPriceById = (dishId) => {
    const dish = dishes.find(d => d._id === dishId);
    return dish ? dish.price : 0;
  };

  const calculateTotalCost = (orderItems) => {
    return orderItems.reduce((total, item) => {
      const price = getDishPriceById(item.dish);
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Orders</h2>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Customer: {order.customerName}</h3>
              <p className="text-gray-700">Phone Number: {order.phoneNumber}</p>
              <p className="text-gray-700">Restaurant: {order.restaurantUsername}</p>
              <p className="text-gray-700">Table Number: {order.tableNumber}</p>
              <p className="text-gray-700">
                Status: <span className={order.status ? "text-green-500" : "text-red-500"}>{order.status ? 'Completed' : 'Pending'}</span>
              </p>
              <p className="text-gray-700">Order Time: {new Date(order.time).toLocaleString()}</p>
              <h4 className="text-lg font-medium mt-4 mb-2">Order Items:</h4>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    Dish: {getDishNameById(item.dish)}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">Total Cost: Rs {calculateTotalCost(order.orderItems).toFixed(2)}</p>
              <div className="p-6 pb-0">
                <button onClick={() => handleStatusChange(order._id)} className='py-3 px-5 rounded-lg bg-green-200 w-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors'> Mark as Completed</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </>
  );
};

export default Order;
