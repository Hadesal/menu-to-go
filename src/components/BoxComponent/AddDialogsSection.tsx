/* eslint-disable @typescript-eslint/no-explicit-any */
import AddRestaurantDialog from "@components/Dialogs/AddItemDialog/addRestaurantDialog";
import AddProductDialog from "@components/Dialogs/AddItemDialog/addProductDialog";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { useTranslation } from "react-i18next";

interface AddDialogsSectionProps {
  open: boolean;
  handleClose: () => void;
  addFunction: (item: any) => void;
  restaurantList: RestaurantData[];
  selectedCategoryProducts: ProductData[] | undefined;
  product: boolean;
}

export const AddDialogsSection = ({
  open,
  handleClose,
  addFunction,
  restaurantList,
  selectedCategoryProducts,
  product,
}: AddDialogsSectionProps) => {
  const { t } = useTranslation();
  const getString = t;

  return (
    <>
      <AddRestaurantDialog
        title={getString("addRestaurantText")}
        errorMessage={getString("addRestaurantInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isOpen={product ? false : open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
        data={restaurantList}
      />

      <AddProductDialog
        dialogTitle={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={product ? open : false}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
        data={selectedCategoryProducts || []}
      />
    </>
  );
};
