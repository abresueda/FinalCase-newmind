//Ürün Listesi
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Ürünleri depolamak için state
  const [loading, setLoading] = useState(true); // Veri yükleniyor mu kontrolü
  const [error, setError] = useState(null); // Hata mesajı için state

  useEffect(() => {
    // API'den veri çekmek için useEffect kullanıyoruz
    axios
      .get("http://localhost:3000/api/product/") // Backend API'sinin URL'si
      .then((response) => {
        console.log("Response Data:", response.data); // response.data'ya bakın
        const products = response.data?.response;
        if (Array.isArray(products)) {
          setProducts(products); // Gelen veriyi set ediyoruz
        } else {
          throw new Error("Data format error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Eğer bir hata oluşursa, hatayı state'e kaydediyoruz
        setLoading(false);
      });
  }, []); // Bu effect sadece bileşen ilk render edildiğinde çalışacak

  if (loading) {
    return <p>Loading...</p>; // Yükleniyorsa loading mesajı
  }

  if (error) {
    return <p>Error: {error}</p>; // Eğer bir hata varsa, hata mesajı
  }

  return (
    <div className="container mt-5">
      <h2>Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card mb-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
