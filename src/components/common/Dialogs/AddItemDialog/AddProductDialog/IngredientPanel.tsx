/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Button, Collapse } from "antd";
import { FieldArray } from "formik";
import FileUploadComponent from "../fileUploadComponent";

interface IngredientPanelProps {
  values: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
  errors: any;
  touched: any;
}

const IngredientPanel = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}: IngredientPanelProps) => {
  const items = [
    {
      key: "ingredientPanel",
      label: "Ingredients",
      children: (
        <FieldArray name="details.ingredients">
          {({ push, remove }) => (
            <>
              {values.details.ingredients.map((ingredient: any, index: number) => {
                const ingredientNameError =
                  touched?.details?.ingredients?.[index]?.name &&
                  errors?.details?.ingredients?.[index]?.name
                    ? errors.details.ingredients[index].name
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
                    <Form.Item label="Ingredient Image">
                      <FileUploadComponent
                        image={ingredient.image}
                        onImageChange={(image: string | null) => {
                          setFieldValue(`details.ingredients.${index}.image`, image);
                        }}
                        error={null}
                        setError={() => {}}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Ingredient Name"
                      validateStatus={ingredientNameError ? "error" : ""}
                      help={ingredientNameError}
                    >
                      <Input
                        id={`details.ingredients.${index}.name`}
                        name={`details.ingredients.${index}.name`}
                        value={ingredient.name}
                        onChange={handleChange}
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
                );
              })}
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
      ),
    },
  ];

  return <Collapse items={items} defaultActiveKey={["ingredientPanel"]} />;
};

export default IngredientPanel;
