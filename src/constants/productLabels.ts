const allergensOptionsMap = {
  gluten: "🍞 Gluten (A)",
  crustaceans: "🦐 Crustaceans (B)",
  eggs: "🥚 Eggs (C)",
  fish: "🐟 Fish (D)",
  peanuts: "🥜 Peanuts (E)",
  soy: "🌱 Soybeans (F)",
  milk: "🥛 Milk (G)",
  nuts: "🌰 Nuts (H)",
  celery: "🍲 Celery (L)",
  mustard: "Mustard (M)",
  sesame: "🍯 Mustard (M)",
  sulphites: "🍷 Sulphur Dioxide (O)",
  lupin: "🍚 Lupin (P)",
  molluscs: "🐌 Molluscs (R)",
};

const labelsOptions = {
  Bestseller: "⭐ Bestseller",
  New: "🆕 New",
};

const dietaryOptionsMap = {
  halal: {
    label: "Halal",
    image: "https://menutogo.at/get_image.php?file=Halal_logo.svg.png",
  },
  vegan: {
    label: "Vegan",
    image: "https://menutogo.at/get_image.php?file=vegan.png",
  },
  vegetarian: {
    label: "Vegetarian",
    image: "https://menutogo.at/get_image.php?file=veggie.png",
  },
};

export { allergensOptionsMap, labelsOptions, dietaryOptionsMap };
