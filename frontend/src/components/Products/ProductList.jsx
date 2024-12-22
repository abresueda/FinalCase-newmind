import React from "react";
import ProductCard from "./ProductCard"; // ProductCard bileşenini dahil ediyoruz

const ProductList = ({ products }) => {
  return (
    <div className="row">
      {products.length === 0 ? (
        <p>No products found</p> // Ürün yoksa mesaj
      ) : (
        products.map((product) => (
          <div className="col-md-4" >
            <ProductCard product={product}
            key={product._id} 
             /> {/* Her ürünü ProductCard bileşenine geçiriyoruz */}

          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
