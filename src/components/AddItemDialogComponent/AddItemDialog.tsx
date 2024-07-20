import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddItemDialogProps {
  title: String;
  fileUpload: boolean;
  errorMessage: String;
  cancelText: String;
  confirmText: String;
  isOpen: boolean;
  onCancelClick: () => void;
  onConfirmClick: (item: { name: string }) => void;
}

const AddItemDialog = ({
  title,
  fileUpload,
  errorMessage,
  cancelText,
  confirmText,
  isOpen,
  onCancelClick,
  onConfirmClick,
}: AddItemDialogProps): JSX.Element => {
  const [newItem, setNewItem] = useState({ name: "" });

  const handleAdd = () => {
    if (newItem.name.trim() === "") {
      alert(errorMessage);
      return;
    }
    onConfirmClick(newItem);
    setNewItem({ name: "" });
    onCancelClick();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancelClick}
      PaperProps={{
        sx: { borderRadius: "20px" },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newItem.name}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleAdd();
            }
          }}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          sx={{ width: "25vw" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick} color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleAdd} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
