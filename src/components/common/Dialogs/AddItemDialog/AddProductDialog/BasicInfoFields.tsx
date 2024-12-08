/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber } from "antd";
import { Styles } from "../addItemDialog.styles";
import FileUploadComponent from "../fileUploadComponent";
import { useState } from "react";

interface BasicInfoFieldsProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
}

const BasicInfoFields = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
}: BasicInfoFieldsProps) => {
  const [imageError, setImageError] = useState<string | null>(null);
  return (
    <>
      <Form.Item
        validateStatus={imageError ? "error" : ""}
        help={imageError}
        style={Styles.textFieldWrapper}
      >
        <FileUploadComponent
          image={values.image}
          onImageChange={(image: string | null) => {
            console.log(values)
            setFieldValue("image", image);
          }}
          error={imageError}
          setError={setImageError}
        />
      </Form.Item>
      <Form.Item
        label="Name"
        colon={false}
        validateStatus={touched.name && errors.name ? "error" : ""}
        help={touched.name && errors.name}
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          style={{
            padding: "16.5px 14px",
            borderRadius: "1rem",
          }}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        validateStatus={touched.price && errors.price ? "error" : ""}
        help={touched.price && errors.price}
        style={{
          padding: "0.5rem",
        }}
        layout="vertical"
      >
        <InputNumber
          id="price"
          name="price"
          value={values.price}
          onChange={(value) =>
            handleChange({ target: { name: "price", value } })
          }
          controls={false}
          style={{
            padding: "16.5px 14px",
            borderRadius: "1rem",
            width: "100%",
            appearance: "textfield",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }}
        />
      </Form.Item>
    </>
  );
};

export default BasicInfoFields;
