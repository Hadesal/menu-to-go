/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button, Collapse, Form, Input, InputNumber } from "antd";
import { FieldArray } from "formik";
import "./productDialog.css";
import { useLanguage } from "src/hooks/useLanguage";
interface ExtraPanelProps {
  values: any;
  handleChange: any;
  errors: any;
  touched: any;
}

const ExtraPanel = ({
  values,
  handleChange,
  errors,
  touched,
}: ExtraPanelProps) => {
  const { getString } = useLanguage();

  const items = [
    {
      key: "extraPanel",
      label: getString("extrasLabel"),
      children: (
        <FieldArray name="details.extras">
          {({ push, remove }) => (
            <>
              {values.details.extras.map((extra: any, index: number) => {
                const extraNameError =
                  touched?.details?.extras?.[index]?.name &&
                  errors?.details?.extras?.[index]?.name
                    ? errors.details.extras[index].name
                    : null;

                const extraPriceError =
                  touched?.details?.extras?.[index]?.price &&
                  errors?.details?.extras?.[index]?.price
                    ? errors.details.extras[index].price
                    : null;

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      marginBottom: 16,
                      backgroundColor: "#F9FDFE",
                      padding: 16,
                      borderRadius: 16,
                      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                      gap: 8,
                    }}
                  >
                    <Form.Item
                      validateStatus={extraNameError ? "error" : ""}
                      help={extraNameError}
                      style={{ marginBottom: "0px", width: "60%" }}
                    >
                      <Input
                        id={`details.extras.${index}.name`}
                        name={`details.extras.${index}.name`}
                        value={extra.name}
                        onChange={handleChange}
                        style={{ padding: "0.7rem" }}
                        placeholder={getString("extrasNamePlaceHolder")}
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "0px", width: "30%" }}
                      validateStatus={extraPriceError ? "error" : ""}
                      help={extraPriceError}
                    >
                      <InputNumber
                        id={`details.extras.${index}.price`}
                        name={`details.extras.${index}.price`}
                        value={extra.price || undefined}
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
                        placeholder={getString("extrasNamePriceHolder")}
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
              })}
              <Button
                onClick={() => push({ id: "", name: "", price: 0 })}
                type="dashed"
                style={{ width: "100%", marginTop: 16 }}
              >
                {getString("addExtrasBtnLabel")}
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
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default ExtraPanel;
