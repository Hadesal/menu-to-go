import { Password } from "@mui/icons-material";
import { UserSignInData, UserSignupData } from "../DataTypes/UserDataTypes";

export const validatePassword = (password: string): string => {
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
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const handleSignup = (
  userData: UserSignupData,
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      rePassword: string;
      agreed: boolean;
      fullName: string;
      phone: string;
    }>
  >
) => {
  if (userData.userFullName.length < 5) {
    setErrorMessages((prev) => ({
      ...prev,
      fullName: "Enter your full name please!",
    }));
  } else {
    setErrorMessages((prev) => ({
      ...prev,
      fullName: "",
    }));
  }
  if (userData.phone.number.length < 6) {
    setErrorMessages((prev) => ({
      ...prev,
      phone: "Make sure you entered your phone number",
    }));
  } else {
    setErrorMessages((prev) => ({ ...prev, phone: "" }));
  }
  if (!isValidEmail(userData.email)) {
    // Validate Email
    setErrorMessages((prev) => ({
      ...prev,
      email: "Invalid email format.",
    }));
    return; // Stop the signup process
  } else {
    setErrorMessages((prev) => ({ ...prev, email: "" }));
  }

  // Validate Password
  const passwordError = validatePassword(userData.password);
  if (passwordError) {
    setErrorMessages((prev) => ({ ...prev, password: passwordError }));
    return; // Stop the signup process
  } else {
    setErrorMessages((prev) => ({ ...prev, password: "" }));
  }
  const rePasswordError = validateRePassword(
    userData.password,
    userData.rePassword
  );
  if (rePasswordError) {
    setErrorMessages((prev) => ({ ...prev, rePassword: rePasswordError }));
    return;
  } else {
    setErrorMessages((prev) => ({
      ...prev,
      rePassword: "",
    }));
  }
  if (!userData.agreedTermsAndConditions) {
    setErrorMessages((prev) => ({
      ...prev,
      agreed: true,
    }));
    return;
  } else {
    setErrorMessages((prev) => ({
      ...prev,
      agreed: false,
    }));
  }
  console.log("Signup successful", userData);
};

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

  // check if email is empty
  if (userData.email.length === 0) {
    errors.email = "Please enter your email";
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
