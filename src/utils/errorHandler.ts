/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";
import axios, { AxiosError } from "axios";

interface ErrorData {
  status?: number;
  timestamp?: Date;
  message?: string;
  details?:
    | string
    | {
        errors: {
          [key: string]: string | string[];
        };
      };
}

export const getErrorMessage = (error: ErrorData | any): string => {
  if (typeof error.details === "string") {
    const parsedError = JSON.parse(error.details);
    if (parsedError.errors) {
      return extractErrorMessages(parsedError.errors);
    } else {
      return parsedError.message;
    }
  } else if (typeof error.details === "object") {
    return extractErrorMessages(error.details.errors);
  }
  if (axios.isAxiosError(error)) {
    return (
      (typeof error.response?.data === "string" && error.response?.data) ||
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred"
    );
  } else if (error instanceof Error) {
    return error.message || "An unknown error occurred";
  }

  return "";
};

// Helper function to extract error messages
const extractErrorMessages = (errors: {
  [key: string]: string | string[];
}): string => {
  return Object.values(errors)
    .flatMap((msg) => (Array.isArray(msg) ? msg : [msg]))
    .join("\n");
};
export const handleAxiosError = (error: unknown): ErrorResponseObject => {
  const errorResponse: ErrorResponseObject = {
    message: "An unexpected error occurred.",
    status: 500,
    timestamp: new Date().toISOString(),
    details: "",
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const message = getErrorMessage(error, "Unknown error occurred");
    const details = JSON.stringify(axiosError.response?.data || {});

    return {
      ...errorResponse,
      status,
      message,
      details,
    };
  } else if (error instanceof Error) {
    return {
      ...errorResponse,
      message: error.message,
    };
  }

  return errorResponse;
};
