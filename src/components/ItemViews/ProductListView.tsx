import AddProductDialog from "@components/common/Dialogs/AddItemDialog/addProductDialog";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Container, List } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { reorderProductsForRestaurant } from "@redux/thunks/productThunks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useMenu from "src/hooks/useMenu";
import { ProductData } from "../../DataTypes/ProductDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import useCheckBoxHandler from "../../hooks/useCheckBoxHandler";
import { useItemDialogHandlers } from "../../hooks/useItemDialogHandlers";
import ListViewProductItem from "./ListViewItem/ProductListItem";

interface ProductListViewProps {
  items: ProductData[];
  editFunction: (item: ProductData) => void;
  deleteFunction: (id: string) => void;
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
  const dispatch = useAppDispatch();

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
    handleDuplicateClick,
    setIsDuplicateProductDialogOpen,
    setIsEditDialogOpen,
  } = useItemDialogHandlers();

  const { selectedProductsIDs } = useAppSelector(
    (state) => state.restaurantsData
  );

  const { checkedItems, handleCheckBoxChange, resetCheckedItems } =
    useCheckBoxHandler(items);

  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const [reorderedItems, setReorderedItems] = useState(items);

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

  useEffect(() => {
    if (selectedProductsIDs.length === 0) {
      resetCheckedItems();
    }
  }, [selectedProductsIDs]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = reorderedItems.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = reorderedItems.findIndex((item) => item.id === over.id);

      // Update the reordered items state
      const newReorderedItems = arrayMove(reorderedItems, oldIndex, newIndex);
      setReorderedItems(newReorderedItems);

      dispatch(
        reorderProductsForRestaurant({
          categoryId: selectedCategory?.id as string,
          reorderedProductIds: newReorderedItems
            .map((item) => item.id)
            .filter((id): id is string => id !== undefined),
        })
      );
    }
  };

  useEffect(() => {
    setReorderedItems(items);
  }, [items]);

  return (
    <Container sx={styles.container}>
      <List sx={styles.list}>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={reorderedItems.map((item) => item.id || "")} // Provide a fallback value
          >
            {reorderedItems.map((item, index) => (
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
          </SortableContext>
        </DndContext>
      </List>
      {currentItem && (
        <>
          <AddProductDialog
            dialogTitle={getString("editProduct")}
            errorMessage={getString("editProductInfoText")}
            cancelText={getString("cancel")}
            confirmText={getString("confirm")}
            isDialogOpen={isEditDialogOpen}
            setDialogIsOpen={setIsEditDialogOpen}
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
            setDialogIsOpen={setIsDuplicateProductDialogOpen}
            initialData={
              currentItem && "details" in currentItem ? currentItem : undefined
            }
            onConfirmClick={(item) => {
              if (item && duplicateFunction) {
                const { id, details, ...rest } = item;
                const { id: _, ...sanitizedDetails } = details || {};
                duplicateFunction({ ...rest, details: sanitizedDetails });
              }
            }}
            errorMessage={getString("duplicateProductError")}
            data={selectedCategory?.products || []}
          />
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              if (currentItem.id) {
                deleteFunction(currentItem.id);
              }
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
