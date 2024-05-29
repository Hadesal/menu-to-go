export const Styles = {
  mainBox: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  grid: {
    height: "100%",
  },
  gridWrapperBox: {
    width: "100%",
    maxWidth: 400,
  },
  gridItem1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
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
    padding: "10px 125px 10px 125px",
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
    color: "red",
  },
  gridItem2: {
    display: { xs: "none", sm: "block", md: "block" },
    height: "100%",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  checkbox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
