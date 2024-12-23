import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios importu eklenmeli
import { Card, Button, Row, Col } from "react-bootstrap";
import Hero from "../components/Hero/Hero";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 4; // Sayfa başına 4 ürün
  const maxProducts = 16; // Toplamda 16 ürün alınacak

  // API'den ürünleri çekme
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/")
      .then((response) => {
        const products = response.data?.response;
        if (Array.isArray(products)) {
          setProducts(products.slice(0, maxProducts)); // İlk 16 ürünü alıyoruz
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

  // Sayfada gösterilecek ürünleri filtrele
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination (otomatik)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage =
          prevPage === Math.ceil(products.length / productsPerPage)
            ? 1
            : prevPage + 1;
        return nextPage;
      });
    }, 3000); // 3 saniyede bir sayfa geçişi yapılacak

    return () => clearInterval(interval); // Cleanup
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Hero component */}
      <Hero />

      {/* Çok Satanlar Başlık */}
      <h2 className="text-center my-4 mt-5">Çok Satanlar</h2>

      {/* Ürün Kartları */}
      <Row className="justify-content-center m-5">
        {currentProducts.map((product) => (
          <Col md={3} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:3000${product.img}`}
              />
              <Card.Body>
                <Card.Title>{product.description}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
