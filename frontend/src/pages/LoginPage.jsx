import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Login from "../components/Auth/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        values
      );
    
      const token = response.data.token;

      localStorage.setItem("authToken", token);
      console.log("Token:", token); // Token ve userId'yi logla

      // Token'ı decode ederek userId'yi alalım
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Token içinde id'yi alıyoruz
      localStorage.setItem("userId", userId); //UserId'yi localStorage'a kaydediyoruz.

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Global olarak Authorization başlığına ekle

      // Login başarılıysa, kullanıcı yönlendirilir.
      Swal.fire("Success!", response.data.message, "success");
      navigate("/"); // Anasayfaya yönlendirir.
    } catch (error) {
      if (error.response && error.response.data.message) {
        Swal.fire(
          "Error",
          error.response.data.message,
          "An error occurred",
          "error"
        );
      } else {
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 border-danger shadow-lg">
        <h2 className="text-center my-4">Login</h2>
        <Login onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
