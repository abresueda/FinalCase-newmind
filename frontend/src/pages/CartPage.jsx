import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartSummary from "../components/Cart/CartSummary";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity);
  };

  //Kullanıcının alışverişe devam etmesi için yönlendirme.
  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="cart-page">
      <div className="text-center mt-3">
        <button className="btn btn-danger" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>

      <h2 className="m-4 fs-1">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item, index) => (
              <div className="col-md-4" key={item._id + index}>
                <div className="card m-4">
                  <img
                    src={`http://localhost:3000${item.img}`}
                    className="card-img-top"
                    alt={item.description}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.description}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CartSummary />
        </>
      )}
    </div>
  );
};

export default CartPage;
