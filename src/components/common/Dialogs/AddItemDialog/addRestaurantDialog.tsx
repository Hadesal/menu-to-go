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
import { handleCancel, handleConfirm } from "../helpers/handlers";
import { Styles } from "./addItemDialog.styles";

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
  const [dialogData, setDialogData] = useState<
    Omit<RestaurantData, "userUiPreferences">
  >({
    name: "",
    categories: [],
    tables: [],
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [isNameUnchanged, setIsNameUnchanged] = useState<boolean>(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);
  const MAXCHARSLENGTH = 25;
  useEffect(() => {
    if (isOpen && initialData) {
      setDialogData((prev) => ({ ...prev, name: initialData.name }));
    }
  }, [isOpen, initialData]);

  const onHandleCancel = () => {
    return handleCancel(setDialogData, "restaurant", onCancelClick, {
      setShowNameError: setShowError,
      setIsDataUnchanged: setIsNameUnchanged,
      setIsNameDuplicate: setIsNameDuplicate,
    });
  };

  const onHandleConfirm = () => {
    handleConfirm(
      dialogData,
      {
        setShowNameError: setShowError,
        setIsDataUnchanged: setIsNameUnchanged,
        setIsNameDuplicate: setIsNameDuplicate,
      },
      onHandleCancel,
      onConfirmClick,
      data
    );
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
      onClose={onHandleCancel}
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
              onHandleConfirm();
            }
          }}
          value={dialogData.name}
          error={showError || isNameUnchanged || isNameDuplicate}
          MAXCHARSLENGTH={MAXCHARSLENGTH}
          helperText={
            showError
              ? errorMessage
              : isNameUnchanged
              ? "Name is unchanged"
              : isNameDuplicate
              ? "A restaurant with the same name already exists"
              : `${dialogData.name.length}/${MAXCHARSLENGTH}`
          }
        />
      </Box>
      <DialogContent sx={Styles.dialogContent}>
        <Box sx={Styles.actionBox}>
          <Button
            variant="outlined"
            onClick={onHandleCancel}
            sx={Styles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onHandleConfirm();
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
