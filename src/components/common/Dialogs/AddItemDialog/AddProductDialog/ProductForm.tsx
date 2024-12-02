import React, { useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import { Typography, Form, Space, Button } from "antd";
import * as Yup from "yup";
import { ProductData } from "@dataTypes/ProductDataTypes";

import BasicInfoFields from "./BasicInfoFields";
import ProductDetailsFields from "./ProductDetailsFields";

interface ProductFormProps {
  initialData?: ProductData;
  onConfirmClick: (item: ProductData) => void;
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText: string;
  cancelText: string;
  existingProducts: ProductData[] | undefined;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().min(0, "Price must be a positive number").required(),
  isAvailable: Yup.boolean().required(),
  uniqueProductOrderingName: Yup.string().required(
    "Unique ordering name is required"
  ),
});

const ProductForm = ({
  initialData,
  onConfirmClick,
  setDialogIsOpen,
  confirmText,
  cancelText,
  existingProducts,
}: ProductFormProps) => {
  const initialValues = initialData || {
    name: "",
    price: 0,
    details: {
      detailsDescription: "",
      variants: {
        name: "",
        variantList: [],
      },
      ingredients: [],
      extras: [],
    },
    isAvailable: true,
    image: "",
    uniqueProductOrderingName: "",
  };

  const handleSubmit = (values: ProductData) => {
    onConfirmClick(values);
    setDialogIsOpen(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => {
        console.log(formikHelpers);
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleChange }) => (
        <FormikForm>
          <Typography.Title level={4} style={{}}>
            Product Information
          </Typography.Title>

          <BasicInfoFields
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
          />

          <ProductDetailsFields values={values} handleChange={handleChange} />

          <Form.Item style={{}}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "primary" }}
              >
                {confirmText}
              </Button>
              <Button onClick={() => setDialogIsOpen(false)} style={{}}>
                {cancelText}
              </Button>
            </Space>
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ProductForm;
