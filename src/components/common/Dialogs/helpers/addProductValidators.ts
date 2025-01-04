import { Dispatch, SetStateAction } from "react";
import { ProductData } from "@dataTypes/ProductDataTypes";

type ErrorFlags = {
  setShowNameError?: Dispatch<SetStateAction<boolean>>;
  setIsNameDuplicate?: Dispatch<SetStateAction<boolean>>;
  setShowPriceError?: Dispatch<SetStateAction<boolean>>;
  setShowDescriptionError?: Dispatch<SetStateAction<boolean>>;
  setShowDietaryOptionsError?: Dispatch<SetStateAction<boolean>>;
  setShowVariantsError?: Dispatch<SetStateAction<boolean>>;
  setShowIngredientsError?: Dispatch<SetStateAction<boolean>>;
  setShowExtrasError?: Dispatch<SetStateAction<boolean>>;
  setImageError?: Dispatch<SetStateAction<string | null>>;
  setIsDataUnchanged?: Dispatch<SetStateAction<boolean>>;
};
/**
 * handleProductCancel
 * Resets the form to initial values if adding a new product,
 * clears error flags, and closes the dialog.
 */
export function handleProductCancel(
  setDialogData: Dispatch<SetStateAction<ProductData>>,
  defaultProductData: ProductData,
  onCancel: () => void,
  {
    setShowNameError,
    setIsNameDuplicate,
    setShowPriceError,
    setShowDescriptionError,
    setShowDietaryOptionsError,
    setShowVariantsError,
    setShowIngredientsError,
    setShowExtrasError,
    setImageError,
    setIsDataUnchanged,
  }: ErrorFlags,
  initialData?: ProductData
) {
  if (!initialData) {
    setDialogData(defaultProductData);
  }

  setShowNameError?.(false);
  setIsNameDuplicate?.(false);
  setShowPriceError?.(false);
  setShowDescriptionError?.(false);
  setShowDietaryOptionsError?.(false);
  setShowVariantsError?.(false);
  setShowIngredientsError?.(false);
  setShowExtrasError?.(false);
  setImageError?.(null);
  setIsDataUnchanged?.(false);

  onCancel();
}
