/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Form, Input, Collapse } from "antd";
import VariantPanel from "./VariantPanel";
import IngredientPanel from "./IngredientPanel";
import ExtraPanel from "./ExtraPanel";

const { Panel } = Collapse;

interface ProductDetailsFieldsProps {
  values: any;
  handleChange: any;
}

const ProductDetailsFields = ({
  values,
  handleChange,
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

      <VariantPanel values={values} handleChange={handleChange} />
      <IngredientPanel values={values} handleChange={handleChange} />
      <ExtraPanel values={values} handleChange={handleChange} />
    </>
  );
};

export default ProductDetailsFields;
