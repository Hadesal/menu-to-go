/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";

const { Panel } = Collapse;

interface ExtraPanelProps {
  values: any;
  handleChange: any;
}

const ExtraPanel = ({ values, handleChange }: ExtraPanelProps) => {
  return (
    <Collapse>
      <Panel
        header="Extras"
        key="3"
        style={{
          background: "#E0E4E5",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <FieldArray name="details.extras">
          {({ push, remove }) => (
            <>
              {values.details.extras.map((extra: any, index: number) => (
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
                      style={{}}
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
                      style={{}}
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
  );
};

export default ExtraPanel;
