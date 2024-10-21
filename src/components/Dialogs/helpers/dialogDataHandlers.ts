// dialogDataHandlers.ts

import {
  ProductData,
  ExtrasData,
  IngredientData,
  VariantData,
} from "@dataTypes/ProductDataTypes";
import { Dispatch, SetStateAction } from "react";

// Function to handle Extras changes
export const handleExtrasChange = (
  setDialogData: Dispatch<SetStateAction<ProductData>>,
  extra: ExtrasData
) => {
  setDialogData((prevData) => {
    const updatedExtras = prevData.details.extras.find((e) => e.id === extra.id)
      ? prevData.details.extras.map((e) =>
          e.id === extra.id ? { ...extra, price: extra.price ?? 0 } : e
        )
      : [...prevData.details.extras, { ...extra, price: extra.price ?? 0 }];

    return {
      ...prevData,
      details: {
        ...prevData.details,
        extras: updatedExtras,
      },
    };
  });
};

// Function to handle Ingredients changes
export const handleIngredientsChange = (
  setDialogData: Dispatch<SetStateAction<ProductData>>,
  ingredient: IngredientData
) => {
  setDialogData((prevData) => {
    const updatedIngredients = prevData.details.ingredients.find(
      (i) => i.id === ingredient.id
    )
      ? prevData.details.ingredients.map((i) =>
          i.id === ingredient.id
            ? { ...ingredient, image: ingredient.image ?? "" }
            : i
        )
      : [
          ...prevData.details.ingredients,
          { ...ingredient, image: ingredient.image ?? "" },
        ];

    return {
      ...prevData,
      details: {
        ...prevData.details,
        ingredients: updatedIngredients,
      },
    };
  });
};

// Function to handle Variants changes
export const handleVariantsChange = (
  setDialogData: Dispatch<SetStateAction<ProductData>>,
  variant: VariantData
) => {
  setDialogData((prevData) => {
    const updatedVariantList = prevData.details.variants.variantList.find(
      (v) => v.id === variant.id
    )
      ? prevData.details.variants.variantList.map((v) =>
          v.id === variant.id ? { ...variant, price: variant.price ?? 0 } : v
        )
      : [
          ...prevData.details.variants.variantList,
          { ...variant, price: variant.price ?? 0 },
        ];

    return {
      ...prevData,
      details: {
        ...prevData.details,
        variants: {
          ...prevData.details.variants,
          variantList: updatedVariantList,
        },
      },
    };
  });
};
