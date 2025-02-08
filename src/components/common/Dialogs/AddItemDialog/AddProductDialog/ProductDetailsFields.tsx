/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Switch, Tooltip } from "antd";
import { useLanguage } from "src/hooks/useLanguage";
import ExtraPanel from "./ExtraPanel";
import IngredientPanel from "./IngredientPanel";
import ProductLabelsFields from "./ProductLabelsFields";
import VariantPanel from "./VariantPanel";

interface ProductDetailsFieldsProps {
  values: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
  errors: any;
  touched: any;
  isEditing: boolean;
}

const ProductDetailsFields = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
  isEditing,
}: ProductDetailsFieldsProps) => {
  const { getString, currentLanguage } = useLanguage();

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    // Use setFieldValue or handleChange to update the state
    setFieldValue(name, checked);
  };

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
      <Form.Item
        label={
          <span>
            {getString("isAvailable")}
            <Tooltip
              placement={currentLanguage === "ar" ? "left" : "right"}
              title={getString("isAvailableInfo")}
            >
              <InfoCircleOutlined
                style={{
                  color: "var(--primary-color)",
                  marginLeft: currentLanguage === "ar" ? 0 : 5,
                  marginRight: currentLanguage === "ar" ? 5 : 0,
                }}
              />
            </Tooltip>
          </span>
        }
        colon={false}
        layout="horizontal"
        style={{
          padding: "0.5rem",
        }}
      >
        <Switch
          style={{ float: currentLanguage === "ar" ? "left" : "right" }}
          checked={values.isAvailable}
          onChange={handleSwitchChange("isAvailable")}
        />
      </Form.Item>

      {isEditing && (
        <Form.Item
          label={
            <span>
              {getString("isSoldOut")}
              <Tooltip
                placement={currentLanguage === "ar" ? "left" : "right"}
                title={getString("isSoldOutInfo")}
              >
                <InfoCircleOutlined
                  style={{
                    color: "var(--primary-color)",
                    marginLeft: currentLanguage === "ar" ? 0 : 5,
                    marginRight: currentLanguage === "ar" ? 5 : 0,
                  }}
                />
              </Tooltip>
            </span>
          }
          colon={false}
          layout="horizontal"
          style={{
            padding: "0.5rem",
          }}
        >
          <Switch
            style={{ float: currentLanguage === "ar" ? "left" : "right" }}
            checked={values.isSoldOut}
            onChange={handleSwitchChange("isSoldOut")}
          />
        </Form.Item>
      )}

      <ProductLabelsFields values={values} setFieldValue={setFieldValue} />

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
