import { UserSignInData, UserSignupData } from "../DataTypes/UserDataTypes";
import { login, register } from "../services/api/userCrud";
import { validateEmail, validateName, validatePassword } from "./validator";

type ErrorMessages = {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
};

// Store the last attempted email
let lastAttemptedEmail = "";
let ApiError = "";

const isSignupDataValidate = (
  userData: UserSignupData,
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>
): boolean => {
  const errors: ErrorMessages = {
    name: validateName(userData.name),
    email: validateEmail(userData.email),
    password: validatePassword(userData.password),
    agreed: !userData.agreedTermsAndConditions,
  };

  if (errors.email) {
    lastAttemptedEmail = "";
  }

  if (errors.name || errors.email || errors.password || errors.agreed) {
    setErrorMessages(errors);
    return false;
  }

  return true;
};

const handleSignup = async (
  userData: UserSignupData,
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>,
  navigate: (path: string) => void
) => {
  if (!isSignupDataValidate(userData, setErrorMessages)) {
    return;
  }
  setErrorMessages({
    name: "",
    email: ApiError.length !== 0 ? ApiError : "",
    password: "",
    agreed: false,
  });
  // Check if the email has changed since the last attempt
  if (lastAttemptedEmail === userData.email) {
    return;
  }

  // Update the last attempted email
  lastAttemptedEmail = userData.email;
  const registerResponse = await register({
    email: userData.email,
    name: userData.name,
    password: userData.password,
  });

  if (registerResponse.status) {
    ApiError = registerResponse.message;
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: registerResponse.message,
    }));
    return;
  }

  ApiError = "";

  // Clear all error messages on successful registration
  setErrorMessages({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  navigate("/menu");
};

const handleSignIn = async (
  userData: UserSignInData,
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >
) => {
  const errors = {
    email: "",
    password: "",
  };

  const emailError = validateEmail(userData.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (userData.password.length === 0) {
    errors.password = "Please enter your password";
  }

  if (errors.email || errors.password) {
    setErrorMessages(errors);
    return;
  }

  const loginResponse = await login(userData);

  if (loginResponse.status) {
    errors.email = loginResponse.message;
    errors.password = loginResponse.message;
    setErrorMessages(errors);
    return;
  }

  setErrorMessages({
    email: "",
    password: "",
  });
  return loginResponse;
};

export { handleSignIn, handleSignup };
