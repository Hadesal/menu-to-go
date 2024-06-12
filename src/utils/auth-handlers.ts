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

const isSignupDataValidate = (
  userData: UserSignupData,
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>,
  setLastAttemptedEmail: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  const errors: ErrorMessages = {
    name: validateName(userData.name),
    email: validateEmail(userData.email),
    password: validatePassword(userData.password),
    agreed: !userData.agreedTermsAndConditions,
  };

  if (errors.email) {
    setLastAttemptedEmail("");
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
  setLastAttemptedEmail: React.Dispatch<React.SetStateAction<string>>,
  lastAttemptedEmail: string,
  setApiError: React.Dispatch<React.SetStateAction<string>>,
  apiError: string,
  navigate: (path: string) => void
) => {
  if (
    !isSignupDataValidate(userData, setErrorMessages, setLastAttemptedEmail)
  ) {
    return;
  }
  // clear all errors
  setErrorMessages({
    name: "",
    email: apiError.length !== 0 ? apiError : "",
    password: "",
    agreed: false,
  });

  // Check if the email has changed since the last attempt
  if (lastAttemptedEmail === userData.email) {
    return;
  }

  // Update the last attempted email
  setLastAttemptedEmail(userData.email);
  const registerResponse = await register({
    email: userData.email,
    name: userData.name,
    password: userData.password,
  });

  if (registerResponse.status) {
    setApiError(registerResponse.message);
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: registerResponse.message,
    }));
    return;
  }

  setApiError("");

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
