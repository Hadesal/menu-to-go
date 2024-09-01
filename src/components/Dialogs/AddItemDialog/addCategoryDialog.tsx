import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "./addItemDialog.styles";
import FileUploadComponent from "./fileUploadComponent";
import { CategoryData } from "../../../DataTypes/CategoryDataTypes";
import { useTranslation } from "react-i18next";

interface AddCategoryDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: CategoryData) => void;
  onCancelClick: () => void;
  initialData?: CategoryData;
  data?: object[];
}

const AddCategoryDialog = ({
  isDialogOpen: isOpen,
  dialogTitle: title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  errorMessage,
  initialData,
  data,
}: AddCategoryDialogProps) => {
  const [dialogData, setDialogData] = useState<CategoryData>({
    name: "",
    image: null,
    categoryType: "",
  });

  const [showError, setShowError] = useState<boolean>(false);
  const [showCategoryError, setShowCategoryError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [isDataUnchanged, setIsDataUnchanged] = useState<boolean>(false);
  const { t } = useTranslation();
  const getString = t;
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData({
        name: initialData.name,
        image: initialData.image,
        categoryType: initialData.categoryType,
      });
    }
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    let hasError = false;

    if (dialogData.name.length === 0) {
      setShowError(true);
      hasError = true;
    }

    if (dialogData.categoryType.length === 0) {
      setShowCategoryError(true);
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

    if (hasError) {
      return;
    }

    if (
      initialData &&
      dialogData.name === initialData.name &&
      dialogData.categoryType === initialData.categoryType &&
      dialogData.image === initialData.image
    ) {
      setIsDataUnchanged(true);
      return;
    }

    onConfirmClick(dialogData);
    handleCancel();
  };

  const handleCancel = () => {
    if (!initialData) {
      setDialogData({
        name: "",
        image: null,
        categoryType: "",
      });
    }
    setImageError(null);
    setShowError(false);
    setShowCategoryError(false);
    setIsDataUnchanged(false);
    setIsNameDuplicate(false);
    onCancelClick();
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "56.25rem",
          height: isDataUnchanged ? "39.5rem" : "36.5rem",
        },
      }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <FileUploadComponent
        image={dialogData.image}
        onImageChange={(image) => {
          setDialogData({ ...dialogData, image: image });
          setIsDataUnchanged(initialData ? image === initialData.image : false);
        }}
        error={imageError}
        setError={setImageError}
      />
      {isDataUnchanged && (
        <Alert sx={{ marginTop: 3 }} severity="error">
          No updates detected. Please modify the category to update.
        </Alert>
      )}
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel sx={Styles.textFieldLabelStyle}>Name</InputLabel>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          required
          textFieldStyle={Styles.textFieldStyle}
          InputPropStyle={Styles.inputPropStyle}
          onChange={(e) => {
            setDialogData({
              ...dialogData,
              name: e.target.value,
            });
            setShowError(e.target.value.trim().length === 0);
            setIsNameDuplicate(false);
            setIsDataUnchanged(
              initialData ? e.target.value === initialData.name : false
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
            }
          }}
          value={dialogData.name}
          error={showError || isNameDuplicate}
          helperText={
            showError
              ? errorMessage
              : isNameDuplicate
              ? "A category with the same name already exists"
              : ""
          }
        />
      </Box>
      <FormControl sx={{ marginTop: 1 }}>
        <FormLabel focused={false} id="category-type-radio-buttons-group-label">
          {getString("categoryTypeTitle")}
        </FormLabel>
        <RadioGroup
          aria-labelledby="category-type-radio-buttons-group-label"
          name="category-type-radio-buttons-group"
          value={dialogData.categoryType}
          onChange={(e) => {
            setDialogData({
              ...dialogData,
              categoryType: e.target.value,
            });
            setIsDataUnchanged(
              initialData ? e.target.value === initialData.categoryType : false
            );
            setShowCategoryError(false);
          }}
        >
          <FormControlLabel
            value="Food"
            control={
              <Radio
                sx={{
                  color: showCategoryError ? "#d32f2f" : "var(--primary-color)",
                }}
              />
            }
            label={getString("categoryTypeFood")}
            sx={{ width: "fit-content" }}
          />
          <FormControlLabel
            value="Drinks"
            control={
              <Radio
                sx={{
                  color: showCategoryError ? "#d32f2f" : "var(--primary-color)",
                }}
              />
            }
            label={getString("categoryTypeDrink")}
            sx={{ width: "fit-content" }}
          />
        </RadioGroup>
      </FormControl>
      <DialogContent sx={Styles.dialogContent}>
        <Box sx={Styles.actionBox}>
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

export default AddCategoryDialog;
