/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid2,
  Typography,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ProductData } from "@dataTypes/ProductDataTypes";
import InputComponent from "@components/InputComponent/InputComponent";
import { itemType } from "@utils/dataTypeCheck";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as Yup from "yup";

interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: itemType) => void;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  initialData?: ProductData;
  data: ProductData[] | undefined;
}

const initialValues = {
  id: "",
  name: "",
  price: 0,
  details: {
    id: "",
    detailsDescription: "",
    variants: {
      name: "",
      variantList: [],
    },
    ingredients: [],
    extras: [],
  },
  isAvailable: true,
  image: "",
  uniqueProductOrderingName: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().min(0, "Price must be a positive number").required(),
  isAvailable: Yup.boolean().required(),
  uniqueProductOrderingName: Yup.string().required(
    "Unique ordering name is required"
  ),
});

const AddProductDialog = ({
  isDialogOpen: isOpen,
  dialogTitle: title,
  cancelText,
  confirmText,
  onConfirmClick,
  setDialogIsOpen,
  errorMessage,
  initialData,
  data,
}: AddProductDialogProps) => {
  const { t: getString } = useTranslation();
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted values", values);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <InputComponent
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && (errors.name as string)}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <InputComponent
                    label="Price"
                    id="price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <InputComponent
                    label="Unique Product Ordering Name"
                    id="uniqueProductOrderingName"
                    name="uniqueProductOrderingName"
                    type="text"
                    value={values.uniqueProductOrderingName}
                    onChange={handleChange}
                    error={
                      touched.uniqueProductOrderingName &&
                      Boolean(errors.uniqueProductOrderingName)
                    }
                    helperText={
                      touched.uniqueProductOrderingName &&
                      errors.uniqueProductOrderingName
                    }
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Typography variant="h6">Product Details</Typography>
                  <InputComponent
                    label="Details Description"
                    id="details.detailsDescription"
                    name="details.detailsDescription"
                    type="text"
                    value={values.details.detailsDescription}
                    onChange={handleChange}
                  />
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="variants-accordion-summary"
                      id="variants-accordion-summary"
                    >
                      <Typography variant="h6">Variants</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <InputComponent
                        label="Variants Name"
                        id="details.variants.name"
                        name="details.variants.name"
                        type="text"
                        value={values.details.variants.name}
                        onChange={handleChange}
                      />
                      <FieldArray name="details.variants.variantList">
                        {({ push, remove }) => (
                          <>
                            {values.details.variants.variantList.map(
                              (variant, index) => (
                                <Box key={index}>
                                  <InputComponent
                                    label="Variant Name"
                                    id={`details.variants.variantList.${index}.name`}
                                    name={`details.variants.variantList.${index}.name`}
                                    type="text"
                                    value={variant.name}
                                    onChange={handleChange}
                                  />
                                  <InputComponent
                                    label="Variant Price"
                                    id={`details.variants.variantList.${index}.price`}
                                    name={`details.variants.variantList.${index}.price`}
                                    type="number"
                                    value={variant.price}
                                    onChange={handleChange}
                                  />
                                  <Button onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </Box>
                              )
                            )}
                            <Button
                              onClick={() =>
                                push({ id: "", name: "", price: 0 })
                              }
                            >
                              Add Variant
                            </Button>
                          </>
                        )}
                      </FieldArray>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="ingredients-accordion-summary"
                      id="ingredients-accordion-summary"
                    >
                      {" "}
                      <Typography variant="h6">Ingredients</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FieldArray name="details.ingredients">
                        {({ push, remove }) => (
                          <>
                            {values.details.ingredients.map(
                              (ingredient, index) => (
                                <Box key={index}>
                                  <InputComponent
                                    label="ingredient Name"
                                    id={`details.ingredients.${index}.name`}
                                    name={`details.ingredients.${index}.name`}
                                    type="text"
                                    value={ingredient.name}
                                    onChange={handleChange}
                                  />
                                  <InputComponent
                                    label="Variant Price"
                                    id={`details.ingredients.${index}.price`}
                                    name={`details.ingredients.${index}.price`}
                                    type="number"
                                    value={ingredient.price}
                                    onChange={handleChange}
                                  />
                                  <Button onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </Box>
                              )
                            )}
                            <Button
                              onClick={() =>
                                push({ id: "", name: "", price: 0 })
                              }
                            >
                              Add Ingredient
                            </Button>
                          </>
                        )}
                      </FieldArray>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="extras-accordion-summary"
                      id="extras-accordion-summary"
                    >
                      <Typography variant="h6">Extras</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FieldArray name="details.extras">
                        {({ push, remove }) => (
                          <>
                            {values.details.extras.map((ingredient, index) => (
                              <Box key={index}>
                                <InputComponent
                                  label="extras Name"
                                  id={`details.extras.${index}.name`}
                                  name={`details.extras.${index}.name`}
                                  type="text"
                                  value={ingredient.name}
                                  onChange={handleChange}
                                />
                                <InputComponent
                                  label="extras Price"
                                  id={`details.extras.${index}.price`}
                                  name={`details.extras.${index}.price`}
                                  type="number"
                                  value={ingredient.price}
                                  onChange={handleChange}
                                />
                                <Button onClick={() => remove(index)}>
                                  Remove
                                </Button>
                              </Box>
                            ))}
                            <Button
                              onClick={() =>
                                push({ id: "", name: "", price: 0 })
                              }
                            >
                              Add extras
                            </Button>
                          </>
                        )}
                      </FieldArray>
                    </AccordionDetails>
                  </Accordion>
                </Grid2>
              </Grid2>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
