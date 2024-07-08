export const isTokenValid = (onLogout: () => void) => {
  const tokenData = localStorage.getItem("userToken");
  if (tokenData) {
    const { loginTime } = JSON.parse(tokenData);
    const currentTime = Date.now();
    // Token validity duration set to 1 minute (60000 milliseconds) for testing
    const tokenValidityDuration = 60000; // 1 minute in milliseconds
    const isTokenStillValid = currentTime - loginTime < tokenValidityDuration;

    if (isTokenStillValid) {
      console.log("Token is valid");
    } else {
      console.log("Token has expired");
      //localStorage.removeItem("userToken");
      onLogout();
    }
  } else {
    console.log("No token found");
  }
};
