import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://budgetly-backend-jan0.onrender.com/api",
});

// Request interceptor: runs before each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
