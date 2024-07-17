import SearchIcon from "@mui/icons-material/Search";
//import AddItemDialog from "../AddItemDialogComponent/AddItemDialog"; // Adjust the import path
import Styles from "../../DataTypes/StylesTypes";
import ItemsGridView from "../Views/ItemsGridView";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AddItemDialog from "../Dialogs/AddItemDialog/addItemDialog"; // Adjust the import path7
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import EmptyState from "../EmptyStateComponet/EmptyState";

interface BoxComponentProps {
  items: RestaurantData[];
  styles: Styles;
  editFunction: (item: RestaurantData) => void;
  deleteFunction: (item: RestaurantData) => void;
  addFunction: (item: RestaurantData) => void;
  emptyText?: String;
  // CardIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  //   muiName: string;
  // };
  CardIcon: string;
}

const BoxComponent = ({
  CardIcon,
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
  emptyText,
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
      {items.length > 0 ? (
        <ItemsGridView
          CardIcon={CardIcon}
          items={items}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
          styles={styles}
        />
      ) : (
        <EmptyState emptyText={emptyText} />
      )}
      <AddItemDialog
        title="Add restaurant"
        fileUpload={false}
        errorMessage="Please enter restaurant name"
        cancelText="Cancel"
        confirmText="Add"
        isOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />
    </Paper>
  );
};

export default BoxComponent;
