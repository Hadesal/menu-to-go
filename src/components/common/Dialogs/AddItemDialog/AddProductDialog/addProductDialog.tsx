import React from "react";
import { Modal } from "antd";
import { ProductData } from "@dataTypes/ProductDataTypes";
import ProductForm from "./ProductForm";

interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  onConfirmClick: (item: ProductData) => void;
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
}: AddProductDialogProps) => {
  return (
    <Modal
      title={
        <p
          style={{
            fontSize: "1.4rem",
            paddingLeft: 0,
            color: "#797979",
          }}
        >
          {dialogTitle}
        </p>
      }
      maskClosable={false}
      open={isDialogOpen}
      onCancel={() => setDialogIsOpen(false)}
      destroyOnClose={true}
      zIndex={10000000000000000}
      footer={null}
      style={{ top: 50 }}
      styles={{
        content: {
          borderRadius: "24px",
          padding: "10px 50px",
        },
        body: {
          overflowY: "auto",
        },
      }}
      centered={false}
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
