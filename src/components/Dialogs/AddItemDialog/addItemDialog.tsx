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
import { useState } from "react";
import {
  UserUiPreferences,
  ViewType,
} from "../../../DataTypes/RestaurantObject";
import InputComponent from "../../InputComponent/InputComponent";
import FileUploadComponent from "./fileUploadComponent"; // Adjust the import path
import { Styles } from "./addItemDialog.styles";

interface AddItemDialogProps {
  isOpen: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (data: {
    name: string;
    userUiPreferences: UserUiPreferences;
    categoryType: string;
    image: ArrayBuffer | null;
  }) => void;
  onCancelClick: () => void;
  fileUpload?: boolean;
}

interface DialogData {
  name: string;
  userUiPreferences: UserUiPreferences;
  image: ArrayBuffer | null;
  categoryType: string;
  table: [];
}

const AddItemDialog = ({
  isOpen,
  title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  errorMessage,
  fileUpload,
}: AddItemDialogProps) => {
  const [dialogData, setDialogData] = useState<DialogData>({
    name: "",
    image: null,
    userUiPreferences: {
      primaryColor: "",
      secondaryColor: "",
      fontType: "",
      categoryShape: "",
      contactLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
      ingredientViewType: ViewType.GRID,
      itemsViewType: ViewType.GRID,
    },
    table: [],
    categoryType: "",
  });

  const [showError, setShowError] = useState<boolean>(false);
  const [showCategoryError, setShowCategoryError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleConfirm = () => {
    console.log(dialogData);
    let hasError = false;

    if (hasError) {
      return;
    }

    onConfirmClick(dialogData);
    handleCancel();
  };

  const handleCancel = () => {
    // setDialogData({
    //   ...dialogData,
    //   image: null,
    // });
    setDialogData((prevState) => ({
      name: prevState.name,
      image: prevState.image,
      userUiPreferences: prevState.userUiPreferences,
      categoryType: prevState.categoryType,
    }));
    setImageError(null);
    setShowError(false);
    setShowCategoryError(false);
    onCancelClick();
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: fileUpload ? "56.25rem" : "36.25rem",
          height: fileUpload ? "37.5rem" : "17.5rem",
        },
      }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      {fileUpload && (
        <FileUploadComponent
          image={dialogData.image}
          onImageChange={(image) =>
            setDialogData({ ...dialogData, image: image })
          }
          error={imageError}
          setError={setImageError}
        />
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
              name: e.target.value.trim(),
            });
            if (e.target.value.trim().length !== 0) {
              setShowError(false);
            } else {
              setShowError(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
            }
          }}
          value={dialogData.name}
          error={showError}
          helperText={showError ? errorMessage : " "}
        />
      </Box>
      {fileUpload && (
        <FormControl sx={{ marginTop: 1 }}>
          <FormLabel
            focused={false}
            id="category-type-radio-buttons-group-label"
          >
            Category type
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
              setShowCategoryError(false);
            }}
          >
            <FormControlLabel
              value="Food"
              control={
                <Radio
                  sx={{
                    color: showCategoryError
                      ? "#d32f2f"
                      : "var(--primary-color)",
                  }}
                />
              }
              label="Food"
              sx={{ width: "fit-content" }}
            />
            <FormControlLabel
              value="Drinks"
              control={
                <Radio
                  sx={{
                    color: showCategoryError
                      ? "#d32f2f"
                      : "var(--primary-color)",
                  }}
                />
              }
              label="Drinks"
              sx={{ width: "fit-content" }}
            />
          </RadioGroup>
        </FormControl>
      )}
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

export default AddItemDialog;
