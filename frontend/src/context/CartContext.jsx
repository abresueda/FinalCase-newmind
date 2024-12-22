import React, { createContext, useState } from "react";

// Cart Context'i oluşturuyoruz
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log("Product received in addToCart:", product); // Ürün bilgisi kontrol edin

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
