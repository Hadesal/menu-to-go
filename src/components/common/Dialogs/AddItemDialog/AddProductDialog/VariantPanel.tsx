/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button, Collapse, Form, Input, InputNumber } from "antd";
import { FieldArray } from "formik";
import "./productDialog.css";

interface VariantPanelProps {
  values: any;
  handleChange: any;
}

const VariantPanel = ({ values, handleChange }: VariantPanelProps) => {
  const items = [
    {
      key: "variantPanel",
      label: "Variants",
      children: (
        <>
          <Form.Item label="Variants Name" layout="vertical" colon={false}>
            <Input
              id="details.variants.name"
              name="details.variants.name"
              value={values.details.variants.name}
              onChange={handleChange}
              style={{ padding: "12px 10px" }}
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
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 16,
                        backgroundColor: "#F9FDFE",
                        padding: 16,
                        borderRadius: 10,
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                        gap: 8,
                      }}
                    >
                      <Form.Item style={{ marginBottom: "0px", width: "60%" }}>
                        <Input
                          id={`details.variants.variantList.${index}.name`}
                          name={`details.variants.variantList.${index}.name`}
                          value={variant.name}
                          onChange={handleChange}
                          placeholder="Variant name"
                          style={{ padding: "0.7rem" }}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: "0px", width: "30%" }}>
                        <InputNumber
                          id={`details.variants.variantList.${index}.price`}
                          name={`details.variants.variantList.${index}.price`}
                          value={variant.price || undefined} // Ensure placeholder is shown when value is not set
                          onChange={(value) =>
                            handleChange({
                              target: {
                                name: `details.variants.variantList.${index}.price`,
                                value,
                              },
                            })
                          }
                          style={{ padding: "0.45rem" }}
                          controls={false}
                          placeholder="Price"
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
                  )
                )}
                <Button
                  onClick={() => push({ id: "", name: "", price: 0 })}
                  type="dashed"
                  style={{ width: "100%", marginTop: 16}}
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
  return (
    <Collapse
      style={{ marginBottom: "1rem" , marginLeft:"0.5rem" , marginRight:"0.5rem" }}
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default VariantPanel;
