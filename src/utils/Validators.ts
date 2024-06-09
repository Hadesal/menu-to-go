import { UserSignInData, UserSignupData } from "../DataTypes/UserDataTypes";

export const validatePassword = (password: string): string => {
  if (password.length === 0) {
    return "Please enter your password.";
  }
  // Example criteria: at least 8 characters, contains a number, a special character ".", and must match rePassword
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{8,}$/; // Updated to include lowercase letters and numbers explicitly, with allowance for "."

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long, contain at least one number, and one lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!password.includes(".")) {
    return "Password must have at least one special character ('.').";
  }
  return "";
};
export const validateRePassword = (
  password: string,
  rePassword: string
): string => {
  if (password !== rePassword) {
    return "Passwords do not match.";
  }
  return "";
};
export const validateEmail = (email: string): string => {
  if (email.length === 0) {
    return "Please enter your email.";
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return "";
};

export const validateName = (name: string): string => {
  if (name.trim().length === 0) {
    return "Please enter your name.";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (name.length > 50) {
    return "Name must be less than 50 characters long.";
  }
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes.";
  }
  return "";
};
export const handleSignup = (
  userData: UserSignupData,
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      rePassword?: string;
      agreed: boolean;
      fullName?: string;
      phone?: string;
    }>
  >
) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    agreed: false,
  };

  const nameError = validateName(userData.name);
  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateEmail(userData.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(userData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (!userData.agreedTermsAndConditions) {
    errors.agreed = true;
  }

  if (errors.name || errors.email || errors.password || errors.agreed) {
    setErrorMessages(errors);
    console.log("unsuccessful");
    return;
  }
  setErrorMessages({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  console.log("Signup successful", userData);
};

//TODO:Remove this dummy data once the api is available
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

export const handleSignIn = (
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

  // check if password is empty
  if (userData.password.length === 0) {
    errors.password = "Please enter your password";
  }

  if (errors.email || errors.password) {
    setErrorMessages(errors);
    return;
  }

  const user = users.find((user) => {
    return user.email === userData.email;
  });

  if (!user) {
    console.log("user doesnt exist");
    //errors.email = "Email is in correct"
    setErrorMessages({
      password: "",
      email: "Email is in correct",
    });
    return;
  }

  if (user.password !== userData.password) {
    setErrorMessages({
      email: "",
      password: "Password is incorrect",
    });

    return;
  }

  setErrorMessages({
    email: "",
    password: "",
  });
  console.log(user);
};
