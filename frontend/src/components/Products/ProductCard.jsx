//Her ürün için kart
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
      addToCart(product); // Ürün sepete ekleniyor
    };

  return (
    <div className="card m-4" key={product._id}>
      <img
        src={`http://localhost:3000${product.img}`}
        className="card-img-top"
        alt={`Image of ${product.name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
