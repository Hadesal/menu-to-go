import { Container, List } from "@mui/material";
import { useTranslation } from "react-i18next";
import ListViewProductItem from "./ListViewItem/ProductListItem";
import { ProductData } from "../../DataTypes/ProductDataTypes";
import { useItemDialogHandlers } from "../../hooks/useItemDialogHandlers";
import AddProductDialog from "../Dialogs/AddItemDialog/addProductDialog";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import useCheckBoxHandler from "../../hooks/useCheckBoxHandler";
import useMenu from "src/hooks/useMenu";
import Styles from "../../DataTypes/StylesTypes";
import { useAppSelector } from "@redux/reduxHooks";
import { useEffect } from "react";

interface ProductListViewProps {
  items: ProductData[];
  editFunction: (item: ProductData) => void;
  deleteFunction: (item: ProductData) => void;
  duplicateFunction: (item: ProductData) => void;
  styles: Styles;
}

const ProductListView = ({
  items,
  editFunction,
  deleteFunction,
  duplicateFunction,
  styles,
}: ProductListViewProps) => {
  const { t } = useTranslation();
  const getString = t;
  const {
    currentItem,
    isDeleteDialogOpen,
    isEditDialogOpen,
    isDuplicateProductDialogOpen,
    handleEditClick,
    handleDeleteClick,
    handleDeleteDialogClose,
    handleEditDialogClose,
    handleDuplicateClick,
    handleDuplicateDialogClose,
  } = useItemDialogHandlers();

  const { checkedItems, handleCheckBoxChange, resetCheckedItems } =
    useCheckBoxHandler(items);

  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);

  useEffect(() => {
    // Get the keys of checkedItems as an array
    const checkedItemKeys = Object.keys(checkedItems);
    const isSameCategory = items.some((item) =>
      checkedItemKeys.some((i) => i === item.id)
    );
    if (isSameCategory) {
      return;
    }
    //clear all selection
    resetCheckedItems();
  }, [items, checkedItems, resetCheckedItems]);

  return (
    <Container sx={styles.container}>
      <List sx={styles.list}>
        {items.map((item, index) => (
          <ListViewProductItem
            key={item.id}
            item={item}
            index={index}
            checked={checkedItems[item?.id || ""] || false}
            onCheckChange={handleCheckBoxChange}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            anchorEl={anchorEls[index]}
            handleDuplicateClick={() => handleDuplicateClick(item)}
            handleEditClick={() => handleEditClick(item)}
            handleDeleteClick={() => handleDeleteClick(item)}
            styles={styles}
          />
        ))}
      </List>
      {currentItem && (
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
            initialData={currentItem as ProductData}
            data={items}
          />
          <AddProductDialog
            dialogTitle={getString("DuplicateProduct")}
            cancelText={getString("cancel")}
            confirmText={getString("add")}
            isDialogOpen={isDuplicateProductDialogOpen}
            onCancelClick={handleDuplicateDialogClose}
            initialData={
              currentItem && "details" in currentItem ? currentItem : undefined
            }
            onConfirmClick={(item) => {
              if (item && duplicateFunction) {
                duplicateFunction(item);
              }
            }}
            errorMessage={getString("duplicateProductError")}
            data={selectedCategory?.products || []}
          />
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              deleteFunction(currentItem as ProductData);
              handleDeleteDialogClose();
            }}
            onSecondaryActionClick={handleDeleteDialogClose}
            onClose={handleDeleteDialogClose}
            width="500px"
            height="300px"
            showImg={false}
            secondaryActionText={getString("cancel")}
            primaryActionText={getString("delete")}
            title={getString("deleteConfirmText")}
            subTitle={getString("productDeleteText", {
              productName: currentItem.name,
            })}
          />
        </>
      )}
    </Container>
  );
};

export default ProductListView;
