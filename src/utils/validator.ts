// Options for password validation that allow customization of rules
interface PasswordValidationOptions {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireSpecialCharacter?: boolean;
  disallowCommonPasswords?: boolean;
}

// Predefined list of common passwords (for testing purposes)
const commonPasswords = ["123456", "password", "qwerty", "111111"];

// Convert ArrayBuffer to hex string (used for hashing result)
const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Function to hash the password using Web Crypto API (SHA-1)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  return bufferToHex(hashBuffer); // Convert ArrayBuffer to hex string
};

// Function to check if a password has been compromised using HIBP API
const isPasswordCompromised = async (password: string): Promise<boolean> => {
  const hashedPassword = await hashPassword(password);
  const hashPrefix = hashedPassword.slice(0, 5);
  const hashSuffix = hashedPassword.slice(5).toUpperCase();

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${hashPrefix}`
  );
  const data = await response.text();

  // Check if the password's hash suffix matches any of the compromised hashes
  const compromisedHashes = data.split("\n");
  return compromisedHashes.some((line) => line.startsWith(hashSuffix));
};

// Validates if the password meets all the required conditions and checks against HIBP
const validatePassword = async (
  password: string,
  options: PasswordValidationOptions = {}
): Promise<string> => {
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireSpecialCharacter = true,
    disallowCommonPasswords = true,
  } = options;

  if (!password) {
    return "Please enter your password.";
  }

  // Password length checks
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  if (password.length > maxLength) {
    return `Password must be no longer than ${maxLength} characters.`;
  }

  // Check for common passwords (if enabled)
  if (disallowCommonPasswords && commonPasswords.includes(password)) {
    return "Password is too common. Please choose a more secure password.";
  }

  // Check for lowercase letter and digit
  const basicPasswordRegex = /^(?=.*[a-z])(?=.*\d)/;
  if (!basicPasswordRegex.test(password)) {
    return "Password must contain at least one number and one lowercase letter.";
  }

  // Check for an uppercase letter (if required)
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check for a special character (if required)
  if (requireSpecialCharacter && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Check if the password is compromised via HIBP API
  const isCompromised = await isPasswordCompromised(password);
  if (isCompromised) {
    return "This password has been compromised in a data breach. Please choose a different password.";
  }

  return "";
};

// Validates if the repeated password matches the original one
const validateRePassword = (password: string, rePassword: string): string => {
  if (password !== rePassword) {
    return "Passwords do not match.";
  }
  return "";
};

// Validates email format
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

// Validates the name according to specified rules
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
