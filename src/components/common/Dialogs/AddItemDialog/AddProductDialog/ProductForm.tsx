import {
  ExtrasData,
  IngredientData,
  ProductData,
  VariantData,
} from "@dataTypes/ProductDataTypes";
import { Button, Form, Space } from "antd";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import BasicInfoFields from "./BasicInfoFields";
import ProductDetailsFields from "./ProductDetailsFields";
import "./productDialog.css";
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .test(
        "unique-name",
        "A product with this name already exists.",
        function (value) {
          const { path, createError } = this;
          if (!existingProducts) return true;

          const isDuplicate = existingProducts.some(
            (product) =>
              product.name.toLowerCase() === value?.toLowerCase() &&
              product.id !== initialData?.id
          );

          if (isDuplicate) {
            return createError({
              path,
              message: "A product with this name already exists.",
            });
          }

          return true;
        }
      ),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    isAvailable: Yup.boolean().required("Availability is required"),
    uniqueProductOrderingName: Yup.string()
      .required("Unique ordering name is required")
      .test(
        "unique-ordering-name",
        "A product with this ordering name already exists.",
        function (value) {
          const { path, createError } = this;
          if (!existingProducts) return true;

          const isDuplicate = existingProducts.some(
            (product) =>
              product.uniqueProductOrderingName?.toLowerCase() ===
                value?.toLowerCase() && product.id !== initialData?.id
          );

          if (isDuplicate) {
            return createError({
              path,
              message: "A product with this ordering name already exists.",
            });
          }

          return true;
        }
      ),
    details: Yup.object().shape({
      variants: Yup.object().shape({
        variantList: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required("Variant name is required")
              .test(
                "unique-variant-name",
                "Variant names must be unique",
                function (value, context) {
                  const { path, createError, parent, from } = this;
                  const variantList =
                    from[1].value.details.variants.variantList;
                  const variantNames = variantList.map((variant: VariantData) =>
                    variant.name.toLowerCase()
                  );
                  const nameOccurrences = variantNames.filter(
                    (name: string) => name === value.toLowerCase()
                  ).length;

                  if (nameOccurrences > 1) {
                    return createError({
                      path,
                      message: "Variant names must be unique",
                    });
                  }
                  return true;
                }
              ),
            price: Yup.number()
              .typeError("Variant price must be a number")
              .positive("Variant price must be greater than zero")
              .required("Variant price is required"),
          })
        ),
        ingredients: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required("Ingredient name is required")
              .test(
                "unique-ingredient-name",
                "Ingredient names must be unique",
                function (value, context) {
                  const { path, createError, parent, from } = this;
                  const ingredients = from[1].value.details.ingredients;
                  const ingredientNames = ingredients.map(
                    (ingredient: IngredientData) =>
                      ingredient.name.toLowerCase()
                  );
                  const nameOccurrences = ingredientNames.filter(
                    (name: string) => name === value.toLowerCase()
                  ).length;

                  if (nameOccurrences > 1) {
                    return createError({
                      path,
                      message: "Ingredient names must be unique",
                    });
                  }
                  return true;
                }
              ),
          })
        ),
        extras: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required("Extra name is required")
              .test(
                "unique-extra-name",
                "Extra names must be unique",
                function (value, context) {
                  const { path, createError, parent, from } = this;
                  const extras = from[1].value.details.extras;
                  const extraNames = extras.map((extra: ExtrasData) =>
                    extra.name.toLowerCase()
                  );
                  const nameOccurrences = extraNames.filter(
                    (name: string) => name === value.toLowerCase()
                  ).length;

                  if (nameOccurrences > 1) {
                    return createError({
                      path,
                      message: "Extra names must be unique",
                    });
                  }
                  return true;
                }
              ),
            price: Yup.number()
              .typeError("Extra price must be a number")
              .positive("Extra price must be greater than zero")
              .required("Extra price is required"),
          })
        ),
      }),
    }),
  });

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
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        resetForm,
      }) => {
        return (
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
            />

            <Form.Item style={{ marginTop: "1rem" }}>
              <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className="cancelButton"
                  onClick={() => {
                    setDialogIsOpen(false);
                    resetForm();
                  }}
                >
                  {cancelText}
                </Button>
                <Button type="primary" htmlType="submit" className="addBtn">
                  {confirmText}
                </Button>
              </Space>
            </Form.Item>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
