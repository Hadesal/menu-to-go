import InputComponent from "@components/InputComponent/InputComponent";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { itemType } from "@utils/dataTypeCheck";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Styles } from "./addItemDialog.styles";
import { useLanguage } from "src/hooks/useLanguage";
import { useAppSelector } from "@redux/reduxHooks";

interface AddAddRestaurantDialogProps {
  isOpen: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (data: itemType) => void;
  onCancelClick: Dispatch<SetStateAction<boolean>>;
  initialData?: RestaurantData;
  data?: RestaurantData[];
}
interface ErrorFlags {
  showNameError: boolean;
  isNameDuplicate: boolean;
  isNameUnchanged: boolean;
  imageError: string | null;
}

const AddRestaurantDialog = ({
  isOpen,
  title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  errorMessage,
  initialData,
  data,
}: AddAddRestaurantDialogProps) => {
  const { getString, currentLanguage } = useLanguage();
  const { user } = useAppSelector((state) => state.userData);
  const [dialogData, setDialogData] = useState<
    Omit<RestaurantData, "userUiPreferences">
  >({
    name: "",
    categories: [],
    tables: [],
    currency: "",
  });

  const [errorFlags, setErrorFlags] = useState<ErrorFlags>({
    showNameError: false,
    isNameDuplicate: false,
    isNameUnchanged: false,
    imageError: null,
  });
  const MAXCHARSLENGTH = 25;
  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData((prev) => ({ ...prev, name: initialData.name }));
      setErrorFlags({
        showNameError: false,
        isNameDuplicate: false,
        isNameUnchanged: false,
        imageError: null,
      });
    } else if (!isOpen) {
      // Reset form when dialog is closed
      setDialogData({
        name: "",
        categories: [],
        tables: [],
        currency: "",
      });
      setErrorFlags({
        showNameError: false,
        isNameDuplicate: false,
        isNameUnchanged: false,
        imageError: null,
      });
    }
  }, [isOpen, initialData]);

  /**
   * validateRestaurant
   * Validates the restaurant name.
   */
  const validateRestaurant = (): boolean => {
    let hasError = false;
    const trimmedName = dialogData.name.trim();

    // Reset previous error flags
    setErrorFlags((prev) => ({
      ...prev,
      showNameError: false,
      isNameDuplicate: false,
      isNameUnchanged: false,
      imageError: null,
    }));

    // 1. Check if name is empty
    if (trimmedName.length === 0) {
      setErrorFlags((prev) => ({ ...prev, showNameError: true }));
      hasError = true;
    }

    // 2. Check if name is unchanged (if editing)
    if (initialData && trimmedName === initialData.name) {
      setErrorFlags((prev) => ({ ...prev, isNameUnchanged: true }));
      hasError = true;
    }

    // 3. Check for duplicate name
    const lowerCaseName = trimmedName.toLowerCase();
    if ((data ?? []).length > 0) {
      const duplicate = data?.some(
        (restaurant) =>
          restaurant.name.trim().toLowerCase() === lowerCaseName &&
          restaurant.id !== initialData?.id // Exclude current restaurant in edit mode
      );

      if (duplicate) {
        setErrorFlags((prev) => ({ ...prev, isNameDuplicate: true }));
        hasError = true;
      }
    }

    return hasError;
  };

  /**
   * handleConfirm
   * Handles the confirm action with validation.
   */
  const handleConfirm = () => {
    const hasError = validateRestaurant();

    if (hasError) {
      return;
    }

    // Proceed with confirmation
    onConfirmClick({ ...dialogData, currency: user.currency || "" });
    handleCancel();
  };

  /**
   * handleCancel
   * Handles the cancel action by resetting the form and closing the dialog.
   */
  const handleCancel = () => {
    if (!initialData) {
      setDialogData({
        name: "",
        categories: [],
        tables: [],
        currency: "",
      });
    } else {
      setDialogData({
        name: initialData.name,
        categories: initialData.categories,
        tables: initialData.tables,
        currency: initialData.currency,
      });
    }

    // Reset error flags
    setErrorFlags({
      showNameError: false,
      isNameDuplicate: false,
      isNameUnchanged: false,
      imageError: null,
    });

    // Close the dialog
    onCancelClick(false);
  };

  return (
    <Dialog
      dir={currentLanguage === "ar" ? "rtl" : ""}
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "36.25rem",
          height: "17.5rem",
        },
      }}
      onClose={(_, reason) => {
        if (reason && reason === "backdropClick") return;
        handleCancel();
      }}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel sx={Styles.textFieldLabelStyle}>
          {getString("nameInputLabel")}
        </InputLabel>
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
            setErrorFlags((prev) => ({
              ...prev,
              showNameError: e.target.value.trim().length === 0,
              isNameDuplicate: false,
              isNameUnchanged: initialData
                ? e.target.value === initialData.name
                : false,
            }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
            }
          }}
          value={dialogData.name}
          error={
            errorFlags.showNameError ||
            errorFlags.isNameUnchanged ||
            errorFlags.isNameDuplicate
          }
          MAXCHARSLENGTH={MAXCHARSLENGTH}
          helperText={
            errorFlags.showNameError
              ? errorMessage
              : errorFlags.isNameUnchanged
              ? "Name is unchanged"
              : errorFlags.isNameDuplicate
              ? "A restaurant with the same name already exists"
              : `${dialogData.name.length}/${MAXCHARSLENGTH}`
          }
        />
      </Box>
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

export default AddRestaurantDialog;
