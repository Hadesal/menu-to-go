import axios from "axios";
import { handleAxiosError } from "@utils/errorHandler";

const API_BASE_URL = "http://localhost:8080/api/";

const publicApiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

publicApiService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleAxiosError(error))
);

export default publicApiService;
