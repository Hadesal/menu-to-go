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
    fontWeight: "500",
  },
  subTitle: {
    fontWeight: "400",
    //lineHeight: "0.875rem",
    //marginTop: "0.8rem",
    color: "#BCB8B1",
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
};
