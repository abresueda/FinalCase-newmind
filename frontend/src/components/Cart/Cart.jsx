//Sepet Görünümü
/*import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeItem, updateItemQuantity }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} removeItem={removeItem} updateItemQuantity={updateItemQuantity} />
        ))
      )}
      <div className="mt-3">
        <h4>Total: ${total}</h4>
      </div>
    </div>
  );
};

export default Cart;*/
