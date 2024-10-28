import {
  categoryDefaultData,
  productDefaultData,
  restaurantDefaultData,
} from "@constants/constants";
import {
  dataTypesString,
  isCategoryData,
  isProductData,
  isRestaurantData,
  itemType,
} from "@utils/dataTypeCheck";
import { Dispatch, SetStateAction } from "react";

interface Error {
  nameError: boolean;
  index: number;
  priceError?: boolean;
}
//TODO ADD HANDLE IMAGE ERROR
export const handleConfirm = <T extends itemType>(
  dialogData: T,
  setErrorFlags: {
    setShowNameError?: Dispatch<SetStateAction<boolean>>;
    setShowPriceError?: Dispatch<SetStateAction<boolean>>;
    setShowDescriptionError?: Dispatch<SetStateAction<boolean>>;
    setShowCategoryError?: Dispatch<SetStateAction<boolean>>;
    setIsNameDuplicate?: Dispatch<SetStateAction<boolean>>;
    setIsDataUnchanged?: Dispatch<SetStateAction<boolean>>;
    setIngredientsErrors?: Dispatch<SetStateAction<Error[]>>;
    setExtrasErrors?: Dispatch<SetStateAction<Error[]>>;
    setVariantsErrors?: Dispatch<SetStateAction<Error[]>>;
    setImageError?: Dispatch<SetStateAction<string | null>>;
  },
  onHandleCancel: () => void,
  onConfirmClick: (data: itemType) => void,
  dataList?: T[],
  initialData?: itemType | null
) => {
  let hasError = false;

  // Common name check
  if (dialogData?.name.trim().length === 0 && setErrorFlags.setShowNameError) {
    setErrorFlags.setShowNameError(true);
    hasError = true;
  }

  // Duplicate name check
  if (dataList && initialData?.name !== dialogData?.name) {
    const existingItem = dataList.find(
      (item) =>
        dialogData?.name.toLocaleLowerCase() === item.name.toLocaleLowerCase()
    );
    if (existingItem && setErrorFlags.setIsNameDuplicate) {
      setErrorFlags.setIsNameDuplicate(true);
      hasError = true;
    }
  }

  // Handle type-specific checks
  if (isProductData(dialogData)) {
    if (dialogData.price === 0 && setErrorFlags.setShowPriceError) {
      setErrorFlags.setShowPriceError(true);
      hasError = true;
    }

    if (
      dialogData.details.detailsDescription.trim().length === 0 &&
      setErrorFlags.setShowDescriptionError
    ) {
      setErrorFlags.setShowDescriptionError(true);
      hasError = true;
    }

    // Ingredient, extras, and variants error checks
    hasError =
      checkErrors(
        dialogData.details.ingredients,
        setErrorFlags.setIngredientsErrors
      ) || hasError;
    hasError =
      checkErrors(dialogData.details.extras, setErrorFlags.setExtrasErrors) ||
      hasError;
    hasError =
      checkErrors(
        dialogData.details.variants.variantList,
        setErrorFlags.setVariantsErrors
      ) || hasError;
  } else if (isCategoryData(dialogData)) {
    if (
      dialogData.categoryType.length === 0 &&
      setErrorFlags.setShowCategoryError
    ) {
      setErrorFlags.setShowCategoryError(true);
      hasError = true;
    }
  } else if (isRestaurantData(dialogData)) {
    // Additional restaurant-specific validations can be added here
  }

  // Early return if there was any error
  if (hasError) {
    return;
  }

  // Check if data is unchanged
  if (initialData) {
    if (
      dialogData?.name === initialData.name &&
      ((isProductData(dialogData) &&
        isProductData(initialData) &&
        dialogData.price === initialData.price) ||
        (isCategoryData(dialogData) &&
          isCategoryData(initialData) &&
          dialogData.categoryType === initialData.categoryType) ||
        (isRestaurantData(dialogData) &&
          isRestaurantData(initialData) &&
          dialogData.name === initialData.name))
    ) {
      setErrorFlags.setIsDataUnchanged?.(true);
      return;
    }
  }

  // Final confirmation and cancel
  onConfirmClick(dialogData);
  onHandleCancel();
};

// Helper function for checking ingredient, extra, and variant errors
const checkErrors = (
  items: { name: string; price?: number }[],
  setErrors: Dispatch<SetStateAction<Error[]>> | undefined
): boolean => {
  let hasError = false;
  items.forEach((item, index) => {
    const errorObject: Error = { nameError: item.name.length === 0, index };
    if (item.price !== undefined) {
      errorObject.priceError = item.price <= 0;
    }
    if (errorObject.nameError || errorObject.priceError) {
      setErrors?.((prevState) => [...prevState, errorObject]);
      hasError = true;
    }
  });
  return hasError;
};

export const handleCancel = <T extends itemType>(
  setDialogData: Dispatch<SetStateAction<T>>,
  dataType: dataTypesString,
  onCancelClick: Dispatch<SetStateAction<boolean>>,
  setErrorFlags: {
    setShowNameError?: Dispatch<SetStateAction<boolean>>;
    setShowPriceError?: Dispatch<SetStateAction<boolean>>;
    setShowDescriptionError?: Dispatch<SetStateAction<boolean>>;
    setShowCategoryError?: Dispatch<SetStateAction<boolean>>;
    setIsNameDuplicate?: Dispatch<SetStateAction<boolean>>;
    setIsDataUnchanged?: Dispatch<SetStateAction<boolean>>;
    setIngredientsErrors?: Dispatch<SetStateAction<Error[]>>;
    setExtrasErrors?: Dispatch<SetStateAction<Error[]>>;
    setVariantsErrors?: Dispatch<SetStateAction<Error[]>>;
    setImageError?: Dispatch<SetStateAction<string | null>>;
  },
  initialData?: itemType | null
) => {
  if (!initialData) {
    if (dataType === "product") {
      setDialogData(productDefaultData as T);
    } else if (dataType === "category") {
      setDialogData(categoryDefaultData as T);
    } else if (dataType === "restaurant") {
      setDialogData(restaurantDefaultData as T);
    }
  }
  setErrorFlags.setImageError && setErrorFlags.setImageError(null);
  setErrorFlags.setShowNameError && setErrorFlags.setShowNameError(false);
  setErrorFlags.setShowPriceError && setErrorFlags.setShowPriceError(false);
  setErrorFlags.setIsDataUnchanged && setErrorFlags.setIsDataUnchanged(false);
  setErrorFlags.setShowDescriptionError &&
    setErrorFlags.setShowDescriptionError(false);
  setErrorFlags.setIsNameDuplicate && setErrorFlags.setIsNameDuplicate(false);
  setErrorFlags.setExtrasErrors && setErrorFlags.setExtrasErrors([]);
  setErrorFlags.setIngredientsErrors && setErrorFlags.setIngredientsErrors([]);
  setErrorFlags.setVariantsErrors && setErrorFlags.setVariantsErrors([]);
  onCancelClick(false);
};
