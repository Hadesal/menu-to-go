import AddProductDialog from "@components/common/Dialogs/AddItemDialog/AddProductDialog/addProductDialog";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Container, List } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { reorderProductsForRestaurant } from "@redux/thunks/productThunks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useMenu from "src/hooks/useMenu";
import { IngredientData, ProductData } from "../../DataTypes/ProductDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import useCheckBoxHandler from "../../hooks/useCheckBoxHandler";
import { useItemDialogHandlers } from "../../hooks/useItemDialogHandlers";
import ListViewProductItem from "./ListViewItem/ProductListItem";

interface ProductListViewProps {
  items: ProductData[];
  editFunction: (item: ProductData) => void;
  deleteFunction: (
    id: string,
    image?: string[],
    ingredientImages?: string[]
  ) => void;
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
    useCheckBoxHandler();

  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const [reorderedItems, setReorderedItems] = useState(items);

  useEffect(() => {
    const checkedItemKeys = Object.keys(checkedItems);
    const isSameCategory = items
      .filter((item) => item.id !== undefined) // Filter out undefined IDs
      .some((item) => checkedItemKeys.includes(item.id as string));

    if (!isSameCategory && Object.keys(checkedItems).length > 0) {
      resetCheckedItems();
    }
  }, [items, checkedItems, resetCheckedItems]);

  useEffect(() => {
    if (
      selectedProductsIDs.length === 0 &&
      Object.keys(checkedItems).length > 0
    ) {
      resetCheckedItems();
    }
  }, [resetCheckedItems, selectedProductsIDs, checkedItems]);

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
            cancelText={getString("cancel")}
            confirmText={getString("confirm")}
            isDialogOpen={isEditDialogOpen}
            setDialogIsOpen={setIsEditDialogOpen}
            onConfirmClick={(data) => {
              if (currentItem && currentItem.id) {
                editFunction({ ...data, id: currentItem.id });
              }
            }}
            initialData={currentItem as ProductData}
            existingProducts={items}
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
            existingProducts={selectedCategory?.products || []}
          />
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              if (
                currentItem?.id &&
                "image" in currentItem &&
                "details" in currentItem
              ) {
                const ingredientImages = currentItem.details.ingredients
                  .map((ingredient: IngredientData) => ingredient.image)
                  .filter(
                    (image): image is string | File =>
                      image !== null && image !== ""
                  );

                deleteFunction(
                  currentItem.id,
                  [currentItem.image as string],
                  ingredientImages as string[]
                );
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
              productName: currentItem?.name,
            })}
          />
        </>
      )}
    </Container>
  );
};

export default ProductListView;
