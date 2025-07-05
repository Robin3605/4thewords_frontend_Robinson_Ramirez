import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default axiosInstance;