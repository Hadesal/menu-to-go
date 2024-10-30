import {
  restaurantDefaultData,
  categoryDefaultData,
  productDefaultData,
} from "@constants/constants";
import {
  isCategoryData,
  isProductData,
  isRestaurantData,
  itemsType,
} from "@utils/dataTypeCheck";
import { Dispatch, SetStateAction } from "react";

export const checkTypeAndSet = (
  dataToCheck: itemsType,
  setDialogData: Dispatch<SetStateAction<itemsType | null>>
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
      },
      isAvailable: dataToCheck.isAvailable,
      image: dataToCheck.image,
      uniqueProductOrderingName: dataToCheck.uniqueProductOrderingName,
    });
  } else if (isCategoryData(dataToCheck)) {
    setDialogData(dataToCheck);
  } else if (isRestaurantData(dataToCheck)) {
    setDialogData(dataToCheck);
  }
};

export const getDefaultDataByType = (dataType: string) =>
  dataType === "restaurant"
    ? restaurantDefaultData
    : dataType === "category"
    ? categoryDefaultData
    : dataType === "product"
    ? productDefaultData
    : null;
