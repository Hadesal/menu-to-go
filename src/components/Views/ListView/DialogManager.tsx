/* eslint-disable @typescript-eslint/no-explicit-any */
import AddProductDialog from "@components/Dialogs/AddItemDialog/addProductDialog";
import ConfirmDialog from "@components/Dialogs/LogoutDialog/confirmDialog";
import { useTranslation } from "react-i18next";

const DialogManager = ({
  currentItem,
  isEditDialogOpen,
  isDeleteDialogOpen,
  isDuplicateProductDialogOpen,
  handleEditDialogClose,
  handleDeleteDialogClose,
  handleOnDuplicateProductDialogCancel,
  editFunction,
  deleteFunction,
  duplicateFunction,
  selectedCategory,
}: any) => {
  const { t } = useTranslation();
  const getString = t;

  return (
    <>
      {currentItem && (
        <>
          <AddProductDialog
            dialogTitle={getString("editProduct")}
            errorMessage={getString("editProductInfoText")}
            cancelText={getString("cancel")}
            confirmText={getString("confirm")}
            isDialogOpen={isEditDialogOpen}
            onCancelClick={handleEditDialogClose}
            onConfirmClick={(data) =>
              editFunction({ ...data, id: currentItem.id })
            }
            initialData={currentItem}
            data={selectedCategory?.products || []}
          />
          <AddProductDialog
            dialogTitle={getString("DuplicateProduct")}
            cancelText={getString("cancel")}
            confirmText={getString("add")}
            isDialogOpen={isDuplicateProductDialogOpen}
            onCancelClick={handleOnDuplicateProductDialogCancel}
            initialData={currentItem}
            onConfirmClick={(item) => duplicateFunction(item)}
            errorMessage={getString("duplicateProductError")}
            data={selectedCategory?.products || []}
          />
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              deleteFunction(currentItem);
              handleDeleteDialogClose();
            }}
            onSecondaryActionClick={handleDeleteDialogClose}
            onClose={handleDeleteDialogClose}
            width="500px"
            height="300px"
            secondaryActionText={getString("cancel")}
            primaryActionText={getString("delete")}
            title={getString("deleteConfirmText")}
            subTitle={getString("productDeleteText", {
              productName: currentItem.name,
            })}
            showImg={false}
          />
        </>
      )}
    </>
  );
};

export default DialogManager;
