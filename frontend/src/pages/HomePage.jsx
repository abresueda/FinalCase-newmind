import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import ProductList from "../components/Products/ProductList";

function HomePage() {
  return (
    <>
      <Routes>
        {/* Yönlendirme sadece App.js içindeki Router üzerinden yapılır */}
        <Route path="/" element={<Hero />} />
        <Route path="products" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default HomePage;
