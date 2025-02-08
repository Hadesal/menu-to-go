import {
  ExtrasData,
  IngredientData,
  ProductData,
  VariantData,
} from "@dataTypes/ProductDataTypes";
import { Button, Form, Space } from "antd";
import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useRef } from "react";
import BasicInfoFields from "./BasicInfoFields";
import ProductDetailsFields from "./ProductDetailsFields";
import "./productDialog.css";
import { createValidationSchema } from "./validationSchema";
import { handleProductCancel } from "../../helpers/addProductValidators";
import { isEqual } from "lodash";

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
      allergies: [],
      labels: [],
      dietaryOptions: { value: "", label: "" },
      variants: {
        name: "",
        variantList: [],
      },
      ingredients: [],
      extras: [],
    },
    isAvailable: true,
    isSoldOut: false,
    image: "",
  };

  const handleSubmit = (
    values: ProductData,
    actions: FormikHelpers<ProductData>
  ) => {
    if (isEqual(values, initialValues)) {
      actions.setSubmitting(false);
      return;
    }

    // Proceed with the update
    const clonedValues = JSON.parse(JSON.stringify(values));
    delete clonedValues.id;
    if (clonedValues.details) {
      delete clonedValues.details.id;
      if (clonedValues.details.variants) {
        delete clonedValues.details.variants.id;
        clonedValues.details.variants.variantList.forEach(
          (variant: VariantData) => {
            delete variant.id;
          }
        );
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
    actions.setSubmitting(false);
  };
  const handleCancel = () => {
    handleProductCancel(
      () => setDialogIsOpen(false),
      initialValues,
      () => setDialogIsOpen(false),
      {
        // Pass error flag setters if using
      },
      initialData
    );
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={createValidationSchema(existingProducts, initialData)}
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
        dirty,
      }) => (
        <FormikForm>
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
            isEditing={!!initialData}
          />
          <Form.Item style={{ marginTop: "1rem" }}>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                className="cancelButton"
                onClick={() => {
                  handleCancel();
                  resetForm();
                }}
              >
                {cancelText}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="addBtn"
                disabled={!dirty}
              >
                {confirmText}
              </Button>
            </Space>
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ProductForm;
