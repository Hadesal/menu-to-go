import React, { useEffect, useRef } from "react";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import { Typography, Form, Space, Button } from "antd";
import {
  ExtrasData,
  IngredientData,
  ProductData,
  VariantData,
} from "@dataTypes/ProductDataTypes";
import BasicInfoFields from "./BasicInfoFields";
import ProductDetailsFields from "./ProductDetailsFields";
import { createValidationSchema } from "./validationSchema";

interface ProductFormProps {
  initialData?: ProductData;
  onConfirmClick: (item: ProductData) => void;
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText: string;
  cancelText: string;
  existingProducts: ProductData[] | undefined;
  isDialogOpen: boolean;
}

const ProductForm = ({
  initialData,
  onConfirmClick,
  setDialogIsOpen,
  confirmText,
  cancelText,
  existingProducts,
  isDialogOpen,
}: ProductFormProps) => {
  const formikRef = useRef<FormikProps<ProductData>>(null);

  useEffect(() => {
    if (!isDialogOpen && formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [isDialogOpen]);



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
    const clonedValues = JSON.parse(JSON.stringify(values));
    delete clonedValues.id;
    if (clonedValues.details) {
      delete clonedValues.details.id;
      if (clonedValues.details.variants) {
        delete clonedValues.details.variants.id;
        clonedValues.details.variants.variantList.forEach((variant: VariantData) => {
          delete variant.id;
        });
      }
      clonedValues.details.ingredients.forEach((ingredient: IngredientData) => {
        delete ingredient.id;
      });
      clonedValues.details.extras.forEach((extra: ExtrasData) => {
        delete extra.id;
      });
    }

    onConfirmClick(clonedValues);
    setDialogIsOpen(false);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={createValidationSchema( existingProducts, initialData)}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
      validateOnBlur
      context={{ values: initialValues, existingProducts, initialData }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        resetForm,
      }) => (
        <FormikForm>
          <Typography.Title level={4}>Product Information</Typography.Title>

          <BasicInfoFields
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          <ProductDetailsFields
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "primary" }}
              >
                {confirmText}
              </Button>
              <Button
                onClick={() => {
                  setDialogIsOpen(false);
                  resetForm();
                }}
              >
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
