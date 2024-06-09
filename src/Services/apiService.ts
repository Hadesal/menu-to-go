import axios from "axios";
import { UserSignupApiData } from "../DataTypes/UserDataTypes";

const API_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api";

// create an instance of axios
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData: UserSignupApiData) => {
  const response = await apiService.post("/register", userData);
  return response.data;
};
