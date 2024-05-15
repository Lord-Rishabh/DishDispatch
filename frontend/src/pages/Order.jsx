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

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`http://localhost:3000/api/order/${user}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      console.log(json);
      setOrders(json);
    } else {
      navigate('/login');
    }
  };

  const fetchDishes = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`http://localhost:3000/api/dish/${user}/dishes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      console.log(json);
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
    }
  }, [user]);

  const getDishNameById = (dishId) => {
    const dish = dishes.find(d => d._id === dishId);
    return dish ? dish.name : 'Unknown Dish';
  };

  return (
    <>
      <div>
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
            <h4 className="text-lg font-medium mt-4 mb-2">Order Items:</h4>
            <ul className="list-disc list-inside">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="text-gray-700">
                  Dish: {getDishNameById(item.dish)}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
      </div>
    </>
  );
};

export default Order;
