const Styles = {
  stack: { width: "95%", margin: "0 auto" },
  typography: { width: "80%" },
  paper: { padding: 3, borderRadius: "20px" },
  categoryPaper: { borderRadius: "20px" },
  searchField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "20px",
      },
      color: "#BCB8B1",
    },
  },
  addButton: { borderRadius: 10, width: "8vw", height: "5vh" },
  addButtonCategory: {
    borderRadius: 16,
    background: "var(--primary-color)",
    color: "white",
    "&:hover": {
      color: "var(--primary-color)",
      background: "white",
    },
  },
  previewMenu: {
    borderRadius: "20px",
    padding: "10px 25px 10px 25px",
    backgroundColor: "var(--primary-color)",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "var(--primary-color)",
      boxShadow: "none",
      color: "var(--primary-color)",
    },
  },
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
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
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
    paddingTop: "3rem",
    paddingBottom: "3rem",
    "&:hover": {
      backgroundColor: "#FFF9F4",
    },
  },
  /**Product item styles */
  productListItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productListItemBox: {
    color: "primary",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  productImg: {
    borderRadius: "10px",
  },
  productCheckBox: {
    borderRadius: 0,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  productName: {
    fontWeight: 500,
    fontSize: "18px",
    marginLeft: 1,
    color: "var(--primary-color)",
  },
  productPrice: {
    fontWeight: 500,
    fontSize: "18px",
  },
  productMoreIcon: {
    padding: 0.8,
    "&:hover": {
      background: "transparent",
    },
    marginLeft: 4, // Add any additional styles specific to productMoreIcon
    color: "var(--primary-color)",
  },
  /**Category item styles */
  categoryListItem: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #BCB8B1",
    width: "100%",
    cursor: "pointer",
  },
  categoryListItemBox: {
    color: "primary",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  categoryListItemText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: { fontWeight: 500, fontSize: "18px" },
  categoryItemsLengthText: { marginLeft: 1 },
  dropDownMenuItemIcon: {
    marginRight: 1,
  },
  iconButton: {
    padding: 0.8,
    "&:hover": {
      background: "transparent",
    },
  },
  defaultCategoryColor: "var(--primary-color)",
  selectedCategoryColor: "white",
};
export default Styles;
