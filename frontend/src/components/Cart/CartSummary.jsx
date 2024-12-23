import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Toplam fiyat ve toplam miktarı hesaplama
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Checkout sayfasına yönlendirme fonksiyonu
  const handleProceedToCheckout = () => {
    navigate("/checkout"); // /checkout sayfasına yönlendirme yapıyoruz.
  };

  return (
    <div className="cart-summary card p-4 m-4">
    <h3 className="card-title text-center mb-3">Cart Summary</h3>
    <ul className="list-group list-group-flush">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <strong>Total Items:</strong>
        <span>{totalQuantity}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <strong>Total Price:</strong>
        <span>${totalPrice.toFixed(2)}</span>
      </li>
    </ul>
  </div>
  );
};

export default CartSummary;
