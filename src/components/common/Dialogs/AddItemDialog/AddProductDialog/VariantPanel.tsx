/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";

const { Panel } = Collapse;

interface VariantPanelProps {
  values: any;
  handleChange: any;
}

const VariantPanel = ({ values, handleChange }: VariantPanelProps) => {
  return (
    <Collapse>
      <Panel
        header="Variants"
        key="1"
        style={{
          background: "#E0E4E5",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <Form.Item label="Variants Name" style={{}}>
          <Input
            id="details.variants.name"
            name="details.variants.name"
            value={values.details.variants.name}
            onChange={handleChange}
            style={{}}
            placeholder="Enter variants name"
          />
        </Form.Item>

        <FieldArray name="details.variants.variantList">
          {({ push, remove }) => (
            <>
              {values.details.variants.variantList.map(
                (variant: any, index: number) => (
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
                        style={{}}
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
    </Collapse>
  );
};

export default VariantPanel;
