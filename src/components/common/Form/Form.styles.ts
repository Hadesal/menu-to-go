export const Styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "628px",
    width: "100%",
    margin: "0 auto",
  },
  title: {
    marginTop: 4,
    fontWeight: "500",
  },
  subTitle: {
    fontWeight: "400",
    lineHeight: "1.8rem",
    marginTop: "0.8rem",
    color: "#797979",
  },
  formWrapper: {
    marginTop: "1rem",
    width: "100%",
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    width: "100%",
  },
  callBtn: {
    position: "fixed",
    bottom: 30,
    right: 50,
  },

  
  selectWrapper: {
    width: "100%",
    marginTop: "1rem",
  },
  select: {
    width: "100%",
    borderRadius: "1rem",
    marginTop: "0.5rem",
  },
  textArea: {
    width: "100%",
    marginTop: "1rem",
    "& .MuiInputBase-root": {
      borderRadius: "1rem",
    },
  },
  InputPropStyle: {
    borderRadius: "1rem",
  },
  textFieldStyle: {
    width: "100%",
  },
  textFieldBoxStyle: {
    flex: 1,
    minWidth: "250px",
  },
  button: {
    marginTop: 3,
    borderRadius: "20px",
    padding: "5px, 0px, 5px, 0px",
    backgroundColor: "var(--primary-color)",
    border: "1px solid transparent",
    alignSelf: "flex-end",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
};
