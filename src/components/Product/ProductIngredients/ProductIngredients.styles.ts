export const Styles = {
  IngredientItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: "80px",
  },
  IngredientItemName: {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "1.1rem",
    overflow: "hidden",
    display: "-webkit-box", // Enables multi-line ellipsis
    WebkitLineClamp: 3, // Limits text to 3 lines
    WebkitBoxOrient: "vertical", // Specifies vertical layout for the box
    textOverflow: "ellipsis", // Adds ellipsis at overflow
    wordBreak: "break-word", // Breaks long words to prevent overflow
    overflowWrap: "break-word", // Ensures long text wraps appropriately
  },
  cardContainer: {
    display: "flex",
    alignItems: "flex-start",
    overflowX: "auto",
    gap: "1rem",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      // For WebKit (Chrome, Safari)
      display: "none",
    },
  },

  listContainer: {
    display: "block",
  },
  ingredientList: {
    padding: 0,
    listStyleType: "none",
  },
  ingredientListItem: {
    display: "list-item",
    listStyleType: "disc",
    marginLeft: "20px",
    marginBottom: "0.5rem",
  },
};
