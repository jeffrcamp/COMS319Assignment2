import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cartItems as an empty object
  const [cartItems, setCartItems] = useState({});

  // Function to add an item to the cart
  const addToCart = (productId) => {
    setCartItems(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1  // Increment quantity if item already exists
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    if (cartItems.hasOwnProperty(productId)) {
      const updatedCart = { ...cartItems };
      delete updatedCart[productId];  // Remove item from cart
      setCartItems(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

