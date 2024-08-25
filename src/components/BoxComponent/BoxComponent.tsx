import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import Styles from "../../DataTypes/StylesTypes";
import AddProductDialog from "../Dialogs/AddItemDialog/addProductDialog";
import EmptyState from "../EmptyStateComponet/EmptyState";
import ItemsGridView from "../Views/ItemsGridView";
import ItemsListView from "../Views/ItemsListView"; // Make sure this import is correct
import { useAppSelector } from "../../utils/hooks";
import AddRestaurantDialog from "../Dialogs/AddItemDialog/addRestaurantDialog";

interface BoxComponentProps {
  items: RestaurantData[];
  styles: Styles;
  editFunction: (item: any) => void;
  deleteFunction: (item: any) => void;
  addFunction: (item: any) => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  CardIcon: string;
  title?: string;
  listView?: boolean;
  product: boolean;
}

const BoxComponent = ({
  CardIcon,
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
  emptyStateTitle,
  emptyStateMessage,
  title,
  listView,
  product,
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const { t } = useTranslation();
  const getString = t;

  const { selectedCategory } = useAppSelector((state) => state.categoriesData);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  const handleClose = () => {
    setOpen(false);
  };
  const findNameProperty = (obj: any): string | null => {
    if (obj !== null && typeof obj === "object") {
      for (const key in obj) {
        if (key === "name") return obj[key];
        if (typeof obj[key] === "object") {
          const result = findNameProperty(obj[key]);
          if (result) return result;
        }
      }
    }
    return null;
  };

  const onSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = items.filter((item) => {
      const nameValue = findNameProperty(item);
      return nameValue && nameValue.toLowerCase().includes(searchText);
    });
    setFilteredItems(filtered);
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      {!title && (
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <>
            <TextField
              sx={styles.searchField}
              variant="outlined"
              placeholder="   Search"
              color="primary"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              fullWidth
              onChange={onSearch}
            />
            <Button
              sx={styles.addButton}
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              disabled={product && !selectedCategory?.name}
            >
              Add
            </Button>
          </>
        </Stack>
      )}
      {title && (
        <Stack direction="column" spacing={2} mb={3}>
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">{title}</Typography>

              <Button
                sx={styles.addButton}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Add
              </Button>
            </Box>
            <TextField
              sx={styles.searchField}
              variant="outlined"
              placeholder="   Search"
              color="primary"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              fullWidth
              onChange={onSearch}
            />
          </>
        </Stack>
      )}
      {filteredItems?.length > 0 ? (
        listView ? (
          <ItemsListView
            CardIcon={CardIcon}
            items={filteredItems}
            editFunction={editFunction}
            deleteFunction={deleteFunction}
            styles={styles}
          />
        ) : (
          <ItemsGridView
            CardIcon={CardIcon}
            items={filteredItems}
            editFunction={editFunction}
            deleteFunction={deleteFunction}
            styles={styles}
          />
        )
      ) : (
        <EmptyState
          emptyStateTitle={emptyStateTitle}
          emptyStateMessage={emptyStateMessage}
        />
      )}
      <AddRestaurantDialog
        title={getString("addRestaurantText")}
        errorMessage={getString("addRestaurantInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isOpen={product ? false : open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />

      <AddProductDialog
        dialogTitle={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={product ? open : false}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />
    </Paper>
  );
};

export default BoxComponent;
