/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";

const { Panel } = Collapse;

interface IngredientPanelProps {
  values: any;
  handleChange: any;
}

const IngredientPanel = ({ values, handleChange }: IngredientPanelProps) => {
  return (
    <Collapse>
      <Panel
        header="Ingredients"
        key="2"
        style={{
          background: "#E0E4E5",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <FieldArray name="details.ingredients">
          {({ push, remove }) => (
            <>
              {values.details.ingredients.map(
                (ingredient: any, index: number) => (
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
                    <Form.Item label="Ingredient Name">
                      <Input
                        id={`details.ingredients.${index}.name`}
                        name={`details.ingredients.${index}.name`}
                        value={ingredient.name}
                        onChange={handleChange}
                        style={{}}
                        placeholder="Enter ingredient name"
                      />
                    </Form.Item>
                    <Form.Item label="Ingredient Price">
                      <InputNumber
                        id={`details.ingredients.${index}.price`}
                        name={`details.ingredients.${index}.price`}
                        value={ingredient.price}
                        onChange={(value) =>
                          handleChange({
                            target: {
                              name: `details.ingredients.${index}.price`,
                              value,
                            },
                          })
                        }
                        style={{}}
                        placeholder="Enter ingredient price"
                      />
                    </Form.Item>
                    <Button
                      onClick={() => remove(index)}
                      type="primary"
                      danger
                      style={{ marginTop: 8 }}
                    >
                      Remove Ingredient
                    </Button>
                  </div>
                )
              )}
              <Button
                onClick={() => push({ id: "", name: "", price: 0 })}
                type="dashed"
                style={{ width: "100%", marginTop: 16 }}
              >
                Add Ingredient
              </Button>
            </>
          )}
        </FieldArray>
      </Panel>
    </Collapse>
  );
};

export default IngredientPanel;
