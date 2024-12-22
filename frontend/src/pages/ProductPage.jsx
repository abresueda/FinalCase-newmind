import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import ProductList from "../components/Products/ProductList";
import CategoryPage from "./CategoryPage";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Ürünleri saklamak için state
  const [loading, setLoading] = useState(true); // Yükleniyor kontrolü
  const [error, setError] = useState(null); // Hata mesajı için state
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi
  const [selectedCategory, setSelectedCategory] = useState(""); // Kategori seçimi
  const [selectedProductId, setSelectedProductId] = useState(null); // Seçilen ürün ID'si


  // API'den ürünleri çekme
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/")
      .then((response) => {
        console.log("Response Data:", response.data);
        const products = response.data?.response;
        if (Array.isArray(products)) {
          setProducts(products); // Ürünleri state'e kaydediyoruz
        } else {
          throw new Error("Data format error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Hata varsa state'e kaydediyoruz
        setLoading(false);
      });
  }, []);

 // Filtreleme işlemi
 const filteredProducts = products.filter((product) => {
  const matchesSearchTerm =
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory =
    selectedCategory ? product.category === selectedCategory : true;
  return matchesSearchTerm && matchesCategory;
});

const handleProductClick = (id) => {
  setSelectedProductId(id); // Ürüne tıklanınca ID'yi state'e kaydet
};

  if (loading) {
    return <p>Loading...</p>; // Yükleniyor mesajı
  }

  if (error) {
    return <p>Error: {error}</p>; // Hata mesajı
  }

  return (
    <div className="container mt-5">
      <h2>Our Products</h2>

      {/* Filtreleme ve Arama */}
      <div className="filters mb-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select mb-3"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Select Category</option>
          <option value="diamond">Pırlanta</option>
          <option value="gold">Altın</option>
          <option value="glass">Elmas</option>
          <option value="ring">Alyans</option>
          <option value="man">Erkek</option>
          <option value="children">Çocuk</option>
        </select>
      </div>

      <Routes>
        {/* Ürün Listesi */}
        <Route
          path="/"
          element={<ProductList products={filteredProducts} />}
        />
        
        {/* Kategori Sayfası */}
        <Route path=":category" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default ProductPage;
