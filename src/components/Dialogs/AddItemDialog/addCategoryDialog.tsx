import {
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

  useEffect(() => {
    if (initialData) {
      setDialogData({
        name: initialData.name,
        image: initialData.image,
        categoryType: initialData.categoryType,
      });
    }
  }, [initialData]);

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

    if (hasError) {
      return;
    }

    if (
      initialData &&
      dialogData.name === initialData.name &&
      dialogData.categoryType === initialData.categoryType
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
    onCancelClick();
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "56.25rem",
          height: "37.5rem",
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
          error={showError || isDataUnchanged}
          helperText={
            showError
              ? errorMessage
              : isDataUnchanged
              ? "Data is unchanged"
              : " "
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
              initialData ? e.target.value === initialData.name : false
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
