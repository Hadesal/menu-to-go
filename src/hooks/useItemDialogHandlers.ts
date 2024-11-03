// listViewHandlers.ts
import { useState } from "react";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";

export const useItemDialogHandlers = () => {
  const [currentItem, setCurrentItem] = useState<
    ProductData | CategoryData | RestaurantData | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDuplicateProductDialogOpen, setIsDuplicateProductDialogOpen] =
    useState<boolean>(false);
  const handleEditClick = (
    item: ProductData | CategoryData | RestaurantData
  ) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (
    item: ProductData | CategoryData | RestaurantData
  ) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleDuplicateClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsDuplicateProductDialogOpen(true);
  };

  const handleDuplicateDialogClose = () => {
    setIsDuplicateProductDialogOpen(false);
  };

  return {
    currentItem,
    isDeleteDialogOpen,
    isEditDialogOpen,
    isDuplicateProductDialogOpen,
    setCurrentItem,
    setIsDeleteDialogOpen,
    setIsEditDialogOpen,
    handleEditClick,
    handleDeleteClick,
    handleDeleteDialogClose,
    handleEditDialogClose,
    handleDuplicateClick,
    handleDuplicateDialogClose,
    setIsDuplicateProductDialogOpen,
    setIsEditDialogOpen
  };
};
