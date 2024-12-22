import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column sticky-top">
      {/* Üst Bar */}
      <div className="container d-flex justify-content-between align-items-center">
        {/* Sol Taraf: Search Input */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        {/* Orta Taraf: Marka Adı */}
        <h1
          className="text-center m-3 fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          A L A S K A
        </h1>

        {/* Sağ Taraf: Login İşlemleri */}
        <div className="d-flex">
          <button
            className="btn btn-outline-danger me-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-outline-danger me-2"
            onClick={() => navigate("/register")}
          >
            <i className="fas fa-user"></i>
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/cart")}
          >
            <i className="fa-regular fa-basket-shopping "></i>

            <span className="ms-2">({cartItems.length})</span>
          </button>
        </div>
      </div>

      {/* Navigasyon Menüsü */}
      <div className="container">
        {/* Navbar Toggler (Hamburger Menu) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links (Collapse Wrapper) */}
        <div className="collapse navbar-collapse my-auto" id="navbarNav">
          <ul className="navbar-nav mx-auto w-100 d-flex justify-content-between">
            <li className="nav-item">
              <Link className="nav-link" to="products/diamond">
                Pırlanta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products/gold">
                Altın
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products/glass">
                Elmas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products/ring">
                Alyans
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products/man">
                Erkek
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products/children">
                Çocuk
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
