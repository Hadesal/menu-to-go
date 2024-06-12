import { UserSignInData, UserSignupData } from "../DataTypes/UserDataTypes";
import { login, register } from "../services/api/userCrud";
import { validateEmail, validateName, validatePassword } from "./validator";

type ErrorMessages = {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
};

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

  setErrorMessages(errors);

  if (errors.name || errors.email || errors.password || errors.agreed) {
    console.log("Signup unsuccessful due to validation errors");
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

  try {
    const response = await register({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    console.log(response);
    navigate("/menu");
  } catch (error: any) {
    if (error.response.status === 409) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: error.response.data,
      }));
    }
    console.log(error);
  }
};

//TODO: Remove this dummy data once the api is available
const users = [
  {
    email: "bedo.faruk13@gmail.com",
    password: "123456",
  },
  {
    email: "bedo.faruk@gmail.com",
    password: "123456",
  },
  {
    email: "omar.faruk13@gmail.com",
    password: "123456",
  },
  {
    email: "fares.faruk13@gmail.com",
    password: "123456",
  },
];

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
  console.log(loginResponse);
  return loginResponse;
};

export { handleSignIn, handleSignup };
