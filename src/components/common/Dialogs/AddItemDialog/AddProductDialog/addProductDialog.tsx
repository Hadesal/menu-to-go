import React from "react";
import { Modal } from "antd";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { itemType } from "@utils/dataTypeCheck";
import ProductForm from "./ProductForm";

interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: itemType) => void;
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ProductData;
  existingProducts: ProductData[] | undefined;
}

const AddProductDialog = ({
  isDialogOpen,
  dialogTitle,
  cancelText,
  confirmText,
  onConfirmClick,
  setDialogIsOpen,
  initialData,
  existingProducts,
  errorMessage,
}: AddProductDialogProps) => {
  return (
    <Modal
      title={dialogTitle}
      open={isDialogOpen}
      onCancel={() => setDialogIsOpen(false)}
      footer={null}
      style={{}}
      destroyOnClose={true}
    >
      <ProductForm
        initialData={initialData}
        onConfirmClick={onConfirmClick}
        setDialogIsOpen={setDialogIsOpen}
        confirmText={confirmText}
        cancelText={cancelText}
        existingProducts={existingProducts}
        isDialogOpen={isDialogOpen}
      />
    </Modal>
  );
};

export default AddProductDialog;
