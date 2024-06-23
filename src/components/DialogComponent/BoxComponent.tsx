import React, { useState } from "react";
import { Paper, Stack, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ItemsListView from "../Views/ItemsListView";
import AddItemDialog from "../AddItemDialogComponent/AddItemDialog"; // Adjust the import path
import Styles from "../../DataTypes/StylesTypes";

interface BoxComponentProps {
  items: any[];
  styles: Styles;
  editFunction: (item: object) => void;
  deleteFunction: (item: object) => void;
  addFunction: (item: { name: string }) => void;
}

const BoxComponent = ({
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField
          sx={styles.searchField}
          variant="outlined"
          placeholder="   Search"
          color="primary"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          fullWidth
        />
        <Button
          sx={styles.addButton}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Stack>
      <ItemsListView
        items={items}
        editfunction={editFunction}
        deleteFunction={deleteFunction}
        styles={styles}
      />
      <AddItemDialog open={open} onClose={handleClose} onAdd={addFunction} />
    </Paper>
  );
};

export default BoxComponent;
