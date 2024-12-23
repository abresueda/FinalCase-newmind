import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kategori bazlı ürünleri getir
    axios
      .get(`http://localhost:3000/api/product/category/${category}`)
      .then((response) => {
        console.log(response.data.response);
        setProducts(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Products For Your Search</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
