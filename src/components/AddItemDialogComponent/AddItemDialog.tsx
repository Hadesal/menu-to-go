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
  open: boolean;
  onClose: () => void;
  onAdd: (item: { name: string }) => void;
}

const AddItemDialog = ({
  open,
  onClose,
  onAdd,
}: AddItemDialogProps): JSX.Element => {
  const [newItem, setNewItem] = useState({ name: "" });

  const handleAdd = () => {
    onAdd(newItem);
    setNewItem({ name: "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "20px" },
      }}
    >
      <DialogTitle>Add New Restaurant</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          sx={{ width: "25vw" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
