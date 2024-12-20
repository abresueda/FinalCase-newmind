import React from "react";
import { useNavigate } from 'react-router-dom';
import Border1 from "../../assets/border1.jpeg";
import Border6 from "../../assets/border6.jpeg";
import Border7 from "../../assets/border7.jpeg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="hero-container text-center">
      {/* Carousel Başlangıcı */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Resimler */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Border1}
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Border6}
              className="d-block w-100"
              alt="Slide 2"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Border7}
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Navigasyon Butonları */}
        <a
          className="carousel-control-prev"
          href="#heroCarousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#heroCarousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
      {/* Carousel Sonu */}

      {/* Metin ve Buton */}
      <h1 className="mt-5">Discover Your ALASKA </h1>
      <p>Bring sparkle to your life with Alaska!</p>
      <button className="btn btn-danger" onClick={() => navigate('/products')}>Shop Now</button>
    </div>
  );
};

export default Hero;
