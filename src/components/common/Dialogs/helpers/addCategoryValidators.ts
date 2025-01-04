import { Dispatch, SetStateAction } from "react";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

type ErrorFlags = {
  setShowNameError?: Dispatch<SetStateAction<boolean>>;
  setIsNameDuplicate?: Dispatch<SetStateAction<boolean>>;
  setShowCategoryError?: Dispatch<SetStateAction<boolean>>;
  setImageError?: Dispatch<SetStateAction<string | null>>;
  setIsDataUnchanged?: Dispatch<SetStateAction<boolean>>;
};

/**
 * handleCategoryConfirm
 *
 * 1. Validates category name (required).
 * 2. Checks for duplicate name if `existingCategories` is provided.
 * 3. Checks for category type if it’s required in your logic.
 * 4. Checks if data is unchanged when `initialCategory` is present.
 * 5. If all is good, calls `onConfirm`, then optionally calls `onCancel`.
 */
export function handleCategoryConfirm(
  categoryData: CategoryData,
  {
    setShowNameError,
    setIsNameDuplicate,
    setShowCategoryError,
    setImageError,
  }: ErrorFlags,
  onConfirm: (updatedCategory: CategoryData) => void,
  onCancel: () => void,
  existingCategories?: CategoryData[],
  initialCategory?: CategoryData
) {
  let hasError = false;

  setShowNameError?.(false);
  setIsNameDuplicate?.(false);
  setShowCategoryError?.(false);
  setImageError?.(null);

  if (!categoryData.name.trim()) {
    setShowNameError?.(true);
    hasError = true;
  }

  if (existingCategories && initialCategory?.name !== categoryData.name) {
    const duplicate = existingCategories.some(
      (cat) =>
        cat.name.trim().toLowerCase() === categoryData.name.trim().toLowerCase()
    );
    if (duplicate) {
      setIsNameDuplicate?.(true);
      hasError = true;
    }
  }

  if (!categoryData.categoryType.trim()) {
    setShowCategoryError?.(true);
    hasError = true;
  }

  if (hasError) {
    return;
  }

  onConfirm(categoryData);
  onCancel();
}

/**
 * handleCategoryCancel
 * Resets the dialog data if there's no `initialData` (i.e., "Create" scenario),
 * clears out error flags, and closes the dialog.
 */
export function handleCategoryCancel(
  setDialogData: Dispatch<SetStateAction<CategoryData>>,
  defaultCategoryData: CategoryData,
  onCancel: () => void,
  {
    setShowNameError,
    setIsNameDuplicate,
    setShowCategoryError,
    setImageError,
    setIsDataUnchanged,
  }: ErrorFlags,
  initialData?: CategoryData
) {
  if (!initialData) {
    setDialogData(defaultCategoryData);
  }

  // Reset all error flags
  setShowNameError?.(false);
  setIsNameDuplicate?.(false);
  setShowCategoryError?.(false);
  setImageError?.(null);
  setIsDataUnchanged?.(false);

  // Close the dialog
  onCancel();
}
