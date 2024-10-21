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
import { itemsType } from "@utils/dataTypeCheck";

interface ListViewProps {
  CardIcon: string;
  items: (ProductData | CategoryData)[];
  editFunction: (item: itemsType) => void;
  deleteFunction: (id: string) => void;
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
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const getString = t;
  const [isDuplicateProductDialogOpen, setIsDuplicateProductDialogOpen] =
    useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<
    ProductData | CategoryData | null
  >(null); // Make sure currentItem can be null initially
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );
  // Change the state to an object to manage multiple checkboxes
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => {
      acc[item.id as string] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ProductData
  ) => {
    const newCheckedItems = {
      ...checkedItems,
      [item.id as string]: event.target.checked,
    };

    console.log(newCheckedItems);

    setCheckedItems(newCheckedItems);

    // Ensure the item ID is defined and valid
    if (!item.id) return;

    // Prepare the updated selected product IDs based on the checkbox state
    const updatedSelectedProductIds = event.target.checked
      ? [...selectedProductIds, item.id] // Add the ID if checked
      : selectedProductIds.filter((id) => id !== item.id); // Remove the ID if unchecked

    dispatch(setSelectedProductsIDs(updatedSelectedProductIds));
  };

  const handleUncheckAll = () => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };

      // Set each item's checked state to false
      Object.keys(newCheckedItems).forEach((key) => {
        newCheckedItems[key] = false;
      });

      console.log(newCheckedItems);

      return newCheckedItems;
    });
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);

    handleUncheckAll();
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleDuplicateClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsDuplicateProductDialogOpen(true);
  };
  const handleEditClick = (item: ProductData | CategoryData) => {
    console.log(item);
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
    dispatch(setSelectedCategory(item));
  };

  useEffect(() => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      for (let i = 0; i < selectedProductIds.length; i++) {
        newCheckedItems[selectedProductIds[i]] = true;
      }
      return newCheckedItems;
    });
  }, [selectedProductIds]);

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
              checked={checkedItems[item?.id || ""]}
              onCheckChange={handleChange}
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
                setDialogIsOpen={handleEditDialogClose}
                onConfirmClick={editFunction}
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
                setDialogIsOpen={handleOnDuplicateProductDialogCancel}
                initialData={
                  currentItem && "details" in currentItem
                    ? currentItem
                    : undefined
                }
                onConfirmClick={(item) => {
                  if (item && duplicateFunction) {
                    duplicateFunction(item as ProductData);
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
              deleteFunction(currentItem.id ? currentItem.id : "");
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
