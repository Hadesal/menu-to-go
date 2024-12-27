/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import VariantPanel from "./VariantPanel";
import IngredientPanel from "./IngredientPanel";
import ExtraPanel from "./ExtraPanel";
import { useLanguage } from "src/hooks/useLanguage";

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
  touched,
}: ProductDetailsFieldsProps) => {
  const { getString } = useLanguage();

  return (
    <>
      <Form.Item
        label={getString("productDescription")}
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
            maxHeight: "250px",
            minHeight: "100px",
          }}
        />
      </Form.Item>

      <VariantPanel
        values={values}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
      />
      <IngredientPanel
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />
      <ExtraPanel
        values={values}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
      />
    </>
  );
};

export default ProductDetailsFields;
