/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button, Collapse, Form, Input, InputNumber } from "antd";
import { FieldArray } from "formik";
import "./productDialog.css";
interface ExtraPanelProps {
  values: any;
  handleChange: any;
}

const ExtraPanel = ({ values, handleChange }: ExtraPanelProps) => {
  const items = [
    {
      key: "extraPanel",
      label: "Extras",
      children: (
        <>
          {" "}
          <FieldArray name="details.extras">
            {({ push, remove }) => (
              <>
                {values.details.extras.map((extra: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 16,
                      backgroundColor: "#F9FDFE",
                      padding: 16,
                      borderRadius: 16,
                      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                      gap: 8,
                    }}
                  >
                    <Form.Item style={{ marginBottom: "0px", width: "60%" }}>
                      <Input
                        id={`details.extras.${index}.name`}
                        name={`details.extras.${index}.name`}
                        value={extra.name}
                        onChange={handleChange}
                        style={{ padding: "0.7rem" }}
                        placeholder="Extra name"
                      />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px", width: "30%" }}>
                      <InputNumber
                        id={`details.extras.${index}.price`}
                        name={`details.extras.${index}.price`}
                        value={extra.price || undefined} // Ensure placeholder is shown when value is not set
                        onChange={(value) =>
                          handleChange({
                            target: {
                              name: `details.extras.${index}.price`,
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
        </>
      ),
    },
  ];

  return (
    <Collapse
      style={{
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default ExtraPanel;
