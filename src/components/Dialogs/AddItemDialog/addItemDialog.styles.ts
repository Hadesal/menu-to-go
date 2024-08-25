export const Styles = {
  dialog: {
    borderRadius: "24px",
    padding: "10px 50px",
  },
  title: {
    fontSize: "1.4rem",
    paddingLeft: 0,
    color: "#797979",
  },
  subTitle: {
    color: "#797979",
  },
  actionBox: {
    display: "flex",
    padding: 0,
    justifyContent: "end",
  },
  textFieldWrapper: {
    marginTop: "1rem",
  },
  textArea: {
    width: "100%",
    marginTop: "1rem",
    "& .MuiInputBase-root": {
      borderRadius: "1rem",
    },
  },
  textFieldStyle: {
    width: "100%",
    marginTop: "0.5rem",
  },
  textFieldLabelStyle: {
    color: "#797979",
    fontWeight: "400",
  },
  inputPropStyle: {
    borderRadius: "1rem",
  },
  dialogContent: {
    alignContent: "center",
    padding: 0,
    overflowY: "initial",
  },
  fileUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "0",
  },
  imageWrapper: {
    textAlign: "center",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: "#E0E0E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  uploadedImageWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  imageError: { marginTop: "0.5rem" },
  imageLabel: {
    marginTop: "0.5rem",
    color: "#A9A9A9",
  },
  closeIconButton: {
    position: "absolute",
    width: "30px",
    height: "30px",
    top: 110,
    right: 0,
    backgroundColor: "#A4755D",
    borderRadius: "50%",
    ":hover": { backgroundColor: "#A4755D" },
  },
  closeIcon: {
    color: "white",
  },
  logoutButton: {
    borderRadius: "20px",
    padding: "5px 25px 5px 25px",
    backgroundColor: "var(--primary-color)",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
  cancelButton: {
    marginRight: 2,
    borderRadius: "20px",
    padding: "5px 25px 5px 25px",
    borderColor: "var(--primary-color)",
    "&:hover": {
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
};
