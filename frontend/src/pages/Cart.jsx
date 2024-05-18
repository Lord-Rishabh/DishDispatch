import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Cart = () => {
    const { restaurantName, tableNumber } = useParams();
    const location = useLocation();
    const { cart } = location.state || { cart: {} };
    const [cartDishes, setCartDishes] = useState([]);
    const [formCart, setFormCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState({
        restaurantUsername: restaurantName,
        customerName: '',
        phoneNumber: null,
        tableNumber: tableNumber,
        orderItems : {}
    });

    useEffect(() => {
        const fetchAndUpdateCartDishes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/dish/${restaurantName}/dishes`, {
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
                console.log(formCart);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        fetchAndUpdateCartDishes();
    }, [cart])

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
            )
            return updatedFormCart;
        });
    };

    const handleDecrement = (dishId) => {
        setCartDishes(prevCartDishes => {
            const updatedDishes = prevCartDishes.map(dish =>
                dish._id === dishId && dish.quantity > 1 ? { ...dish, quantity: dish.quantity - 1 } : dish
            ).filter(dish => dish.quantity > 0);
            return updatedDishes;
        });
        setFormCart(prevFormCart => {
            const updatedFormCart = prevFormCart.map(item =>
                item.dishId === dishId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0);
            return updatedFormCart;
        });
    };

    const handleSubmit = async (event) => { 
    }
    return (
        <div className='p-5'>
            {cartDishes.length ? (cartDishes.map((dish) => (
                <div key={dish._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
            ))) : (
                <h1>No items in the cart</h1>

            )}
            <form onSubmit={() => handleSubmit}>
                <div>
                    <label htmlFor="name">Your Name</label>

                </div>
                
                <div>

                </div>
                
                <div>

                </div>
            </form>

        </div>
    );
};

export default Cart;
