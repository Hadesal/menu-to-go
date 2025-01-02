import {
  categoryDefaultData,
  productDefaultData,
  restaurantDefaultData,
} from "@constants/constants";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import {
  ProductData,
  ProductDetailsData,
  DietaryOptions,
  VariantsData,
} from "@dataTypes/ProductDataTypes";
import {
  RestaurantData,
  UserUiPreferences,
  ContactLinks,
  TableData,
} from "@dataTypes/RestaurantObject";
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
      (dialogData.details.detailsDescription?.trim().length === 0 || false) &&
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
    if (isRestaurantData(dialogData) && isRestaurantData(initialData)) {
      if (isDataUnchanged(initialData, dialogData)) {
        console.log("data changed");
        setErrorFlags.setIsDataUnchanged?.(true);
        return;
      }
    } else if (isCategoryData(dialogData) && isCategoryData(initialData)) {
      if (isCategoryDataUnchanged(initialData, dialogData)) {
        console.log("data changed");

        setErrorFlags.setIsDataUnchanged?.(true);
        return;
      }
    } else if (isProductData(dialogData) && isProductData(initialData)) {
      if (isProductDataUnchanged(initialData, dialogData)) {
        console.log("data changed");

        setErrorFlags.setIsDataUnchanged?.(true);
        return;
      }
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
// Check if data is unchanged
function isDataUnchanged(
  currentData: RestaurantData,
  newData: RestaurantData
): boolean {
  if (currentData.name !== newData.name) return false;
  if (!currentData.categories || !newData.categories) return false;
  if (currentData.categories.length !== newData.categories.length) return false;
  for (let i = 0; i < currentData.categories.length; i++) {
    if (
      !isCategoryDataUnchanged(currentData.categories[i], newData.categories[i])
    )
      return false;
  }
  if (!currentData.tables || !newData.tables) return false;
  if (currentData.tables.length !== newData.tables.length) return false;
  for (let i = 0; i < currentData.tables.length; i++) {
    if (!isTableDataUnchanged(currentData.tables[i], newData.tables[i]))
      return false;
  }
  if (!currentData.userUiPreferences || !newData.userUiPreferences)
    return false;
  if (
    !isUserUiPreferencesUnchanged(
      currentData.userUiPreferences,
      newData.userUiPreferences
    )
  )
    return false;
  return true;
}

function isCategoryDataUnchanged(
  currentCategory: CategoryData,
  newCategory: CategoryData
): boolean {
  if (currentCategory.name !== newCategory.name) return false;
  if (currentCategory.image !== newCategory.image) return false;
  if (currentCategory.categoryType !== newCategory.categoryType) return false;
  if (currentCategory.categoryOrder !== newCategory.categoryOrder) return false;
  if (currentCategory.products?.length !== newCategory.products?.length)
    return false;
  for (let i = 0; i < (currentCategory.products?.length || 0); i++) {
    if (
      !isProductDataUnchanged(
        currentCategory.products![i],
        newCategory.products![i]
      )
    )
      return false;
  }
  return true;
}

function isProductDataUnchanged(
  currentProduct: ProductData,
  newProduct: ProductData
): boolean {
  if (currentProduct.name !== newProduct.name) return false;
  if (currentProduct.price !== newProduct.price) return false;
  if (currentProduct.isAvailable !== newProduct.isAvailable) return false;
  if (currentProduct.image !== newProduct.image) return false;
  if (
    !isProductDetailsDataUnchanged(currentProduct.details, newProduct.details)
  )
    return false;
  return true;
}

function isProductDetailsDataUnchanged(
  currentDetails: ProductDetailsData,
  newDetails: ProductDetailsData
): boolean {
  if (currentDetails.detailsDescription !== newDetails.detailsDescription)
    return false;
  if (!isArrayUnchanged(currentDetails.allergies, newDetails.allergies))
    return false;
  if (!isArrayUnchanged(currentDetails.labels, newDetails.labels)) return false;
  if (
    !isDietaryOptionsUnchanged(
      currentDetails.dietaryOptions,
      newDetails.dietaryOptions
    )
  )
    return false;
  if (!isVariantsDataUnchanged(currentDetails.variants, newDetails.variants))
    return false;
  if (!isArrayUnchanged(currentDetails.ingredients, newDetails.ingredients))
    return false;
  if (!isArrayUnchanged(currentDetails.extras, newDetails.extras)) return false;
  return true;
}

function isDietaryOptionsUnchanged(
  currentOptions: DietaryOptions,
  newOptions: DietaryOptions
): boolean {
  return (
    currentOptions.label === newOptions.label &&
    currentOptions.value === newOptions.value
  );
}

function isVariantsDataUnchanged(
  currentVariants: VariantsData,
  newVariants: VariantsData
): boolean {
  if (currentVariants.name !== newVariants.name) return false;
  if (!isArrayUnchanged(currentVariants.variantList, newVariants.variantList))
    return false;
  return true;
}

function isUserUiPreferencesUnchanged(
  currentPreferences: UserUiPreferences,
  newPreferences: UserUiPreferences
): boolean {
  if (
    currentPreferences.colors.primaryColor !==
    newPreferences.colors.primaryColor
  )
    return false;
  if (
    currentPreferences.colors.secondaryColor !==
    newPreferences.colors.secondaryColor
  )
    return false;
  if (
    currentPreferences.colors.backgroundColor !==
    newPreferences.colors.backgroundColor
  )
    return false;
  if (
    currentPreferences.colors.effectedSpace !==
    newPreferences.colors.effectedSpace
  )
    return false;
  if (currentPreferences.fontType !== newPreferences.fontType) return false;
  if (currentPreferences.categoryShape !== newPreferences.categoryShape)
    return false;
  if (
    !isContactLinksUnchanged(
      currentPreferences.contactLinks,
      newPreferences.contactLinks
    )
  )
    return false;
  if (
    currentPreferences.ingredientViewType !== newPreferences.ingredientViewType
  )
    return false;
  if (currentPreferences.itemsViewType !== newPreferences.itemsViewType)
    return false;
  if (currentPreferences.logo !== newPreferences.logo) return false;
  return true;
}

function isContactLinksUnchanged(
  currentLinks: ContactLinks,
  newLinks: ContactLinks
): boolean {
  return (
    currentLinks.facebook === newLinks.facebook &&
    currentLinks.twitter === newLinks.twitter &&
    currentLinks.instagram === newLinks.instagram
  );
}

function isTableDataUnchanged(
  currentTable: TableData,
  newTable: TableData
): boolean {
  return (
    currentTable.id === newTable.id &&
    currentTable.number === newTable.number &&
    currentTable.capacity === newTable.capacity
  );
}

function isArrayUnchanged<T>(currentArray: T[], newArray: T[]): boolean {
  if (currentArray.length !== newArray.length) return false;
  for (let i = 0; i < currentArray.length; i++) {
    if (JSON.stringify(currentArray[i]) !== JSON.stringify(newArray[i]))
      return false;
  }
  return true;
}
