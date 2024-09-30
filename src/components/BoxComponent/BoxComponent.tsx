/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { RestaurantData } from "@dataTypes/RestaurantObject";
import Styles from "@dataTypes/StylesTypes";
import AddProductDialog from "@components/Dialogs/AddItemDialog/addProductDialog";
import EmptyState from "@components/EmptyStateComponet/EmptyState";
import ItemsGridView from "@components/Views/ItemsGridView";
import ItemsListView from "@components/Views/ItemsListView";
import { useAppSelector } from "@redux/reduxHooks";
import AddRestaurantDialog from "@components/Dialogs/AddItemDialog/addRestaurantDialog";

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
  duplicateFunction?: (item: any, newItemName: string) => void;
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
  duplicateFunction,
  title,
  listView,
  product,
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const { t } = useTranslation();
  const getString = t;

  const { restaurantList } = useAppSelector((state) => state.restaurantsData);

  // Safe check for selectedCategory, add fallback if it's undefined
  const selectedCategory = useAppSelector(
    (state) => state.restaurantsData.selectedCategory || null
  );

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
              disabled={product && !selectedCategory?.name} // Safe check on selectedCategory
            >
              {getString("add")}
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
                {getString("add")}
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
            duplicateFunction={duplicateFunction}
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
        data={restaurantList}
      />

      <AddProductDialog
        dialogTitle={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={product ? open : false}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
        existingProduct
        data={selectedCategory?.products}
      />
    </Paper>
  );
};

export default BoxComponent;
