import { setSelectedProductsIDs } from "@slices/restaurantsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";

const useCheckBoxHandler = () => {
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updatedCheckedItems: Record<string, boolean> =
      selectedProductIds.reduce((acc: Record<string, boolean>, id: string) => {
        acc[id] = true;
        return acc;
      }, {} as Record<string, boolean>);
    setCheckedItems(updatedCheckedItems);
  }, [selectedProductIds]);

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
    setCheckedItems((prev) => {
      if (Object.keys(prev).length === 0) return prev; 
      return {}; 
    });
  };

  return {
    checkedItems,
    handleCheckBoxChange,
    resetCheckedItems,
  };
};

export default useCheckBoxHandler;
