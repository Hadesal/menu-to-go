import "../../App.css";
import SignUpImage from "../../assets/signup.jpg";

export const Styles = {
  mainBox: {
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  grid_item_1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  grid1WrapperBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
  },
  sign_in_heading: {
    fontWeight: 500,
    color: "var(--primary-color)",
    marginBottom: 1,
  },
  sign_in_welcome_text: {
    fontWeight: 400,
    color: "#797979",
    marginBottom: 4,
  },
  input_box: {
    display: "flex",
    alignItems: "flex-end",
  },
  inputStyle: {
    width: "100%",
    marginTop: "0.5rem",
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
  signUpBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    marginRight: 0.5,
  },
  signUpButton: {
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
  forget_password_link: {
    display: "block",
    marginBottom: 2,
    alignSelf: "end",
    color: "var(--primary-color)",
  },
  grid_item_2: {
    display: { xs: "none", sm: "block", md: "block" },
    backgroundImage: `url(${SignUpImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};
