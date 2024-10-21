import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputComponent from "@components/InputComponent/InputComponent";
import { Styles } from "./addItemDialog.styles";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { handleConfirm } from "../helpers/handlers";
import { itemsType } from "@utils/dataTypeCheck";

interface AddAddRestaurantDialogProps {
  isOpen: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (data: itemsType) => void;
  onCancelClick: Dispatch<SetStateAction<boolean>>;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  initialData?: RestaurantData;
  data?: RestaurantData[];
}

const AddRestaurantDialog = ({
  isOpen,
  title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  setDialogIsOpen,
  errorMessage,
  initialData,
  data,
}: AddAddRestaurantDialogProps) => {
  const [dialogData, setDialogData] = useState<RestaurantData>({
    name: "",
    categories: [],
    tables: [],
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [isNameUnchanged, setIsNameUnchanged] = useState<boolean>(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData((prev) => ({ ...prev, name: initialData.name }));
    }
  }, [isOpen, initialData]);

  const handleCancel = () => {
    if (!initialData) {
      setDialogData((prev) => ({ ...prev, name: "" }));
    }
    setShowError(false);
    setIsNameUnchanged(false);
    setIsNameDuplicate(false);
    onCancelClick(false);
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
            setIsNameDuplicate(false);
            setIsNameUnchanged(
              initialData ? e.target.value === initialData.name : false
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm(
                dialogData,
                {
                  setIsDataUnchanged: setIsNameUnchanged,
                },
                onConfirmClick,
                setDialogData,
                setDialogIsOpen,
                "restaurant",
                data,
                initialData
              );
            }
          }}
          value={dialogData.name}
          error={showError || isNameUnchanged || isNameDuplicate}
          helperText={
            showError
              ? errorMessage
              : isNameUnchanged
              ? "Name is unchanged"
              : isNameDuplicate
              ? "A restaurant with the same name already exists"
              : ""
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
            onClick={() => {
              handleConfirm(
                dialogData,
                {
                  setIsDataUnchanged: setIsNameUnchanged,
                },
                onConfirmClick,
                setDialogData,
                setDialogIsOpen,
                "restaurant",
                data,
                initialData
              );
            }}
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
