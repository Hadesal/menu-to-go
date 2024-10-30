import { Container, List } from "@mui/material";
import {
  setSelectedCategory,
  setSelectedProductsIDs,
} from "@slices/restaurantsSlice";
import { useTranslation } from "react-i18next";
import useMenu from "src/hooks/useMenu";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import { useItemDialogHandlers } from "../../hooks/useItemDialogHandlers";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import AddCategoryDialog from "../Dialogs/AddItemDialog/addCategoryDialog";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import CategoryListItemItem from "./ListViewItem/CategoryListItem";

interface CategoryListViewProps {
  items: CategoryData[];
  editFunction: (item: CategoryData) => void;
  deleteFunction: (itemId: string) => void;
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

  const handleCategoryClick = (item: CategoryData) => {
    if (item.id !== selectedCategory?.id) {
      dispatch(setSelectedProductsIDs([]));
    }
    dispatch(setSelectedCategory(item));
  };

  return (
    <Container sx={styles.container}>
      <List
        sx={{
          ...styles.list,
          paddingBottom: 0,
        }}
      >
        {items.map((item, index) => (
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
