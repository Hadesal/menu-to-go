import React from "react";
import {
  Modal,
  Collapse,
  Button,
  Input,
  Typography,
  Form,
  InputNumber,
  Space,
} from "antd";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { itemType } from "@utils/dataTypeCheck";
import * as Yup from "yup";
import { DownOutlined } from "@ant-design/icons";
import { Styles } from "./addItemDialog.styles"; // Import the styles
import { updateProductInCategory } from "@redux/thunks/productThunks"; // Import your thunk action
import { useAppDispatch } from "@redux/reduxHooks";

const { Panel } = Collapse;

interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: itemType) => void;
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ProductData;
  data: ProductData[] | undefined;
  categoryId: string; // Add categoryId prop
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().min(0, "Price must be a positive number").required(),
  isAvailable: Yup.boolean().required(),
  uniqueProductOrderingName: Yup.string().required(
    "Unique ordering name is required"
  ),
});

const AddProductDialog = ({
  isDialogOpen,
  dialogTitle,
  cancelText,
  confirmText,
  onConfirmClick,
  setDialogIsOpen,
  errorMessage,
  initialData,
  data,
  categoryId,
}: AddProductDialogProps) => {
  const { t: getString } = useTranslation();
  const dispatch = useAppDispatch();

  // Set initial values, using initialData if provided
  const initialValues = initialData || {
    id: "",
    name: "",
    price: 0,
    details: {
      id: "",
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
    // Dispatch the updateProductInCategory action
    dispatch(
      updateProductInCategory({
        categoryId,
        productId: values.id || "", // Ensure productId is a string
        updatedProduct: values,
      })
    );
    setDialogIsOpen(false);
  };

  return (
    <Modal
      title={dialogTitle}
      open={isDialogOpen}
      onCancel={() => setDialogIsOpen(false)}
      footer={null}
      style={Styles.dialog}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <FormikForm>
            <Form
              layout="vertical"
              style={{ textAlign: "center", ...Styles.dialogContent }}
            >
              <Typography.Title level={4} style={Styles.title}>
                {dialogTitle}
              </Typography.Title>

              <Form.Item
                label="Name"
                validateStatus={touched.name && errors.name ? "error" : ""}
                help={touched.name && errors.name}
                style={Styles.textFieldWrapper}
              >
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  style={{ ...Styles.textFieldStyle, ...Styles.inputPropStyle }}
                  placeholder="Enter product name"
                />
              </Form.Item>

              <Form.Item
                label="Price"
                validateStatus={touched.price && errors.price ? "error" : ""}
                help={touched.price && errors.price}
                style={Styles.textFieldWrapper}
              >
                <InputNumber
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={(value) =>
                    handleChange({ target: { name: "price", value } })
                  }
                  style={{
                    width: "100%",
                    ...Styles.textFieldStyle,
                    ...Styles.inputPropStyle,
                  }}
                  placeholder="Enter product price"
                />
              </Form.Item>

              <Form.Item
                label="Unique Product Ordering Name"
                validateStatus={
                  touched.uniqueProductOrderingName &&
                  errors.uniqueProductOrderingName
                    ? "error"
                    : ""
                }
                help={
                  touched.uniqueProductOrderingName &&
                  errors.uniqueProductOrderingName
                }
                style={Styles.textFieldWrapper}
              >
                <Input
                  id="uniqueProductOrderingName"
                  name="uniqueProductOrderingName"
                  value={values.uniqueProductOrderingName}
                  onChange={handleChange}
                  style={{ ...Styles.textFieldStyle, ...Styles.inputPropStyle }}
                  placeholder="Enter unique ordering name"
                />
              </Form.Item>

              <Typography.Title level={4} style={Styles.subTitle}>
                Product Details
              </Typography.Title>

              <Form.Item label="Details Description" style={Styles.textArea}>
                <Input.TextArea
                  id="details.detailsDescription"
                  name="details.detailsDescription"
                  value={values.details.detailsDescription}
                  onChange={handleChange}
                  rows={4}
                  style={Styles.inputPropStyle}
                  placeholder="Enter product description"
                />
              </Form.Item>

              <Collapse
                expandIconPosition="right"
                bordered={false}
                style={{ backgroundColor: "transparent" }}
              >
                {/* Variants Panel */}
                <Panel
                  header="Variants"
                  key="1"
                  style={{
                    background: "#E0E4E5",
                    borderRadius: "16px 16px 0 0",
                    ...Styles.variantPanel,
                  }}
                >
                  <Form.Item
                    label="Variants Name"
                    style={Styles.textFieldWrapper}
                  >
                    <Input
                      id="details.variants.name"
                      name="details.variants.name"
                      value={values.details.variants.name}
                      onChange={handleChange}
                      style={{
                        ...Styles.textFieldStyle,
                        ...Styles.inputPropStyle,
                      }}
                      placeholder="Enter variants name"
                    />
                  </Form.Item>

                  <FieldArray name="details.variants.variantList">
                    {({ push, remove }) => (
                      <>
                        {values.details.variants.variantList.map(
                          (variant, index) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: 16,
                                backgroundColor: "#F9FDFE",
                                padding: 16,
                                borderRadius: 16,
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <Form.Item label="Variant Name">
                                <Input
                                  id={`details.variants.variantList.${index}.name`}
                                  name={`details.variants.variantList.${index}.name`}
                                  value={variant.name}
                                  onChange={handleChange}
                                  style={{
                                    ...Styles.textFieldStyle,
                                    ...Styles.inputPropStyle,
                                  }}
                                  placeholder="Enter variant name"
                                />
                              </Form.Item>
                              <Form.Item label="Variant Price">
                                <InputNumber
                                  id={`details.variants.variantList.${index}.price`}
                                  name={`details.variants.variantList.${index}.price`}
                                  value={variant.price}
                                  onChange={(value) =>
                                    handleChange({
                                      target: {
                                        name: `details.variants.variantList.${index}.price`,
                                        value,
                                      },
                                    })
                                  }
                                  style={{
                                    width: "100%",
                                    ...Styles.textFieldStyle,
                                    ...Styles.inputPropStyle,
                                  }}
                                  placeholder="Enter variant price"
                                />
                              </Form.Item>
                              <Button
                                onClick={() => remove(index)}
                                type="primary"
                                danger
                                style={{ marginTop: 8 }}
                              >
                                Remove Variant
                              </Button>
                            </div>
                          )
                        )}
                        <Button
                          onClick={() => push({ id: "", name: "", price: 0 })}
                          type="dashed"
                          style={{ width: "100%", marginTop: 16 }}
                        >
                          Add Variant
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Panel>

                {/* Ingredients Panel */}
                <Panel
                  header="Ingredients"
                  key="2"
                  style={{
                    background: "#E0E4E5",
                    borderRadius: "16px 16px 0 0",
                    ...Styles.variantPanel,
                  }}
                >
                  <FieldArray name="details.ingredients">
                    {({ push, remove }) => (
                      <>
                        {values.details.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            style={{
                              marginBottom: 16,
                              backgroundColor: "#F9FDFE",
                              padding: 16,
                              borderRadius: 16,
                              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <Form.Item label="Ingredient Name">
                              <Input
                                id={`details.ingredients.${index}.name`}
                                name={`details.ingredients.${index}.name`}
                                value={ingredient.name}
                                onChange={handleChange}
                                style={{
                                  ...Styles.textFieldStyle,
                                  ...Styles.inputPropStyle,
                                }}
                                placeholder="Enter ingredient name"
                              />
                            </Form.Item>
                            <Form.Item label="Ingredient Price">
                              <InputNumber
                                id={`details.ingredients.${index}.price`}
                                name={`details.ingredients.${index}.price`}
                                value={ingredient.price}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `details.ingredients.${index}.price`,
                                      value,
                                    },
                                  })
                                }
                                style={{
                                  width: "100%",
                                  ...Styles.textFieldStyle,
                                  ...Styles.inputPropStyle,
                                }}
                                placeholder="Enter ingredient price"
                              />
                            </Form.Item>
                            <Button
                              onClick={() => remove(index)}
                              type="primary"
                              danger
                              style={{ marginTop: 8 }}
                            >
                              Remove Ingredient
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => push({ id: "", name: "", price: 0 })}
                          type="dashed"
                          style={{ width: "100%", marginTop: 16 }}
                        >
                          Add Ingredient
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Panel>

                {/* Extras Panel */}
                <Panel
                  header="Extras"
                  key="3"
                  style={{
                    background: "#E0E4E5",
                    borderRadius: "16px 16px 0 0",
                    ...Styles.variantPanel,
                  }}
                >
                  <FieldArray name="details.extras">
                    {({ push, remove }) => (
                      <>
                        {values.details.extras.map((extra, index) => (
                          <div
                            key={index}
                            style={{
                              marginBottom: 16,
                              backgroundColor: "#F9FDFE",
                              padding: 16,
                              borderRadius: 16,
                              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <Form.Item label="Extra Name">
                              <Input
                                id={`details.extras.${index}.name`}
                                name={`details.extras.${index}.name`}
                                value={extra.name}
                                onChange={handleChange}
                                style={{
                                  ...Styles.textFieldStyle,
                                  ...Styles.inputPropStyle,
                                }}
                                placeholder="Enter extra name"
                              />
                            </Form.Item>
                            <Form.Item label="Extra Price">
                              <InputNumber
                                id={`details.extras.${index}.price`}
                                name={`details.extras.${index}.price`}
                                value={extra.price}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `details.extras.${index}.price`,
                                      value,
                                    },
                                  })
                                }
                                style={{
                                  width: "100%",
                                  ...Styles.textFieldStyle,
                                  ...Styles.inputPropStyle,
                                }}
                                placeholder="Enter extra price"
                              />
                            </Form.Item>
                            <Button
                              onClick={() => remove(index)}
                              type="primary"
                              danger
                              style={{ marginTop: 8 }}
                            >
                              Remove Extra
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => push({ id: "", name: "", price: 0 })}
                          type="dashed"
                          style={{ width: "100%", marginTop: 16 }}
                        >
                          Add Extra
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Panel>
              </Collapse>

              <Form.Item style={Styles.actionBox}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={Styles.logoutButton}
                  >
                    {confirmText}
                  </Button>
                  <Button
                    onClick={() => setDialogIsOpen(false)}
                    style={Styles.cancelButton}
                  >
                    {cancelText}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddProductDialog;
