import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { restaurantName, tableNumber } = useParams();
    const location = useLocation();
    const { cart } = location.state || { cart: {} };
    const [cartDishes, setCartDishes] = useState([]);
    const [formCart, setFormCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState({
        restaurantUsername: restaurantName,
        customerName: '',
        phoneNumber: '',
        tableNumber: tableNumber,
        orderItems: []
    });

    useEffect(() => {
        const fetchAndUpdateCartDishes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/dish/${restaurantName}/dishes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const fetchedDishes = await response.json();

                const cartItems = Object.entries(cart).map(([dishId, quantity]) => ({
                    dishId,
                    quantity,
                }));
                setFormCart(cartItems);
                const updatedCartDishes = fetchedDishes
                    .map((dish) => {
                        const cartItem = cartItems.find(item => item.dishId === dish._id);
                        if (cartItem) {
                            return {
                                ...dish,
                                quantity: cartItem.quantity,
                            };
                        }
                        return null;
                    })
                    .filter(dish => dish !== null); // Remove null values

                setCartDishes(updatedCartDishes);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        fetchAndUpdateCartDishes();
    }, [cart, restaurantName]);

    const handleIncrement = (dishId) => {
        setCartDishes(prevCartDishes => {
            const updatedDishes = prevCartDishes.map(dish =>
                dish._id === dishId ? { ...dish, quantity: dish.quantity + 1 } : dish
            );
            return updatedDishes;
        });
        setFormCart(prevFormCart => {
            const updatedFormCart = prevFormCart.map(item =>
                item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item
            );
            return updatedFormCart;
        });
    };

    const handleDecrement = (dishId) => {
        setCartDishes(prevCartDishes => {
            const updatedDishes = prevCartDishes.map(dish =>
                dish._id === dishId ? { ...dish, quantity: dish.quantity - 1 } : dish
            ).filter(dish => dish.quantity > 0); // Filter out dishes with quantity 0
            return updatedDishes;
        });
        setFormCart(prevFormCart => {
            const updatedFormCart = prevFormCart.map(item =>
                item.dishId === dishId ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Filter out items with quantity 0
            return updatedFormCart;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItems = formCart.map(item => ({
            dish: item.dishId,
            quantity: item.quantity
        }));
        const orderPayload = {
            ...orderDetails,
            orderItems
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/order/${restaurantName}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (response.ok) {
                toast.success('Order placed successfully!');
            } else {
                toast.error('Failed to place the order');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error('Error submitting order');
        }
    };

    const calculateTotalCost = () => {
        return cartDishes.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
    };

    return (
        <div className="p-5">
            <ToastContainer />
            {cartDishes.length ? (
                cartDishes.map((dish) => (
                    <div key={dish._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4">
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
                        <div className="p-4 bg-gray-100">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrement(dish._id)}
                                    className="py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                >
                                    -
                                </button>
                                <span className="text-lg">{dish.quantity}</span>
                                <button
                                    onClick={() => handleIncrement(dish._id)}
                                    className="py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-xl font-semibold">No items in the cart</h1>
            )}

            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Cost: Rs {calculateTotalCost().toFixed(2)}</h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Place your order</h2>
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={orderDetails.customerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Contact No.</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={orderDetails.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="py-2 px-6 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cart;
