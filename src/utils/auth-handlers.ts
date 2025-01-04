import { login, register } from "@api/userCrud";
import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";
import {
  UserSignInDataType,
  UserSignupDataType,
} from "@dataTypes/UserDataTypes";
import { TFunction } from "i18next";
import { validateEmail, validateName, validatePassword } from "./validator";

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
  getString: TFunction<"translation", undefined>
): Promise<boolean> => {
  const errors: ErrorMessages = {
    name: validateName(userData.name, getString),
    email: validateEmail(userData.email, getString),
    password: await validatePassword(userData.password, getString),
    agreed: !userData.agreedTermsAndConditions,
  };

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
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  apiError: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void,
  getString: TFunction<"translation", undefined>
): Promise<void> => {
  // Validate input data
  const isValid = await isSignupDataValid(
    userData,
    setErrorMessages,
    getString
  );
  if (!isValid) {
    return;
  }

  // Clear any previous errors
  setErrorMessages({
    name: "",
    email: apiError.length !== 0 ? apiError : "",
    password: "",
    agreed: false,
  });

  setLoading(true);

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
      if (error.status === 500) {
        setErrorMessages((prev) => ({
          ...prev,
          email: getString("registrationError"),
        }));
        setApiError(getString("registrationError"));
      } else {
        setErrorMessages((prev) => ({ ...prev, email: error.message }));
        setApiError(error.message);
      }
    } else if (error instanceof Error) {
      setApiError(error.message);
    } else {
      setApiError(getString("unknownError"));
    }
    setLoading(false);
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
  navigate: (path: string) => void,
  getString: TFunction<"translation", undefined>
): Promise<void> => {
  const errors = {
    email: "",
    password: "",
  };

  // Validate email and password
  const emailError = validateEmail(userData.email, getString);
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
      email: getString("signInError"),
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

export { getUserToken, handleSignIn, handleSignup };
