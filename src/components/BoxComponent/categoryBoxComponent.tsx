import {
  Box,
  Button,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import AddCategoryDialog from "../Dialogs/AddItemDialog/addCategoryDialog";
import EmptyState from "../EmptyStateComponet/EmptyState";
import CategoryItemsListView from "../Views/categoryItemsListView";

interface CategoryBoxComponentProps {
  items: CategoryData[];
  styles: Styles;
  editFunction: (item) => void;
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

      {filteredItems?.length > 0 ? (
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
      <AddCategoryDialog
        title={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />
    </Paper>
  );
};

export default CategoryBoxComponent;
