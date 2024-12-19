import axios from "axios";

const API_BASE_URL = "http://46.202.140.217:8080/api/";

const publicApiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

publicApiService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default publicApiService;
