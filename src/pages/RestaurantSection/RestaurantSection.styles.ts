const styles = {
  stack: { padding: 3 },
  typography: { width: "fit-content" },
  paper: { padding: 3, borderRadius: "20px" },
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
    width: "14vw",
    " & .MuiPaper-root.MuiPaper-elevation1.MuiCard-root.css-1sayfjc-MuiPaper-root-MuiCard-root":
      {
        height: "22vh",
      },
  },
  card: { height: "17vh", borderRadius: "20px" },
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
