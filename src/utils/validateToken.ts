interface TokenData {
  loginTime: number;
}

export const isTokenValid = (
  onLogout: () => void,
  tokenValidityDuration: number = 60000 // Default to 1 minute for testing
): boolean => {
  try {
    const tokenData = localStorage.getItem("userToken");

    if (tokenData) {
      const { loginTime }: TokenData = JSON.parse(tokenData);
      const currentTime = Date.now();
      const isTokenStillValid = currentTime - loginTime < tokenValidityDuration;

      if (isTokenStillValid) {
        console.log("Token is valid");
        return true;
      } else {
        console.log("Token has expired");
        onLogout();
        return false;
      }
    } else {
      console.log("No token found");
      return false;
    }
  } catch (error) {
    console.error("Failed to validate token:", error);
    onLogout(); // If something goes wrong, force logout
    return false;
  }
};
