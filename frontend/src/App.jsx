import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import "./App.css";

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />

      <Routes>
        {/* HomePage tüm alt rotaları kapsayacak şekilde yapılandırıldı */}
        <Route path="/" element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />

        <Route path="register" element={<RegisterPage />} />

        <Route path="profile" element={<ProfilePage />} />

        <Route path="products/*" element={<ProductPage />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="checkout/:id" element={<CheckoutPage />} />
      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
