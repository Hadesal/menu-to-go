import {
  setSelectedCategory,
  setSelectedProductsIDs,
} from "@slices/restaurantsSlice";

import { Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductData } from "../../DataTypes/ProductDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import AddProductDialog from "../Dialogs/AddItemDialog/addProductDialog";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import ListViewProductItem from "./ListViewItem/ProductListItem";
import CategoryListItemItem from "./ListViewItem/CategoryListItem";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import AddCategoryDialog from "@components/Dialogs/AddItemDialog/addCategoryDialog";
import useCheckBoxHandler from "../../hooks/useCheckBoxHandler";
import useMenu from "src/hooks/useMenu";
interface ListViewProps {
  CardIcon: string;
  items: (ProductData | CategoryData)[];
  editFunction: (item: ProductData | CategoryData) => void;
  deleteFunction: (item: ProductData | CategoryData) => void;
  styles: Styles;
  duplicateFunction?: (item: ProductData) => void;
  isCategory: boolean;
}

const ListView = ({
  items,
  editFunction,
  deleteFunction,
  duplicateFunction,
  styles,
  isCategory,
}: ListViewProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const getString = t;
  const [isDuplicateProductDialogOpen, setIsDuplicateProductDialogOpen] =
    useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<
    ProductData | CategoryData | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const { checkedItems, handleCheckBoxChange, resetCheckedItems } =
    useCheckBoxHandler(items as ProductData[]);

  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);

  const handleDuplicateClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsDuplicateProductDialogOpen(true);
  };

  const handleEditClick = (item: ProductData | CategoryData) => {
    setCurrentItem(item);
    isCategory ? setOpen(true) : setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (item: ProductData | CategoryData) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleOnDuplicateProductDialogCancel = () => {
    setIsDuplicateProductDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleCategoryClick = (item: CategoryData) => {
    dispatch(setSelectedProductsIDs([]));
    dispatch(setSelectedCategory(item));
  };

  useEffect(() => {
    if (!isCategory) {
      // Get the keys of checkedItems as an array
      const checkedItemKeys = Object.keys(checkedItems);
      // Use some() to check if any item matches
      const foundMatch = items.some((item) =>
        checkedItemKeys.some((i) => i === item.id)
      );
      // Log if a match was found
      if (foundMatch) {
        console.log("Match found!");
        return;
      }
      // Reset checkedItems for the current items
      resetCheckedItems();
    }
  }, [items, isCategory]);

  return (
    <Container sx={styles.container}>
      <List
        sx={{
          ...styles.list,
          paddingBottom: isCategory ? 0 : "inherit",
        }}
      >
        {items.map((item, index) =>
          isCategory ? (
            <CategoryListItemItem
              key={item.id}
              item={item as CategoryData}
              index={index}
              onMenuClick={handleMenuClick}
              onMenuClose={handleMenuClose}
              anchorEl={anchorEls[index]}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              styles={styles}
              length={items.length}
              itemClick={handleCategoryClick}
            />
          ) : (
            <ListViewProductItem
              key={item.id}
              item={item as ProductData}
              index={index}
              checked={checkedItems[item?.id || ""] || false}
              onCheckChange={handleCheckBoxChange}
              onMenuClick={handleMenuClick}
              onMenuClose={handleMenuClose}
              anchorEl={anchorEls[index]}
              handleDuplicateClick={handleDuplicateClick}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              styles={styles}
            />
          )
        )}
      </List>
      {currentItem && (
        <>
          {!isCategory && (
            <>
              <AddProductDialog
                dialogTitle={getString("editProduct")}
                errorMessage={getString("editProductInfoText")}
                cancelText={getString("cancel")}
                confirmText={getString("confirm")}
                isDialogOpen={isEditDialogOpen}
                onCancelClick={handleEditDialogClose}
                onConfirmClick={(data) =>
                  editFunction({ ...data, id: currentItem.id })
                }
                initialData={
                  currentItem && "details" in currentItem
                    ? currentItem
                    : undefined
                }
                data={selectedCategory?.products || []}
              />
              <AddProductDialog
                dialogTitle={getString("DuplicateProduct")}
                cancelText={getString("cancel")}
                confirmText={getString("add")}
                isDialogOpen={isDuplicateProductDialogOpen}
                onCancelClick={handleOnDuplicateProductDialogCancel}
                initialData={
                  currentItem && "details" in currentItem
                    ? currentItem
                    : undefined
                }
                onConfirmClick={(item) => {
                  if (item && duplicateFunction) {
                    duplicateFunction(item);
                  }
                }}
                errorMessage={getString("duplicateProductError")}
                data={selectedCategory?.products || []}
              />
            </>
          )}
          {isCategory && (
            <AddCategoryDialog
              dialogTitle={"Edit category"}
              errorMessage={getString("addCategoryInfoText")}
              cancelText={getString("cancel")}
              confirmText={getString("update")}
              isDialogOpen={open}
              onCancelClick={() => {
                setOpen(false);
              }}
              onConfirmClick={editFunction}
              initialData={
                currentItem && "categoryType" in currentItem
                  ? currentItem
                  : undefined
              }
              data={
                selectedRestaurant ? selectedRestaurant.categories : undefined
              }
            />
          )}

          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              deleteFunction(currentItem);
              setIsDeleteDialogOpen(false);
            }}
            onSecondaryActionClick={handleDeleteDialogClose}
            onClose={handleDeleteDialogClose}
            width="500px"
            height="300px"
            showImg={false}
            secondaryActionText={getString("cancel")}
            primaryActionText={getString("delete")}
            title={
              isCategory
                ? getString("deleteCategoryConfirm")
                : getString("deleteConfirmText")
            }
            subTitle={
              isCategory
                ? getString("categoryDeleteText", {
                    categoryName: currentItem.name,
                  })
                : getString("productDeleteText", {
                    productName: currentItem.name,
                  })
            }
          />
        </>
      )}
    </Container>
  );
};

export default ListView;
