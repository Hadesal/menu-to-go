/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";

interface ExtraPanelProps {
  values: any;
  handleChange: any;
  errors: any;
  touched: any;
}

const ExtraPanel = ({ values, handleChange, errors, touched }: ExtraPanelProps) => {
  const items = [
    {
      key: "extraPanel",
      label: "Extras",
      children: (
        <FieldArray name="details.extras">
          {({ push, remove }) => (
            <>
              {values.details.extras.map((extra: any, index: number) => {
                const extraNameError =
                  touched?.details?.extras?.[index]?.name && errors?.details?.extras?.[index]?.name
                    ? errors.details.extras[index].name
                    : null;

                const extraPriceError =
                  touched?.details?.extras?.[index]?.price && errors?.details?.extras?.[index]?.price
                    ? errors.details.extras[index].price
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
                      label="Extra Name"
                      validateStatus={extraNameError ? "error" : ""}
                      help={extraNameError}
                    >
                      <Input
                        id={`details.extras.${index}.name`}
                        name={`details.extras.${index}.name`}
                        value={extra.name}
                        onChange={handleChange}
                        placeholder="Enter extra name"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Extra Price"
                      validateStatus={extraPriceError ? "error" : ""}
                      help={extraPriceError}
                    >
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
                        style={{ width: "100%" }}
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
                );
              })}
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
      ),
    },
  ];

  return <Collapse items={items} defaultActiveKey={["extraPanel"]} />;
};

export default ExtraPanel;
