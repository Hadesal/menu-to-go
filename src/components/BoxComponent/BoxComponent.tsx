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
import GridView from "@components/ItemViews/gridView";
import ItemsListView from "@components/ItemViews/listView";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import AddRestaurantDialog from "@components/Dialogs/AddItemDialog/addRestaurantDialog";
import { removeProductFromCategory as deleteProduct } from "@redux/thunks/productThunks";
import ConfirmDialog from "@components/Dialogs/LogoutDialog/confirmDialog";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import {
  isProductData,
  isCategoryData,
  isRestaurantData,
} from "@utils/dataTypeCheck";

export type itemsType = ProductData[] | CategoryData[] | RestaurantData[];
interface BoxComponentProps {
  items: itemsType;
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
  duplicateFunction?: (item: ProductData) => void;
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
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { restaurantList } = useAppSelector((state) => state.restaurantsData);

  // Safe check for selectedCategory, add fallback if it's undefined
  const selectedCategory = useAppSelector(
    (state) => state.restaurantsData.selectedCategory || null
  );

  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

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

    if (filtered.length > 0) {
      if (isProductData(filtered[0])) {
        setFilteredItems(filtered as ProductData[]);
      } else if (isCategoryData(filtered[0])) {
        setFilteredItems(filtered as CategoryData[]);
      } else if (isRestaurantData(filtered[0])) {
        setFilteredItems(filtered as RestaurantData[]);
      }
    } else {
      setFilteredItems([]);
    }
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onPrimaryActionClick={() => {
          if (selectedCategory?.id) {
            dispatch(
              deleteProduct({
                categoryId: selectedCategory?.id,
                productId: selectedProductIds,
              })
            );
          }
          setIsDeleteDialogOpen(false);
        }}
        onSecondaryActionClick={() => {
          setIsDeleteDialogOpen(false);
        }}
        onClose={() => {
          setIsDeleteDialogOpen(false);
        }}
        width="500px"
        height="300px"
        showImg={false}
        secondaryActionText={getString("cancel")}
        primaryActionText={getString("delete")}
        title={getString("deleteConfirmText")}
        subTitle={
          "Are you sure you want to delete? You can't undo this action."
        }
      />
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

              <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                {selectedProductIds.length > 0 && (
                  <>
                    <Button
                      sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        // Add your copy logic here
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        // Add your move logic here
                      }}
                    >
                      Move
                    </Button>
                    <Button
                      sx={{
                        borderRadius: 10,
                        width: "6vw",
                        height: "5vh",
                        background: "red",
                        color: "white",
                      }}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
                <Button
                  sx={{
                    background: "var(--primary-color)",
                    color: "white",
                    borderRadius: 10,
                    width: "6vw",
                    height: "5vh",
                    "&:hover": {
                      backgroundColor: "transparent", // Make background transparent when hovered
                      color: "var(--primary-color)",
                    },
                  }}
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  {getString("add")}
                </Button>
              </Box>
            </Box>
            <TextField
              sx={styles.searchField}
              variant="outlined"
              placeholder="   Search"
              color="primary"
              slotProps={{ input: { startAdornment: <SearchIcon /> } }}
              fullWidth
              onChange={onSearch}
            />
          </>
        </Stack>
      )}
      {filteredItems?.length > 0 ? (
        listView ? (
          isProductData(filteredItems[0]) ? (
            <ItemsListView
              isCategory={false}
              CardIcon={CardIcon}
              items={filteredItems as (ProductData | CategoryData)[]}
              editFunction={editFunction}
              deleteFunction={deleteFunction}
              duplicateFunction={duplicateFunction}
              styles={styles}
            />
          ) : isCategoryData(filteredItems[0]) ? (
            <ItemsListView
              isCategory={true}
              CardIcon={CardIcon}
              items={filteredItems as (ProductData | CategoryData)[]}
              editFunction={editFunction}
              deleteFunction={deleteFunction}
              duplicateFunction={duplicateFunction}
              styles={styles}
            />
          ) : (
            <EmptyState
              emptyStateTitle={emptyStateTitle}
              emptyStateMessage={emptyStateMessage}
            />
          )
        ) : (
          <GridView
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
        onCancelClick={setOpen}
        setDialogIsOpen={setOpen}
        onConfirmClick={addFunction}
        data={restaurantList}
      />

      <AddProductDialog
        isDialogOpen={product ? open : false}
        dialogTitle={getString("addCategoryText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        setDialogIsOpen={setOpen}
        onConfirmClick={addFunction}
        errorMessage={getString("addCategoryInfoText")}
        data={selectedCategory?.products}
      />
    </Paper>
  );
};

export default BoxComponent;
