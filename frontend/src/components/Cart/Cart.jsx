import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h5>{item.name}</h5>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.id, parseInt(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Cart;
