import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [pageLoad, setPageLoad] = useState(true); // For initial page load
  const [loadingId, setLoadingId] = useState(null); // For state change loader
  const [showPending, setShowPending] = useState(true); // State to toggle between all orders and pending orders

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
      if (showPending) {
        const pendingOrders = json.filter(order => !order.status);
        setOrders(pendingOrders);
      } else {
        setOrders(json);
      }
      console.log(json);
    } else {
      navigate('/login');
    }
  };

  const handleStatusChange = async (orderId) => {
    setLoadingId(orderId);
    try {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/order/${user}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      toast.success('Order marked as completed!');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
    setLoadingId(null);
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
      fetchOrders().finally(() => setPageLoad(false));
      
      // Set up interval to fetch orders every 7 seconds
      const interval = setInterval(() => {
        fetchOrders();
      }, 7000);

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [user, showPending]);

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
      <ToastContainer />
      {pageLoad ? <Spinner /> : (
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Orders</h2>
          <div className="flex justify-center mb-4 font-semibold ">
            <button
              onClick={() => setShowPending(true)}
              className={`py-2 px-4 mx-2 rounded transition-transform hover:scale-105 duration-200  ${showPending ? 'bg-[#2563eb] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              View Pending Orders
            </button>
            <button
              onClick={() => setShowPending(false)}
              className={`py-2 px-4 mx-2 rounded transition-transform hover:scale-105 duration-200 ${!showPending ? 'bg-[#2563eb] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              View All Orders
            </button>
          </div>
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
                <p className="text-gray-700">Order Time: {formatOrderTime(order.time)}</p>
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
                  <button onClick={() => handleStatusChange(order._id)} className='py-3 px-5 rounded-lg bg-green-300 w-full hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 '> {loadingId == order._id ? <Loader /> : 'Mark as Completed'}</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      )}
    </>
  );
};

const formatOrderTime = (time) => {
  const date = new Date(time);
  const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = date.toLocaleDateString('en-US', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
  return `${formattedTime}, ${formattedDate}`;
};

export default Order;
