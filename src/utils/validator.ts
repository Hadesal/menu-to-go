const validatePassword = (password: string): string => {
  if (password.length === 0) {
    return "Please enter your password.";
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{8,}$/;
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

const validateRePassword = (password: string, rePassword: string): string => {
  if (password !== rePassword) {
    return "Passwords do not match.";
  }
  return "";
};

const validateEmail = (email: string): string => {
  if (email.length === 0) {
    return "Please enter your email.";
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return "";
};

const validateName = (name: string): string => {
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


export { validateEmail, validateName, validatePassword, validateRePassword };
