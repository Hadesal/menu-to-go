/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button, Collapse, Form, Input, InputNumber } from "antd";
import { FieldArray } from "formik";
import FileUploadComponent from "../fileUploadComponent";
import "./productDialog.css";

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
              {values.details.ingredients.map(
                (ingredient: any, index: number) => {
                  const ingredientNameError =
                    touched?.details?.ingredients?.[index]?.name &&
                    errors?.details?.ingredients?.[index]?.name
                      ? errors.details.ingredients[index].name
                      : null;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: ingredientNameError? "self-start" :"center",
                        marginBottom: 16,
                        backgroundColor: "#F9FDFE",
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                        gap: 8,
                      }}
                    >
                      <Form.Item style={{ marginBottom: "0px", width: "20%" }}>
                        <FileUploadComponent
                          image={ingredient.image}
                          onImageChange={(image: string | null) => {
                            setFieldValue(
                              `details.ingredients.${index}.image`,
                              image
                            );
                          }}
                          error={null}
                          setError={() => {}}
                          width={60}
                          height={60}
                          imgHeight={20}
                          imgWidth={20}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "0px", width: "70%" }}
                        validateStatus={ingredientNameError ? "error" : ""}
                        help={ingredientNameError}
                      >
                        <Input
                          id={`details.ingredients.${index}.name`}
                          name={`details.ingredients.${index}.name`}
                          value={ingredient.name}
                          onChange={handleChange}
                          placeholder="Ingredient name"
                          style={{ padding: "0.7rem" }}
                        />
                      </Form.Item>

                      <IconButton
                        onClick={() => remove(index)}
                        aria-label="delete"
                        size="small"
                        style={{
                          color: "var(--primary-color)",
                          width: "10%",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  );
                }
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
      ),
    },
  ];
  return (
    <Collapse
      style={{
        marginBottom: "1rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
      items={items}
      defaultActiveKey={["ingredientPanel"]}
    />
  );
};

export default IngredientPanel;
