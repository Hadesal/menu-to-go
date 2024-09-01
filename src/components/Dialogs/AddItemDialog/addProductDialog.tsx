import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductData } from "../../../DataTypes/ProductDataTypes";
import InputComponent from "../../InputComponent/InputComponent";
import ProductDetailsAccordion from "../ProductDetailsAccordion/ProductDetailsAccordion";
import { Styles } from "./addItemDialog.styles";
import FileUploadComponent from "./fileUploadComponent";
interface AddProductDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: ProductData) => void;
  onCancelClick: () => void;
  initialData?: ProductData;
  data: object[];
}

const AddProductDialog = ({
  isDialogOpen: isOpen,
  dialogTitle: title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  errorMessage,
  initialData,
  data,
}: AddProductDialogProps) => {
  const [dialogData, setDialogData] = useState<ProductData>({
    name: "",
    price: 0,
    details: {
      detailsDescription: "",
      extras: [],
      ingredients: [],
      variants: {
        name: "",
        variantList: [],
      },
    },
    isAvailable: true,
    image: null,
    uniqueProductOrderingName: "",
  });

  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showPriceError, setShowPriceError] = useState<boolean>(false);
  const [showDescriptionError, setShowDescriptionError] =
    useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [isDataUnchanged, setIsDataUnchanged] = useState<boolean>(false);
  const { t } = useTranslation();
  const getString = t;

  const [extrasErrors, setExtrasErrors] = useState<
    { nameError: boolean; priceError: boolean; index: number }[]
  >([]);
  const [ingredientsErrors, setIngredientsErrors] = useState<
    { nameError: boolean; index: number }[]
  >([]);
  const [variantsErrors, setVariantsErrors] = useState<
    { nameError: boolean; index: number }[]
  >([]);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setDialogData({
        name: initialData.name,
        price: initialData.price,
        details: {
          detailsDescription: initialData.details.detailsDescription,
          extras: initialData.details.extras,
          ingredients: initialData.details.ingredients,
          variants: initialData.details.variants,
        },
        isAvailable: initialData.isAvailable,
        image: initialData.image,
        uniqueProductOrderingName: initialData.uniqueProductOrderingName,
      });
    }
  }, [initialData]);

  const handleConfirm = () => {
    let hasError = false;

    if (dialogData.name.length === 0) {
      setShowNameError(true);
      hasError = true;
    }

    // Check if the name already exists in the data
    if (data) {
      if (initialData?.name !== dialogData.name) {
        const existingItem = data.find(
          (item) =>
            dialogData.name.toLocaleLowerCase() ===
            item.name.toLocaleLowerCase()
        );
        if (existingItem) {
          setIsNameDuplicate(true); // Set duplicate flag
          hasError = true;
        }
      }
    }

    if (dialogData.price === 0) {
      setShowPriceError(true);
      hasError = true;
    }

    if (dialogData.details.detailsDescription.trim().length === 0) {
      setShowDescriptionError(true);
    }

    dialogData.details.ingredients.forEach((ingredient, index) => {
      const errorObject = {
        nameError: false,
        index: index,
      };

      if (ingredient.name.length === 0) {
        errorObject.nameError = true;
      }
      if (errorObject.nameError) {
        hasError = true;
        setIngredientsErrors((prevState) => [...prevState, errorObject]);
      }
    });

    dialogData.details.extras.forEach((extra, index) => {
      const errorObject = {
        nameError: false,
        priceError: false,
        index: index,
      };

      if (extra.name.length === 0) {
        errorObject.nameError = true;
      }

      if (extra.price <= 0) {
        errorObject.priceError = true;
      }

      if (errorObject.nameError || errorObject.priceError) {
        hasError = true;
        setExtrasErrors((prevState) => [...prevState, errorObject]);
      }
    });

    if (
      dialogData.details.variants.name.length === 0 &&
      dialogData.details.variants.variantList.length > 0
    ) {
      hasError = true;
      console.log("Variant name cannot be empty");
    }

    dialogData.details.variants.variantList.forEach((variant, index) => {
      const errorObject = {
        nameError: false,
        priceError: false,
        index: index,
      };

      if (variant.name.length === 0) {
        errorObject.nameError = true;
      }

      if (variant.price <= 0) {
        errorObject.priceError = true;
      }

      if (errorObject.nameError || errorObject.priceError) {
        hasError = true;
        setVariantsErrors((prevState) => [...prevState, errorObject]);
      }
    });

    if (hasError) {
      return;
    }

    // if (initialData && dialogData.name === initialData.name) {
    //   setIsDataUnchanged(true);
    //   return;
    // }

    onConfirmClick(dialogData);
    handleCancel();
  };

  const handleCancel = () => {
    if (!initialData) {
      setDialogData({
        name: "",
        price: 0,
        details: {
          detailsDescription: "",
          extras: [],
          ingredients: [],
          variants: {
            name: "",
            variantList: [],
          },
        },
        isAvailable: true,
        image: null,
        uniqueProductOrderingName: "",
      });
    }
    setImageError(null);
    setShowNameError(false);
    setShowPriceError(false);
    setIsDataUnchanged(false);
    setShowDescriptionError(false);
    setIsNameDuplicate(false);
    setExtrasErrors([]);
    setIngredientsErrors([]);
    setVariantsErrors([]);
    onCancelClick();
  };

  const handleExtrasChange = (
    extras: { name: string; price?: number; image?: string | null }[]
  ) => {
    setDialogData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        extras: extras.map((extra) => ({
          ...extra,
          price: extra.price ?? 0,
        })),
      },
    }));
  };

  const handleIngredientsChange = (
    ingredients: { name: string; price?: number; image?: string | null }[]
  ) => {
    setDialogData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        ingredients: ingredients.map((ingredient) => ({
          ...ingredient,
          image: ingredient.image ?? "",
        })),
      },
    }));
  };
  const handleVariantsChange = (variants: {
    name: string;
    variants: { name: string; price?: number; image?: string | null }[];
  }) => {
    setDialogData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        variants: {
          name: variants.name,
          variantList: variants.variants.map((variant) => ({
            ...variant,
            price: variant.price ?? 0,
          })),
        },
      },
    }));
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "56.25rem",
          maxHeight: "90vh", // Limit the height
        },
      }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <FileUploadComponent
        image={dialogData.image}
        onImageChange={(image) =>
          setDialogData({ ...dialogData, image: image })
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
            // setIsDataUnchanged(
            //   initialData ? e.target.value.trim() === initialData.name : false
            // );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
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
            // setIsDataUnchanged(
            //   initialData
            //     ? parseInt(e.target.value.trim()) === initialData.price
            //     : false
            // );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
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

            // setIsDataUnchanged(
            //   initialData
            //     ? e.target.value.trim() ===
            //         initialData.details.detailsDescription
            //     : false
            // );
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
        onItemsChange={handleIngredientsChange}
        errors={ingredientsErrors}
        initialDataList={dialogData.details.ingredients}
        isVariant={false}
      />
      <ProductDetailsAccordion
        accordionTitle="Variants"
        showPrice={true}
        namePlaceHolder="Variant name"
        onVariantsChange={handleVariantsChange}
        errors={variantsErrors}
        isVariant={true}
        initialDataName={dialogData.details.variants?.name}
        initialDataList={dialogData.details.variants?.variantList}
      />
      <ProductDetailsAccordion
        accordionTitle="Extras"
        showPrice={true}
        namePlaceHolder="Extras name"
        onItemsChange={handleExtrasChange}
        errors={extrasErrors}
        initialDataList={dialogData.details.extras}
        isVariant={false}
      />

      <DialogContent sx={Styles.dialogContent}>
        <Box sx={{ ...Styles.actionBox, padding: "1rem" }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={Styles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
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
