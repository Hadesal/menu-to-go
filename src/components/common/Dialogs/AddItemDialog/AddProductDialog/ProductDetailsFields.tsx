/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Form, Input } from "antd";
import VariantPanel from "./VariantPanel";
import IngredientPanel from "./IngredientPanel";
import ExtraPanel from "./ExtraPanel";

interface ProductDetailsFieldsProps {
  values: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
}

const ProductDetailsFields = ({
  values,
  handleChange,
  setFieldValue,
}: ProductDetailsFieldsProps) => {
  return (
    <>
      <Typography.Title
        level={4}
        style={{
          padding: "0.5rem",
        }}
      >
        Product Details
      </Typography.Title>

      <Form.Item
        label="Details Description"
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Input.TextArea
          id="details.detailsDescription"
          name="details.detailsDescription"
          value={values.details.detailsDescription}
          onChange={handleChange}
          rows={4}
          style={{
            padding: "16.5px 14px",
            borderRadius: "1rem",
            maxHeight: "250px", // Set maximum height (you can adjust this value as needed)
            minHeight: "100px", // Set maximum height (you can adjust this value as needed)
          }}
        />
      </Form.Item>

      <VariantPanel values={values} handleChange={handleChange} />

      <IngredientPanel
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />
      <ExtraPanel values={values} handleChange={handleChange} />
    </>
  );
};

export default ProductDetailsFields;
