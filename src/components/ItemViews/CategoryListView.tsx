import AddCategoryDialog from "@components/common/Dialogs/AddItemDialog/addCategoryDialog";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import Styles from "@dataTypes/StylesTypes";
import { Container, List } from "@mui/material";
import {
  setSelectedCategory,
  setSelectedProductsIDs,
} from "@slices/restaurantsSlice";
import { useTranslation } from "react-i18next";
import useMenu from "src/hooks/useMenu";
import { useItemDialogHandlers } from "../../hooks/useItemDialogHandlers";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import CategoryListItemItem from "./ListViewItem/CategoryListItem";
import {
  DndContext,
  DragEndEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { reorderCategoriesForRestaurant } from "@redux/thunks/categoryThunks";

interface CategoryListViewProps {
  items: CategoryData[];
  editFunction: (item: CategoryData) => void;
  deleteFunction: (itemId: string, itemData: CategoryData) => void;
  styles: Styles;
}

const CategoryListView = ({
  items,
  editFunction,
  deleteFunction,
  styles,
}: CategoryListViewProps) => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const {
    currentItem,
    isDeleteDialogOpen,
    isEditDialogOpen,
    handleEditClick,
    handleDeleteClick,
    handleDeleteDialogClose,
    handleEditDialogClose,
  } = useItemDialogHandlers();

  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const [reorderedItems, setReorderedItems] = useState(items);
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const handleCategoryClick = (item: CategoryData) => {
    if (item.id !== selectedCategory?.id) {
      dispatch(setSelectedProductsIDs([]));
    }
    dispatch(setSelectedCategory(item));
  };

  // Use sensors for both mouse and touch support
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // Optional: Adds a slight delay to prevent accidental drags
        tolerance: 5, // Prevents tiny drags from triggering
      },
    })
  );
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
        reorderCategoriesForRestaurant({
          restaurantId: selectedRestaurant.id as string,
          reorderedCategoryIds: newReorderedItems
            .map((item) => item.id)
            .filter((id): id is string => id !== undefined), // Type guard to ensure id is a string
        })
      );
    }
  };

  useEffect(() => {
    setReorderedItems(items);
  }, [items]);

  return (
    <Container sx={styles.container}>
      <List
        sx={{
          ...styles.list,
          paddingBottom: 0,
        }}
      >
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={reorderedItems.map((item) => item.id || "")} // Provide a fallback value
          >
            {reorderedItems.map((item, index) => (
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
            ))}
          </SortableContext>
        </DndContext>
      </List>
      {currentItem && (
        <>
          <AddCategoryDialog
            dialogTitle={getString("editCategory")}
            errorMessage={getString("addCategoryInfoText")}
            cancelText={getString("cancel")}
            confirmText={getString("update")}
            isDialogOpen={isEditDialogOpen}
            onCancelClick={handleEditDialogClose}
            onConfirmClick={editFunction}
            initialData={currentItem as CategoryData}
            data={items}
          />
          <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onPrimaryActionClick={() => {
              if (currentItem.id) {
                deleteFunction(currentItem.id, currentItem as CategoryData);
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
            title={getString("deleteCategoryConfirm")}
            subTitle={getString("categoryDeleteText", {
              categoryName: currentItem.name,
            })}
          />
        </>
      )}
    </Container>
  );
};

export default CategoryListView;
