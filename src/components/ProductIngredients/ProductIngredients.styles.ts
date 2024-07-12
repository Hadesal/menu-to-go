export const Styles = {
  IngredientItemContainer: {
    width: "50px",
  },
  IngredientItemName: {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "14px",
  },
  cardContainer: {
    display: "flex",
    overflowX: "auto",
    gap: "1.5rem",
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
    color: "var(--primary-color)",
    marginLeft: "20px",
    marginBottom: "0.5rem",
  },
};
