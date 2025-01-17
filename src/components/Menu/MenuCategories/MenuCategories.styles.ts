export const Styles = {
  categoriesContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    overflowX: "auto",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      // For WebKit (Chrome, Safari)
      display: "none",
    },
  },
  categoryBox: {
    display: "flex",
    minWidth: 100,
    maxWidth: "120px",
    // border:"1px solid black",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    textAlign: "center",
  },
  categoryAvatarStyle: {
    alignSelf: "center",
  },
  categoryLabel: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "1.2rem",
    textAlign: "center",
    marginTop: "0.8rem",
    overflowWrap: "break-word", // Ensure long words break to fit
    wordBreak: "break-word", // Ensure long words break to fit
    width: "100%", // Ensure text fits within the box
    boxSizing: "border-box", // Include padding in the width
  },
  selectedCategoryIndicator: {
    background: "#A4755D",
    borderRadius: "8px",
    width: 70,
    height: "4px",
    marginTop: "0.5rem",
  },

  categoryImage: {
    borderRadius: "50%",
  },
};
