import "../../App.css";

export const Styles = {
  wrapper_box: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
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
  register_text: {
    marginBottom: 2,
  },
  sign_up_link: {
    color: "var(--primary-color)",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  forget_password_link: {
    display: "block",
    marginBottom: 2,
    textAlign: "right",
    color: "var(--primary-color)",
    textDecoration: "none",
  },
  grid_item_2: {
    display: { xs: "none", sm: "block", md: "block" },
    height: "100%",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
};
