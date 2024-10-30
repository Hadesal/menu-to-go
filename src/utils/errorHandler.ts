import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";
import axios, { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  defaultMessage?: string
): string => {
  if (axios.isAxiosError(error)) {
    return (
      (typeof error.response?.data === "string" && error.response?.data) ||
      error.response?.data?.message ||
      error.message ||
      defaultMessage ||
      "An unknown error occurred"
    );
  } else if (error instanceof Error) {
    return error.message || defaultMessage || "An unknown error occurred";
  }

  return defaultMessage || "An unknown error occurred";
};
// Centralized error handler for Axios

export const handleAxiosError = (error: unknown): ErrorResponseObject => {
  let errorResponse: ErrorResponseObject = {
    message: "An unexpected error occurred.",
    status: 500,
    timestamp: new Date().toISOString(),
    details: "",
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      errorResponse = {
        ...errorResponse,
        status: axiosError.response.status,
        message: axiosError.response.data?.message || "Unknown error occurred",
        details: JSON.stringify(axiosError.response.data) || "",
      };
    } else if (axiosError.request) {
      errorResponse = {
        ...errorResponse,
        message: "No response received from the server.",
        details: JSON.stringify(axiosError.request),
      };
    }
  } else if (error instanceof Error) {
    console.log(error.message);
    errorResponse = {
      ...errorResponse,
      message: error.message,
    };
  } else {
    errorResponse = {
      ...errorResponse,
      message: errorResponse.message,
    };
  }

  return errorResponse;
};
