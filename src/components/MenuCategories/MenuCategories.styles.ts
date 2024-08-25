export const Styles = {
  categoriesContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "row",
    gap: "1.4rem",
    overflowX: "auto",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      // For WebKit (Chrome, Safari)
      display: "none",
    },
  },
  categoryBox: {
    width: 56,
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
    lineHeight: "12px",
    textAlign: "center",
    marginTop: "0.8rem",
  },
  selectedCategoryIndicator: {
    background: "#A4755D",
    borderRadius: "8px",
    width: "57px",
    height: "4px",
    marginTop: "0.5rem",
  },
};