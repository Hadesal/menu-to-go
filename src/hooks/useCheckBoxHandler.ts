import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { setSelectedProductsIDs } from "@slices/restaurantsSlice";
import { ProductData } from "@dataTypes/ProductDataTypes";

const useCheckBoxHandler = (items: ProductData[]) => {
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: event.target.checked,
    }));

    const updatedSelectedProductIds = event.target.checked
      ? [...selectedProductIds, itemId]
      : selectedProductIds.filter((id) => id !== itemId);

    dispatch(setSelectedProductsIDs(updatedSelectedProductIds));
  };

  // Optionally, reset checkedItems when items change
  const resetCheckedItems = () => {
    const newCheckedItems = items.reduce((acc, item) => {
      acc[item.id as string] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(newCheckedItems);
  };

  return {
    checkedItems,
    handleCheckBoxChange,
    resetCheckedItems,
  };
};

export default useCheckBoxHandler;
