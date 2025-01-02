import {
  isCategoryData,
  isProductData,
  isRestaurantData,
  itemType,
} from "@utils/dataTypeCheck";
import { Dispatch, SetStateAction } from "react";

export const checkTypeAndSet = (
  dataToCheck: itemType,
  setDialogData: Dispatch<SetStateAction<itemType | null>>
) => {
  if (!dataToCheck) return null;
  if (isProductData(dataToCheck)) {
    setDialogData({
      name: dataToCheck.name,
      price: dataToCheck.price,
      details: {
        detailsDescription: dataToCheck.details.detailsDescription,
        extras: dataToCheck.details.extras,
        ingredients: dataToCheck.details.ingredients,
        variants: dataToCheck.details.variants,
        allergies: dataToCheck.details.allergies,
        labels: dataToCheck.details.labels,
        dietaryOptions: dataToCheck.details.dietaryOptions,
      },
      isAvailable: dataToCheck.isAvailable,
      image: dataToCheck.image,
    });
  } else if (isCategoryData(dataToCheck)) {
    setDialogData(dataToCheck);
  } else if (isRestaurantData(dataToCheck)) {
    setDialogData(dataToCheck);
  }
};
