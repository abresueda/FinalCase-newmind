import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        values
      );

      // Login başarılıysa, kullanıcı yönlendirilir.
      Swal.fire(
        "Success! Please login to continue!",
        response.data.message,
        "success"
      );

      navigate("/login"); // Giriş sayfasına yönlendirir.
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
    <div className="container">
      {/* Profile Settings Butonu */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger mt-5"
          onClick={() => navigate("/profile")}
        >
          <i className="fa-regular fa-gear me-2"></i>
          Profile Settings
        </button>
      </div>

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-5 border-danger shadow-lg">
          <h2 className="text-center my-4">Register</h2>
          <Register onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
