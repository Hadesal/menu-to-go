/* eslint-disable @typescript-eslint/no-explicit-any */
import AddProductDialog from "@components/Dialogs/AddItemDialog/addProductDialog";
import AddRestaurantDialog from "@components/Dialogs/AddItemDialog/addRestaurantDialog";
import ConfirmDialog from "@components/Dialogs/LogoutDialog/confirmDialog";
import EmptyState from "@components/EmptyStateComponet/EmptyState";
import GridView from "@components/ItemViews/gridView";
import ProductListView from "@components/ItemViews/ProductListView";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import Styles from "@dataTypes/StylesTypes";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { removeProductFromCategory as deleteProduct } from "@redux/thunks/productThunks";
import { debouncedSearch } from "@utils/searchHelper";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderComponent from "./BoxComponentHeader";
import AddCategoryDialog from "@components/Dialogs/AddItemDialog/addCategoryDialog";
import CategoryListView from "@components/ItemViews/CategoryListView";

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
  category: boolean;
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
  category,
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const {
    restaurantList,
    selectedCategory,
    selectedProductsIDs,
    selectedRestaurant,
  } = useAppSelector((state) => state.restaurantsData);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.target.value.toLowerCase();
    debouncedSearch(items, searchText, setFilteredItems);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <Paper
      elevation={3}
      sx={{ ...styles.paper, padding: category ? "0px" : "30px" }}
    >
      <HeaderComponent
        title={title}
        onSearch={onSearch}
        onAddClick={handleClickOpen}
        onCopyClick={() => {}}
        onMoveClick={() => {}}
        onDeleteClick={() => {
          setIsDeleteDialogOpen(true);
        }}
        product={product}
        styles={styles}
        selectedProductsIDs={selectedProductsIDs}
        addButtonDisabled={product && !selectedCategory?.name}
        category={category}
      />
      {filteredItems?.length > 0 ? (
        listView ? (
          duplicateFunction ? (
            <ProductListView
              items={filteredItems as ProductData[]}
              editFunction={editFunction}
              deleteFunction={deleteFunction}
              duplicateFunction={duplicateFunction}
              styles={styles}
            />
          ) : (
            <CategoryListView
              items={filteredItems as CategoryData[]}
              editFunction={editFunction}
              deleteFunction={deleteFunction}
              styles={styles}
            />
          )
        ) : (
          <GridView
            CardIcon={CardIcon}
            items={filteredItems as RestaurantData[]}
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

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onPrimaryActionClick={() => {
          if (selectedCategory?.id) {
            dispatch(
              deleteProduct({
                categoryId: selectedCategory?.id,
                productId: selectedProductsIDs,
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
      <AddRestaurantDialog
        title={getString("addRestaurantText")}
        errorMessage={getString("addRestaurantInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isOpen={product ? false : category ? false : open}
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

      <AddCategoryDialog
        dialogTitle={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={category ? open : false}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
        data={selectedRestaurant?.categories}
      />
    </Paper>
  );
};

export default BoxComponent;
