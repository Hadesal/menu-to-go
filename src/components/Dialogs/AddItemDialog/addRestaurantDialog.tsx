import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "./addItemDialog.styles";
import { addRestaurantData } from "../../../DataTypes/RestaurantObject";

interface AddAddRestaurantDialogProps {
  isOpen: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (data: addRestaurantData) => void;
  onCancelClick: () => void;
  initialData?: { name: string };
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
}: AddAddRestaurantDialogProps) => {
  const [dialogData, setDialogData] = useState<addRestaurantData>({ name: "" });

  const [showError, setShowError] = useState<boolean>(false);
  const [isNameUnchanged, setIsNameUnchanged] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setDialogData({ name: initialData.name });
    }
  }, [initialData]);

  const handleConfirm = () => {
    if (dialogData.name.length === 0) {
      setShowError(true);
      return;
    }

    if (initialData && dialogData.name === initialData.name) {
      setIsNameUnchanged(true);
      return;
    }

    onConfirmClick(dialogData);
    handleCancel();
  };

  const handleCancel = () => {
    if (!initialData) {
      setDialogData({
        name: "",
      });
    }
    setShowError(false);
    setIsNameUnchanged(false);
    onCancelClick();
  };

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: "36.25rem",
          height: "17.5rem",
        },
      }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
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
            setIsNameUnchanged(
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
          error={showError || isNameUnchanged}
          helperText={
            showError
              ? errorMessage
              : isNameUnchanged
              ? "Name is unchanged"
              : " "
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
