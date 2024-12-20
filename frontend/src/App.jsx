import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import './App.css'

function App() {

  return (    
    <Router>
      <Navbar />

      <Routes>
        {/* HomePage tüm alt rotaları kapsayacak şekilde yapılandırıldı */}
        <Route path="/*" element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />

        <Route path="register" element={<RegisterPage />} />

        <Route path="profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </Router>
    )
}

export default App;
