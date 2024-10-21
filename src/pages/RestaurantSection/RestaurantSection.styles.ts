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
  addButton: { borderRadius: 5, minWidth: "8vw" , padding:"1rem" },
  gridPaper: {
    borderRadius: "20px",
    //width: "14vw",
    " & .MuiPaper-root.MuiPaper-elevation1.MuiCard-root.css-1sayfjc-MuiPaper-root-MuiCard-root":
      {
        height: "22vh",
      },
  },
  card: { borderRadius: "20px", padding: 1, cursor: "pointer" },
  cardHeader: { padding: "10px 10px 0 0" },
  cardHeaderActionButton: {
    padding: 0.8,
    background: "#A4755D30",
    "&:hover": {
      background: "#A4755D30",
    },
  },
  cardContent: { height: "100%", position: "relative", paddingTop: 0 },
  cardContentBody: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  cardContentBodyImg: {
    display: "block",
    margin: "0 auto",
    opacity: 0.5,
    mixBlendMode: "multiply",
  },
  cardContentBodyText: {
    marginTop: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "90%",
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
  menuItemIcon: {
    marginRight: 1,
  },
};
export default styles;
