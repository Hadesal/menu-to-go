import SearchIcon from "@mui/icons-material/Search";
import Styles from "../../DataTypes/StylesTypes";
import ItemsGridView from "../Views/ItemsGridView";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AddItemDialog from "../Dialogs/AddItemDialog/addItemDialog";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import EmptyState from "../EmptyStateComponet/EmptyState";
import { useTranslation } from "react-i18next";
import ItemsListView from "../Views/ItemsListView";
import CategoryItemsListView from "../Views/categoryItemsListView";

interface CategoryBoxComponentProps {
  items: RestaurantData[];
  styles: Styles;
  editFunction: (item: RestaurantData) => void;
  deleteFunction: (item) => void;
  addFunction: (item) => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  CardIcon: string;
  title?: string;
}

const CategoryBoxComponent = ({
  CardIcon,
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
  emptyStateTitle,
  emptyStateMessage,
  title,
}: CategoryBoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const { t } = useTranslation();
  const getString = t;

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ ...styles.categoryPaper, borderRadius: "24px" }}>
      <Stack direction="column" spacing={2} mb={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "30px 20px 0 20px",
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <Button
            sx={{ ...styles.addButtonCategory }}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </Box>
      </Stack>

      {filteredItems.length > 0 ? (
        <CategoryItemsListView
          CardIcon={CardIcon}
          items={filteredItems}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
          styles={styles}
        />
      ) : (
        <EmptyState
          emptyStateTitle={emptyStateTitle}
          emptyStateMessage={emptyStateMessage}
        />
      )}
      <AddItemDialog
        title={getString("addCategoryText")}
        fileUpload={true}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("Add")}
        isOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />
    </Paper>
  );
};

export default CategoryBoxComponent;
