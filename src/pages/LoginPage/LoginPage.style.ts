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
    textAlign: "center",
    color: "var(--primary-color)",
  },
  sign_in_welcome_text: {
    textAlign: "center",
    color: "#797979",
  },
  input_box: {
    display: "flex",
    alignItems: "flex-end",
  },
  inputStyle: {
    width: "100%",
  },
  button: {
    marginBottom: 2,
    borderRadius: "20px",
    padding: "10px 125px 10px 125px",
    backgroundColor: "var(--primary-color)",
    Opacity: 0,

    "&:hover": {
      backgroundColor: "var(--primary-color)", // Change color on hover
      opacity: 0.9,
    },
  },
  register_text: {
    marginBottom: 2,
  },
  sign_up_link: {
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
