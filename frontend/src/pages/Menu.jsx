import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const { restaurantName, tableNumber } = useParams();
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState({});

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
        setFilteredDishes(menu);
    };

    const fetchDishes = async () => {
        const response = await fetch(`http://localhost:3000/api/dish/${restaurantName}/dishes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        categorizedByCategory(json);
    };

    const filterDishes = (query) => {
        if (!query) {
            setFilteredDishes(dishes);
            return;
        }

        // reduce function will iterate over each category and filter dishes based on query
        // dishes is not an array, it is an object with category as key and dishes as value array that's why we are using Object.entries
        const filtered = Object.entries(dishes).reduce((acc, [category, dishes]) => {
            const filteredDishes = dishes.filter(dish =>
                dish.name.toLowerCase().includes(query.toLowerCase()) ||
                dish.description.toLowerCase().includes(query.toLowerCase()) ||
                dish.category.toLowerCase().includes(query.toLowerCase()) ||
                dish.price.toString().includes(query)
            );
            if (filteredDishes.length)
                acc[category] = filteredDishes;
            return acc;
        }, {})

        setFilteredDishes(filtered);
    };

    const handleAddToCart = (dish) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            newCart[dish._id] = (newCart[dish._id] || 0) + 1;
            return newCart;
        });
        console.log(cart);
    };

    const handleIncrement = (dishId) => {
        setCart(prevCart => ({
            ...prevCart,
            [dishId]: prevCart[dishId] + 1
        }));
        console.log(cart);
    };

    const handleDecrement = (dishId) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[dishId] > 1) {
                newCart[dishId] -= 1;
            } else {
                delete newCart[dishId];
            }
            return newCart;
        });
        console.log(cart);
    };

    const handleCart = () => {
        navigate(`/cart/${restaurantName}/${tableNumber}`, { state: { cart } });
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    useEffect(() => {
        filterDishes(searchQuery);
    }, [searchQuery, dishes]);

    return (
        <div>
            {/* Navbar */}
            <div className="flex justify-center mt-8">
                <div className="bg-gray-300 shadow-md rounded-full px-8 py-3 flex items-center space-x-4 w-3/4 max-w-4xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-100 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                    <button onClick={() => handleCart()} className="bg-indigo-500 text-white text-lg rounded-xl ml-12 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                        Cart
                    </button>
            </div>
            {/* Navbar ends here */}

            {/* Menu */}
            <div className="container mx-auto p-4">
                {Object.entries(filteredDishes).map(([category, dishes]) => (
                    <div key={category} className="mb-6">
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
                                        <div className="p-4 bg-gray-100">
                                            {cart[dish._id] ? (
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleDecrement(dish._id)}
                                                        className="py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-lg">{cart[dish._id]}</span>
                                                    <button
                                                        onClick={() => handleIncrement(dish._id)}
                                                        className="py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(dish)}
                                                    className="py-2 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            {/* Menu ends here */}
        </div>
    );
};

export default Menu