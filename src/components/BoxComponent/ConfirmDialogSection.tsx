import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import ConfirmDialog from "@components/Dialogs/LogoutDialog/confirmDialog";
import { removeProductFromCategory as deleteProduct } from "@redux/thunks/productThunks";
import { useTranslation } from "react-i18next";

interface ConfirmDialogSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmDialogSection = ({
  isOpen,
  onClose,
}: ConfirmDialogSectionProps) => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector(
    (state) => state.restaurantsData.selectedCategory
  );
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData.selectedProductsIDs
  );

  const handleDelete = () => {
    if (selectedCategory?.id) {
      dispatch(
        deleteProduct({
          categoryId: selectedCategory.id,
          productId: selectedProductIds,
        })
      );
    }
    onClose();
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onPrimaryActionClick={handleDelete}
      onSecondaryActionClick={onClose}
      onClose={onClose}
      width="500px"
      height="300px"
      showImg={false}
      secondaryActionText={getString("cancel")}
      primaryActionText={getString("delete")}
      title={getString("deleteConfirmText")}
      subTitle="Are you sure you want to delete? You can't undo this action."
    />
  );
};
