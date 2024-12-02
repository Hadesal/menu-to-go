/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, InputNumber } from "antd";
import { Styles } from "../addItemDialog.styles";

interface BasicInfoFieldsProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
}

const BasicInfoFields = ({
  values,
  errors,
  touched,
  handleChange,
}: BasicInfoFieldsProps) => {
  return (
    <>
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
          touched.uniqueProductOrderingName && errors.uniqueProductOrderingName
            ? "error"
            : ""
        }
        help={
          touched.uniqueProductOrderingName && errors.uniqueProductOrderingName
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
    </>
  );
};

export default BasicInfoFields;
