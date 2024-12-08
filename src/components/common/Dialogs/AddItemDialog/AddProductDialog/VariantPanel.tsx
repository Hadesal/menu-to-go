/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";

interface VariantPanelProps {
  values: any;
  handleChange: any;
  errors: any;
  touched: any;
}

const VariantPanel = ({ values, handleChange, errors, touched }: VariantPanelProps) => {
  // Compute error for variant group name
  const variantGroupNameError =
    touched?.details?.variants?.name && errors?.details?.variants?.name
      ? errors.details.variants.name
      : null;

  const items = [
    {
      key: "variantPanel",
      label: "Variants",
      children: (
        <>
          <Form.Item
            label="Variant Group Name"
            validateStatus={variantGroupNameError ? "error" : ""}
            help={variantGroupNameError}
          >
            <Input
              id="details.variants.name"
              name="details.variants.name"
              value={values.details.variants.name}
              onChange={handleChange}
              placeholder="Enter variants name"
            />
          </Form.Item>

          <FieldArray name="details.variants.variantList">
            {({ push, remove }) => (
              <>
                {values.details.variants.variantList.map((variant: any, index: number) => {
                  const variantNameError =
                    touched?.details?.variants?.variantList?.[index]?.name &&
                    errors?.details?.variants?.variantList?.[index]?.name
                      ? errors.details.variants.variantList[index].name
                      : null;

                  const variantPriceError =
                    touched?.details?.variants?.variantList?.[index]?.price &&
                    errors?.details?.variants?.variantList?.[index]?.price
                      ? errors.details.variants.variantList[index].price
                      : null;

                  return (
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
                      <Form.Item
                        label="Variant Name"
                        validateStatus={variantNameError ? "error" : ""}
                        help={variantNameError}
                      >
                        <Input
                          id={`details.variants.variantList.${index}.name`}
                          name={`details.variants.variantList.${index}.name`}
                          value={variant.name}
                          onChange={handleChange}
                          placeholder="Enter variant name"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Variant Price"
                        validateStatus={variantPriceError ? "error" : ""}
                        help={variantPriceError}
                      >
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
                          style={{ width: "100%" }}
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
                  );
                })}
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
        </>
      ),
    },
  ];
  return <Collapse items={items} defaultActiveKey={["variantPanel"]} />;
};

export default VariantPanel;
