import InputComponent from "@components/InputComponent/InputComponent";
import { categoryDefaultData } from "@constants/constants";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import InfoIcon from "@mui/icons-material/Info";
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
  Tooltip,
} from "@mui/material";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useLanguage } from "src/hooks/useLanguage";
import {
  handleCategoryCancel,
  handleCategoryConfirm,
} from "../helpers/addCategoryValidators";
import { Styles } from "./addItemDialog.styles";
import FileUploadComponent from "./fileUploadComponent";

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
  const [dialogData, setDialogData] = useState<CategoryData>(
    initialData || categoryDefaultData
  );
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showCategoryError, setShowCategoryError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const { getString, currentLanguage } = useLanguage();
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);
  const MAXCHARSLENGTH = 35;
  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData(initialData);
    }
  }, [isOpen, initialData]);

  const handleOnConfirm = () => {
    handleCategoryConfirm(
      dialogData,
      {
        setShowNameError,
        setShowCategoryError,
        setIsNameDuplicate,
        setImageError,
      },
      onConfirmClick as (item: CategoryData) => void,
      handleOnCancel,
      data,
      initialData
    );
  };

  const handleOnCancel = () => {
    return handleCategoryCancel(
      setDialogData,
      categoryDefaultData,
      onCancelClick,
      {
        setImageError,
        setShowNameError,
        setShowCategoryError,
        setIsNameDuplicate,
      },
      initialData
    );
  };

  return (
    <Dialog
      dir={currentLanguage === "ar" ? "rtl" : ""}
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "56.25rem",
          height: "36.5rem",
        },
      }}
      onClose={(_, reason) => {
        if (reason && reason === "backdropClick") return;
        handleOnCancel();
      }}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <FileUploadComponent
        image={dialogData.image as string}
        onImageChange={(image) => {
          setDialogData({ ...dialogData, image });
        }}
        error={imageError}
        setError={setImageError}
      />
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel sx={Styles.textFieldLabelStyle}>
          {getString("nameInputLabel")}
        </InputLabel>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          currentLanguage={currentLanguage}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FormLabel
            focused={false}
            id="category-type-radio-buttons-group-label"
          >
            {getString("categoryTypeTitle")}
          </FormLabel>
          <Tooltip
            dir={currentLanguage === "ar" ? "rtl" : ""}
            arrow
            placement={currentLanguage === "ar" ? "left-start" : "right-start"}
            title={getString("categoryTypeInfo")}
          >
            <InfoIcon
              sx={{ color: "var(--primary-color)", fontSize: "1.2rem" }}
            />
          </Tooltip>
        </Box>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormControlLabel
              value={"food"}
              control={
                <Radio
                  sx={{
                    color: showCategoryError
                      ? "#d32f2f"
                      : "var(--primary-color)",
                  }}
                />
              }
              label={getString("categoryTypeFood")}
              sx={{ width: "fit-content", marginRight: 0 }}
            />
            <LunchDiningIcon
              sx={{ color: "var(--primary-color)", fontSize: "1.2rem" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormControlLabel
              value={"drinks"}
              control={
                <Radio
                  sx={{
                    color: showCategoryError
                      ? "#d32f2f"
                      : "var(--primary-color)",
                  }}
                />
              }
              label={getString("categoryTypeDrink")}
              sx={{ width: "fit-content", marginRight: 0 }}
            />
            <LocalBarIcon
              sx={{ color: "var(--primary-color)", fontSize: "1.2rem" }}
            />
          </Box>
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
          <Box sx={Styles.buttonWrapper(isEqual(dialogData, initialData))}>
            <Button
              variant="contained"
              onClick={handleOnConfirm}
              sx={Styles.addBtn}
              disabled={
                isEqual(categoryDefaultData, dialogData) ||
                isEqual(dialogData, initialData)
              }
            >
              {confirmText}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
