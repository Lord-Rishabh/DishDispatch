import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Cart = () => {
    const location = useLocation();
    const { cart } = location.state || { cart: {} };

    useEffect(() => {
      console.log(cart);
    }, [cart]);

    return (
        <div>
            <h1>Your Cart</h1>
        </div>
    );
};

export default Cart;
