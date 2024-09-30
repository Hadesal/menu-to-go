import axios from "axios";
import { handleAxiosError } from "@utils/errorHandler";
import { getUserToken } from "@utils/auth-handlers";

const API_BASE_URL = "http://localhost:8080/api/";

const privateApiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically include Authorization header if token exists
privateApiService.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(handleAxiosError(error))
);

// handle responses or specific errors globally
privateApiService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleAxiosError(error))
);

export default privateApiService;
