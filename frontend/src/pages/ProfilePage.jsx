import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../components/Auth/Profile.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    id: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token not found",
          text: "Authentication token is missing. Please log in again.",
        });
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Token'dan kullanıcı ID'si alınıyor

        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInitialValues({
          username: response.data.username,
          email: response.data.email,
          id: userId,
        });
      } catch (error) {
        // Hata durumunu kontrol et
        if (error.response) {
          // API'den gelen hata yanıtı varsa
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong",
          });
        } else if (error.request) {
          // API isteği yapılmış ancak yanıt alınamamışsa
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No response from the server",
          });
        } else {
          // Diğer hata durumları
          console.error("Error message:", error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Unknown error",
          });
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User ID is missing",
        text: "Unable to proceed with account deletion, please log in again.",
      });
      navigate("/login");
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Token not found",
        text: "Authentication token is missing. Please log in again.",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/user",
        {
          email: values.email,
          password: values.password,
          id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Profile updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while updating profile.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User ID is missing",
        text: "Unable to proceed with account deletion, please log in again.",
      });
      navigate("/login");
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Token not found",
        text: "Authentication token is missing. Please log in again.",
      });
      navigate("/login");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Your account will be deleted. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { id: userId },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text:
            response.data.message ||
            "Your account has been deleted successfully.",
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text:
            error.response?.data?.message ||
            "An error occurred while deleting your account.",
        });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile Settings</h2>
      <Profile
        initialValues={initialValues}
        handleProfileUpdate={handleProfileUpdate}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default ProfilePage;
