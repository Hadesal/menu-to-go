export const Styles = {
  categoriesContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem",
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
    maxWidth: 150,
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    textAlign: "center",
  },
  categoryAvatarStyle: {
    alignSelf: "center",
  },
  categoryAvatar: {
    width: 56,
    height: 56,
  },
  categoryLabel: {
    color: "#D9B18F",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "1rem",
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
    width: "57px",
    height: "4px",
    marginTop: "0.5rem",
  },

  categoryImage: {
    borderRadius: "50%",
  },
};
