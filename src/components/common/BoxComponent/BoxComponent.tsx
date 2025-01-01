/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCategoryDialog from "@components/common/Dialogs/AddItemDialog/addCategoryDialog";
import AddProductDialog from "@components/common/Dialogs/AddItemDialog/AddProductDialog/addProductDialog";
import AddRestaurantDialog from "@components/common/Dialogs/AddItemDialog/addRestaurantDialog";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import EmptyState from "@components/common/EmptyStateComponet/EmptyState";
import CategoryListView from "@components/ItemViews/CategoryListView";
import GridView from "@components/ItemViews/gridView";
import ProductListView from "@components/ItemViews/ProductListView";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import Styles from "@dataTypes/StylesTypes";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import {
  copyProductsToCategory,
  removeProductFromCategory as deleteProduct,
  moveProductsToCategory,
} from "@redux/thunks/productThunks";
import { itemsTypes } from "@utils/dataTypeCheck";
import { debouncedSearch } from "@utils/searchHelper";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryActionDialog } from "../Dialogs/CategoryActionDialog/CategoryActionDialog";
import HeaderComponent from "./BoxComponentHeader";

interface BoxComponentProps {
  items: itemsTypes;
  styles: Styles;
  editFunction: (item: any) => void;
  deleteFunction: (id: string) => void;
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
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false); // State for Copy dialog

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
        onCopyClick={() => {
          setIsCopyDialogOpen(true); // Open the copy dialog
        }}
        onMoveClick={() => {
          setIsMoveDialogOpen(true);
        }}
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
        subTitle={getString("deletionCofirmMessage")}
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
        isDialogOpen={product ? open : false}
        dialogTitle={getString("addProductText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        setDialogIsOpen={setOpen}
        onConfirmClick={addFunction}
        existingProducts={selectedCategory?.products}
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

      {selectedRestaurant && selectedCategory && isMoveDialogOpen && (
        <CategoryActionDialog
          categories={selectedRestaurant.categories}
          isDialogOpen={isMoveDialogOpen}
          setIsDialogOpen={setIsMoveDialogOpen}
          onConfirmClick={(selectedCategoryTarget) => {
            dispatch(
              moveProductsToCategory({
                sourceCategoryId: selectedCategory.id as string,
                targetCategoryId: selectedCategoryTarget,
                productIds: selectedProductsIDs,
              })
            );

            setIsMoveDialogOpen(false);
          }}
          selectedCategory={selectedCategory}
          actionTitle="Move Product"
          selectLabel="Move to this category"
          buttonLabel="Move"
        />
      )}

      {selectedRestaurant && selectedCategory && isCopyDialogOpen && (
        <CategoryActionDialog
          categories={selectedRestaurant.categories}
          isDialogOpen={isCopyDialogOpen}
          setIsDialogOpen={setIsCopyDialogOpen}
          onConfirmClick={(selectedCategoryTarget) => {
            dispatch(
              copyProductsToCategory({
                sourceCategoryId: selectedCategory.id as string,
                targetCategoryId: selectedCategoryTarget,
                productIds: selectedProductsIDs,
              })
            );

            setIsCopyDialogOpen(false);
          }}
          selectedCategory={selectedCategory}
          actionTitle="Copy Product"
          selectLabel="Copy to this category"
          buttonLabel="Copy"
        />
      )}
    </Paper>
  );
};

export default BoxComponent;
