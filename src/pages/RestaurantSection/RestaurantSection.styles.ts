const styles = {
  stack: { width: "95%", margin: "0 auto" },
  typography: { width: "80%" },
  paper: {
    padding: 3,
    borderRadius: "20px",
    boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "20px",
      },
      color: "#BCB8B1",
    },
  },
  addButton: { borderRadius: 10, width: "8vw", height: "5vh" },
  gridPaper: {
    borderRadius: "20px",
    //width: "14vw",
    " & .MuiPaper-root.MuiPaper-elevation1.MuiCard-root.css-1sayfjc-MuiPaper-root-MuiCard-root":
      {
        height: "22vh",
      },
  },
  card: { borderRadius: "20px", padding: 1 },
  cardContent: { height: "100%" },
  stackColumn: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  stackRow: {
    display: "flex",
    justifyContent: "end",
  },
  iconButton: { color: "var(--primary-color)" },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "80%",
  },
  paperListView: {
    borderRadius: "10px",
    marginBottom: "1.5vh",
    height: "6vh",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  listItemBox: {
    color: "primary",
  },
};
export default styles;
