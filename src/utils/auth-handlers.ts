import {
  UserSignInDataType,
  UserSignupDataType,
} from "@dataTypes/UserDataTypes";
import { login, register } from "@api/userCrud";
import { validateEmail, validateName, validatePassword } from "./validator";
import { AxiosError } from "axios";
import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";

// Error message type definition
type ErrorMessages = {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
};

// Helper function to validate signup data
const isSignupDataValid = async (
  userData: UserSignupDataType,
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>,
  setLastAttemptedEmail: React.Dispatch<React.SetStateAction<string>>
): Promise<boolean> => {
  const errors: ErrorMessages = {
    name: validateName(userData.name),
    email: validateEmail(userData.email),
    password: await validatePassword(userData.password),
    agreed: !userData.agreedTermsAndConditions,
  };

  // Reset the email if there's an email validation error
  if (errors.email) {
    setLastAttemptedEmail("");
  }

  // Set errors and return validation result
  if (errors.name || errors.email || errors.password || errors.agreed) {
    setErrorMessages(errors);
    return false;
  }

  return true;
};

// Handles user signup process
const handleSignup = async (
  userData: UserSignupDataType,
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>,
  setLastAttemptedEmail: React.Dispatch<React.SetStateAction<string>>,
  lastAttemptedEmail: string,
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  apiError: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
): Promise<void> => {
  // Validate input data
  if (!isSignupDataValid(userData, setErrorMessages, setLastAttemptedEmail)) {
    return;
  }

  // Clear any previous errors
  setErrorMessages({
    name: "",
    email: apiError.length !== 0 ? apiError : "",
    password: "",
    agreed: false,
  });

  // Check if the email has been used in a previous attempt
  if (lastAttemptedEmail === userData.email) {
    return;
  }

  setLoading(true);
  setLastAttemptedEmail(userData.email);

  try {
    const registerResponse = await register({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      agreedTermsAndConditions: false,
    });

    if (registerResponse.status) {
      setLoading(false);
      setApiError(registerResponse.message);
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: registerResponse.message,
      }));
      return;
    }

    // Clear error messages and navigate to login on successful signup
    setApiError("");
    setErrorMessages({ name: "", email: "", password: "", agreed: false });
    setLoading(false);
    navigate("/login");
  } catch (error) {
    const isErrorResponseObject = (
      error: unknown
    ): error is ErrorResponseObject => {
      return (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        "details" in error &&
        "status" in error &&
        "timestamp" in error
      );
    };

    if (isErrorResponseObject(error)) {
      setErrorMessages((prev) => ({ ...prev, email: error.message }));
      setApiError(error.message);
    } else if (error instanceof Error) {
      // Handles standard Error objects
      setApiError(error.message);
    } else {
      // Handles unknown error types
      setApiError("An unknown error occurred.");
    }

    setLoading(false);
    setApiError("An error occurred during registration. Please try again.");
  }
};

// Handles user sign-in process
const handleSignIn = async (
  userData: UserSignInDataType,
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
): Promise<void> => {
  const errors = {
    email: "",
    password: "",
  };

  // Validate email and password
  const emailError = validateEmail(userData.email);
  if (emailError) errors.email = emailError;
  if (userData.password.length === 0)
    errors.password = "Please enter your password";

  if (errors.email || errors.password) {
    setErrorMessages(errors);
    return;
  }

  setLoading(true);

  try {
    const loginResponse = await login(userData);

    if (loginResponse.status) {
      setLoading(false);
      errors.email = loginResponse.message;
      errors.password = loginResponse.message;
      setErrorMessages(errors);
      return;
    }

    // Clear error messages, store token, and navigate to the dashboard
    setErrorMessages({ email: "", password: "" });
    setLoading(false);

    const authData = {
      token: loginResponse.token,
      loginTime: Date.now(),
    };
    localStorage.setItem("userToken", JSON.stringify(authData));
    navigate("/dashboard");
  } catch (error) {
    setLoading(false);
    setErrorMessages({
      email: "Login failed. Please check your credentials.",
      password: "",
    });
  }
};

// Retrieves the user token from localStorage
const getUserToken = (): string => {
  const userTokenString = localStorage.getItem("userToken");

  if (!userTokenString) {
    throw new Error("User token not found");
  }

  const userToken = JSON.parse(userTokenString);

  if (!userToken.token) {
    throw new Error("Token is missing in userToken object");
  }

  return userToken.token;
};

export { handleSignIn, handleSignup, getUserToken };
