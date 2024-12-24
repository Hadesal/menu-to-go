export const Styles = {
  dialog: {
    width: "580px",
    height: "500px",
    borderRadius: "32px",
    padding: "10px 20px",
  },
  title: {
    fontWeight: 500,
    marginTop: 3,
  },
  subTitle: {
    color: "#797979",
    marginTop: 2,
    lineHeight: 2,
    paddingRight: 2,
    paddingLeft: 2,
    whiteSpace: "normal",
  },
  actionBox: {
    display: "flex",
    marginTop: 6,
  },
  primaryActionButton: {
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
  secondaryActionButton: {
    marginRight: 2,
    borderRadius: "20px",
    padding: "5px 25px 5px 25px",
    border: "1px solid var(--primary-color) !important",
    borderColor: "var(--primary-color)",
    //backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
};
