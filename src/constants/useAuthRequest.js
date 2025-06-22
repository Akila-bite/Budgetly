import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://budgetly-backend-jan0.onrender.com/api"; // replace with your actual base URL if different

export const useAuthRequest = () => {
  const navigate = useNavigate();

  const authRequest = async (options) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        ...options,
        url: API_BASE_URL + options.url, // Ensure correct full URL
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please log in to continue");
        navigate("/login");
      } else {
        // Optional: handle other errors
        toast.error(error.response?.data?.message || "Something went wrong");
        throw error;
      }
    }
  };

  return authRequest;
};
