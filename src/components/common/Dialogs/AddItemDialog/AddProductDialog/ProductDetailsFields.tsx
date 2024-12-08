/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Form, Input } from "antd";
import VariantPanel from "./VariantPanel";
import IngredientPanel from "./IngredientPanel";
import ExtraPanel from "./ExtraPanel";

interface ProductDetailsFieldsProps {
  values: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
  errors: any;
  touched: any;
}

const ProductDetailsFields = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched
}: ProductDetailsFieldsProps) => {
  return (
    <>
      <Typography.Title level={4} style={{}}>
        Product Details
      </Typography.Title>

      <Form.Item label="Details Description" style={{}}>
        <Input.TextArea
          id="details.detailsDescription"
          name="details.detailsDescription"
          value={values.details.detailsDescription}
          onChange={handleChange}
          rows={4}
          style={{}}
          placeholder="Enter product description"
        />
      </Form.Item>

      <VariantPanel values={values} handleChange={handleChange} errors={errors} touched={touched} />
      <IngredientPanel
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />
      <ExtraPanel values={values} handleChange={handleChange} errors={errors}
        touched={touched}  />
    </>
  );
};

export default ProductDetailsFields;
