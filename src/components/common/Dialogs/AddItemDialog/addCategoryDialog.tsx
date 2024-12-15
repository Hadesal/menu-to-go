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
import InputComponent from "@components/InputComponent/InputComponent";
import { Styles } from "./addItemDialog.styles";
import FileUploadComponent from "./fileUploadComponent";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { useTranslation } from "react-i18next";
import { handleCancel, handleConfirm } from "../helpers/handlers";
import { categoryDefaultData } from "@constants/constants";
import { itemType } from "@utils/dataTypeCheck";

interface AddCategoryDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (item: CategoryData) => void;
  onCancelClick: () => void;
  initialData?: CategoryData;
  data?: CategoryData[];
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
  const [dialogData, setDialogData] =
    useState<CategoryData>(categoryDefaultData);
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showCategoryError, setShowCategoryError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isDataUnchanged, setIsDataUnchanged] = useState<boolean>(false);
  const { t } = useTranslation();
  const getString = t;
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);
  const MAXCHARSLENGTH = 20;
  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData(initialData);
    }
  }, [isOpen, initialData]);

  const handleOnConfirm = () => {
    handleConfirm(
      dialogData,
      {
        setShowNameError,
        setShowCategoryError,
        setIsDataUnchanged,
        setIsNameDuplicate,
        setImageError,
      },
      handleOnCancel,
      onConfirmClick as (item: itemType) => void,
      data,
      initialData
    );
  };

  const handleOnCancel = () => {
    return handleCancel(
      setDialogData,
      "category",
      onCancelClick,
      {
        setImageError,
        setShowNameError,
        setShowCategoryError,
        setIsDataUnchanged,
        setIsNameDuplicate,
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
          height: isDataUnchanged ? "39.5rem" : "36.5rem",
        },
      }}
      onClose={handleOnCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <FileUploadComponent
        image={dialogData.image}
        onImageChange={(image) => {
          setDialogData({ ...dialogData, image });
          setIsDataUnchanged(initialData ? image === initialData.image : false);
        }}
        error={imageError}
        setError={setImageError}
      />
      {isDataUnchanged && (
        <Alert sx={{ marginTop: 3 }} severity="error">
          {getString("dataUnchangedMessage")}
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
            setShowNameError(e.target.value.trim().length === 0);
            setIsNameDuplicate(false);
            setIsDataUnchanged(
              initialData ? e.target.value === initialData.name : false
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOnConfirm();
            }
          }}
          value={dialogData.name}
          error={showNameError || isNameDuplicate}
          MAXCHARSLENGTH={MAXCHARSLENGTH}
          helperText={
            showNameError
              ? errorMessage
              : isNameDuplicate
              ? getString("categoryWithSameNameMessage")
              : `${dialogData.name.length}/${MAXCHARSLENGTH}`
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
            value={getString("food").toLocaleLowerCase()}
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
            value={getString("drinks").toLocaleLowerCase()}
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
            onClick={handleOnCancel}
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

export default AddCategoryDialog;
