import SignUpImage from "../../assets/qr-code-restaurants.jpg";

export const Styles = {
  mainBox: {
    height: "100%",
    minHeight: "100vh", // Ensure the main box takes at least the viewport height
  },
  grid: {
    height: "100%",
  },
  gridItem1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  gridWrapperBox: {
    width: "100%",
    maxWidth: 400,
  },
  signUpHeading: {
    fontWeight: 500,
    color: "var(--primary-color)",
    marginBottom: 1,
  },
  signUpWelcomeText: {
    fontWeight: 400,
    color: "#797979",
    marginBottom: 4,
  },
  inputBox: {
    display: "flex",
    alignItems: "flex-end",
  },
  inputStyle: {
    width: "100%",
  },
  phoneInputStyle: {
    width: "100%",
  },
  phoneBox: {
    marginTop: "16px",
    marginBottom: "8px",
  },
  button: {
    marginTop: 4,
    marginBottom: 2,
    borderRadius: "20px",
    padding: "10px 0px 10px 0px",
    backgroundColor: "var(--primary-color)",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
  signInBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    marginRight: 0.5,
  },
  signInButton: {
    color: "var(--primary-color)",
    textDecoration: "none",
    padding: 0,
    textTransform: "none",
    minWidth: "inherit",

    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "transparent",
    },
  },
  termsConditions: {
    color: "var(--primary-color)",
  },
  termsConditionsError: {
    color: "#d32f2f;",
  },
  gridItem2: {
    display: { xs: "none", sm: "block", md: "block" },
    position: "relative", // Position relative to enable pseudo-element positioning
    backgroundImage: `url(${SignUpImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the color and opacity as needed
      zIndex: 1, // Ensure the mask is on top of the background image
    },
  },
  checkbox_wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "20px",
  },
  checkbox: {
    padding: 0,
    marginRight: 1,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
