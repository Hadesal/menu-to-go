/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExtrasData,
  IngredientData,
  ProductData,
} from "@dataTypes/ProductDataTypes";
import InputComponent from "../../InputComponent/InputComponent";
import ProductDetailsAccordion from "../ProductDetailsAccordion/ProductDetailsAccordion";
import { Styles } from "./addItemDialog.styles";
import FileUploadComponent from "./fileUploadComponent";
import { handleCancel, handleConfirm } from "../helpers/handlers";
import { itemsType } from "@utils/dataTypeCheck";
import { productDefaultData } from "@constants/constants";
import {
  handleExtrasChange,
  handleIngredientsChange,
  handleVariantsChange,
} from "../helpers/dialogDataHandlers";
interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: itemsType) => void;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  initialData?: ProductData;
  data: ProductData[] | undefined;
}

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
  const [dialogData, setDialogData] = useState<ProductData>(productDefaultData);

  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showPriceError, setShowPriceError] = useState<boolean>(false);
  const [showDescriptionError, setShowDescriptionError] =
    useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [isDataUnchanged, setIsDataUnchanged] = useState<boolean>(false);
  const { t } = useTranslation();
  const getString = t;

  const [extrasErrors, setExtrasErrors] = useState<
    { nameError: boolean; priceError?: boolean; index: number }[]
  >([]);
  const [ingredientsErrors, setIngredientsErrors] = useState<
    { nameError: boolean; index: number }[]
  >([]);
  const [variantsErrors, setVariantsErrors] = useState<
    { nameError: boolean; index: number }[]
  >([]);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData(initialData);
    }
  }, [initialData, isOpen]);

  const handleOnConfirm = () => {
    handleConfirm(
      dialogData,
      {
        setShowNameError,
        setShowDescriptionError,
        setVariantsErrors,
        setExtrasErrors,
        setIngredientsErrors,
        setIsDataUnchanged,
        setIsNameDuplicate,
        setShowPriceError,
      },
      onConfirmClick,
      setDialogData,
      setDialogIsOpen,
      "product",
      data,
      initialData
    );
  };

  const handleOnCancel = () => {
    handleCancel(
      setDialogData,
      "product",
      setDialogIsOpen,
      {
        setImageError,
        setShowNameError,
        setShowPriceError,
        setIsDataUnchanged,
        setShowDescriptionError,
        setIsNameDuplicate,
        setExtrasErrors,
        setIngredientsErrors,
        setVariantsErrors,
      },
      initialData
    );
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "56.25rem",
          maxHeight: "90vh",
        },
      }}
      onClose={handleOnCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <FileUploadComponent
        image={dialogData.image}
        onImageChange={(image) =>
          setDialogData({ ...dialogData, image: image ? image : "" })
        }
        error={imageError}
        setError={setImageError}
      />
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel required={true} sx={Styles.textFieldLabelStyle}>
          Name
        </InputLabel>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          required
          textFieldStyle={Styles.textFieldStyle}
          InputPropStyle={Styles.inputPropStyle}
          onChange={(e) => {
            setDialogData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }));
            setShowNameError(e.target.value.trim().length === 0);
            setIsNameDuplicate(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOnConfirm();
            }
          }}
          value={dialogData.name}
          error={showNameError || isDataUnchanged || isNameDuplicate}
          helperText={
            showNameError
              ? errorMessage
              : isDataUnchanged
              ? "Data is unchanged"
              : isNameDuplicate
              ? "A product with the same name already exists"
              : ""
          }
        />
      </Box>
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel required={true} sx={Styles.textFieldLabelStyle}>
          Price
        </InputLabel>
        <InputComponent
          id="priceField"
          type="Number"
          label=""
          required
          textFieldStyle={Styles.textFieldStyle}
          InputPropStyle={Styles.inputPropStyle}
          onChange={(e) => {
            setDialogData((prevData) => ({
              ...prevData,
              price: parseInt(e.target.value),
            }));
            setShowPriceError(
              e.target.value === "" || parseInt(e.target.value) <= 0
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOnConfirm();
            }
          }}
          value={dialogData.price === 0 ? "" : dialogData.price}
          error={showPriceError || isDataUnchanged}
          helperText={
            showPriceError
              ? "Please enter product price"
              : isDataUnchanged
              ? "Data is unchanged"
              : " "
          }
        />
      </Box>
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel required={true} sx={Styles.textFieldLabelStyle}>
          Description
        </InputLabel>
        <TextField
          id="description"
          multiline
          required
          rows={8}
          sx={Styles.textArea}
          variant="outlined"
          value={dialogData.details.detailsDescription}
          onChange={(e) => {
            setDialogData((prevData) => ({
              ...prevData,
              details: {
                ...prevData.details,
                detailsDescription: e.target.value,
              },
            }));
          }}
          error={showDescriptionError || isDataUnchanged}
          helperText={
            showDescriptionError
              ? "Please enter product description"
              : isDataUnchanged
              ? "Data is unchanged"
              : " "
          }
        />
      </Box>

      <ProductDetailsAccordion
        accordionTitle="Ingredients"
        namePlaceHolder="Ingredient name"
        onItemsChange={(ingredients) => {
          ingredients.map((val) => {
            handleIngredientsChange(setDialogData, val as IngredientData);
          });
        }}
        errors={ingredientsErrors}
        initialDataList={dialogData.details.ingredients}
        isVariant={false}
      />
      <ProductDetailsAccordion
        accordionTitle="Variants"
        showPrice={true}
        namePlaceHolder="Variant name"
        onVariantsChange={(variants) => {
          variants.variants.map((variant) => {
            handleVariantsChange(setDialogData, variant);
          });
        }}
        errors={variantsErrors}
        isVariant={true}
        initialDataName={dialogData.details.variants?.name}
        initialDataList={dialogData.details.variants?.variantList}
      />
      <ProductDetailsAccordion
        accordionTitle="Extras"
        showPrice={true}
        namePlaceHolder="Extras name"
        onItemsChange={(extras) => {
          extras.map((extra) => {
            handleExtrasChange(setDialogData, extra as ExtrasData);
          });
        }}
        errors={extrasErrors}
        initialDataList={dialogData.details.extras}
        isVariant={false}
      />

      <DialogContent sx={Styles.dialogContent}>
        <Box sx={{ ...Styles.actionBox, padding: "1rem" }}>
          <Button
            variant="outlined"
            onClick={() => {
              handleOnCancel();
            }}
            sx={Styles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={handleOnConfirm}
            sx={Styles.logoutButton}
          >
            {confirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
