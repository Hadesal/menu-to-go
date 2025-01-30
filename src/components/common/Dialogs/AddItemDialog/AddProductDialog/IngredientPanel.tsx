/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { Button, Collapse, Form, Input } from "antd";
import { FieldArray, useFormikContext } from "formik";
import "./productDialog.css";
import { IngredientData, ProductData } from "@dataTypes/ProductDataTypes";
import React, { useState } from "react";
import { Styles } from "../addItemDialog.styles";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@assets/material-symbols_image-outline (1).svg";
import { useLanguage } from "src/hooks/useLanguage";

interface IngredientPanelProps {
  values: any;
  handleChange: any;
  setFieldValue: (field: string, value: any) => void;
  errors: any;
  touched: any;
}

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const IngredientPanel = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}: IngredientPanelProps) => {
  const { setFieldError } = useFormikContext<ProductData>();
  const { getString } = useLanguage();
  const [previewImages, setPreviewImages] = useState<{ [key: number]: string }>(
    {}
  );

  const items = [
    {
      key: "ingredientPanel",
      label: getString("ingredientsLabel"),
      children: (
        <FieldArray name="details.ingredients">
          {({ push, remove }) => (
            <>
              {values.details.ingredients.map(
                (ingredient: IngredientData, index: number) => {
                  const ingredientNameError =
                    touched?.details?.ingredients?.[index]?.name &&
                    errors?.details?.ingredients?.[index]?.name
                      ? errors.details.ingredients[index].name
                      : null;
                  const ingredientImageError =
                    touched?.details?.ingredients?.[index]?.image &&
                    errors?.details?.ingredients?.[index]?.image
                      ? errors.details.ingredients[index].image
                      : null;

                  const handleImageUpload = (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const fileType = file.type;
                      const fileSizeMB = file.size / (1024 * 1024);

                      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
                        setFieldError(
                          `details.ingredients.${index}.image`,
                          "Only PNG, JPG, and SVG files are allowed."
                        );
                        return;
                      }

                      if (fileSizeMB > MAX_FILE_SIZE_MB) {
                        setFieldError(
                          `details.ingredients.${index}.image`,
                          `File size exceeds ${MAX_FILE_SIZE_MB} MB.`
                        );
                        return;
                      }

                      const reader = new FileReader();
                      setFieldValue(`details.ingredients.${index}.image`, file);
                      reader.onloadend = () => {
                        // Set the preview image for the specific ingredient
                        setPreviewImages((prev) => ({
                          ...prev,
                          [index]: reader.result as string,
                        }));
                        setFieldError(
                          `details.ingredients.${index}.image`,
                          undefined
                        );
                      };
                      reader.readAsDataURL(file);
                    }
                  };

                  const handleRemoveImage = (event: React.MouseEvent) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setFieldValue(`details.ingredients.${index}.image`, null);
                    setFieldError(
                      `details.ingredients.${index}.image`,
                      undefined
                    );
                    setPreviewImages((prev) => {
                      const newPreviewImages = { ...prev };
                      delete newPreviewImages[index];
                      return newPreviewImages;
                    });

                    const inputElement = document.getElementById(
                      `details.ingredients.${index}.image-upload`
                    ) as HTMLInputElement | null;
                    if (inputElement) {
                      inputElement.value = "";
                    }
                  };

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: ingredientNameError
                          ? "self-start"
                          : "center",
                        marginBottom: 16,
                        backgroundColor: "#F9FDFE",
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                        gap: 8,
                      }}
                    >
                      <Form.Item style={{ marginBottom: "0px", width: "20%" }}>
                        <Box sx={Styles.fileUpload}>
                          <label
                            htmlFor={`details.ingredients.${index}.image-upload`}
                          >
                            {ingredient.image ? (
                              <Box sx={Styles.uploadedImageWrapper}>
                                <img
                                  src={
                                    previewImages[index] ||
                                    (ingredient.image as string)
                                  }
                                  alt="Uploaded"
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                  }}
                                />
                                <IconButton
                                  onClick={handleRemoveImage}
                                  sx={{
                                    position: "absolute",
                                    width: "25px",
                                    height: "25px",
                                    top: 40,
                                    right: 0,
                                    backgroundColor: "#A4755D",
                                    borderRadius: "50%",
                                    ":hover": { backgroundColor: "#A4755D" },
                                  }}
                                >
                                  <CloseIcon
                                    sx={{
                                      color: "white",
                                      fontSize: "1rem",
                                    }}
                                  />
                                </IconButton>
                              </Box>
                            ) : (
                              <Box sx={Styles.imageWrapper}>
                                <Box
                                  sx={{
                                    ...Styles.imageContainer,
                                    width: 60,
                                    height: 60,
                                  }}
                                >
                                  <img
                                    src={UploadIcon}
                                    alt="Upload Icon"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Box>
                              </Box>
                            )}
                          </label>

                          <VisuallyHiddenInput
                            id={`details.ingredients.${index}.image-upload`}
                            type="file"
                            onChange={handleImageUpload}
                            accept={ALLOWED_FILE_TYPES.join(",")}
                          />
                        </Box>
                        {ingredientImageError && (
                          <Typography
                            color="error"
                            variant="caption"
                            sx={Styles.imageError}
                          >
                            {ingredientImageError}
                          </Typography>
                        )}
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
                          placeholder={getString("ingredientNamePlaceHolder")}
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
                onClick={() => push({ id: "", name: "", price: 0, image: "" })}
                type="dashed"
                style={{ width: "100%", marginTop: 16 }}
              >
                {getString("addIngredientBtnLabel")}
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
      defaultActiveKey={["1"]}
    />
  );
};

export default IngredientPanel;
