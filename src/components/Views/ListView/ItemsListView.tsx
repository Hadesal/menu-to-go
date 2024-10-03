/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductData } from "@dataTypes/ProductDataTypes";
import { List } from "@mui/material";
import { Container } from "@mui/system";
import { useAppSelector, useAppDispatch } from "@redux/reduxHooks";
import { setSelectedProductsIDs } from "@redux/slices/restaurantsSlice";
import { useState, useEffect } from "react";
import DialogManager from "./DialogManager";
import ItemRow from "./ItemRow";
import Styles from "@dataTypes/StylesTypes";
interface Props {
  CardIcon: string;
  items: any[];
  editFunction: (item: ProductData) => void;
  deleteFunction: (item: ProductData) => void;
  styles: Styles;
  duplicateFunction?: (item: ProductData) => void;
}

const ItemsListView = ({
  items,
  editFunction,
  deleteFunction,
  styles,
  CardIcon,
  duplicateFunction,
}: Props): JSX.Element => {
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );
  const [isDuplicateProductDialogOpen, setIsDuplicateProductDialogOpen] =
    useState(false);
  const [currentItem, setCurrentItem] = useState<ProductData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );

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
    setCheckedItems(newCheckedItems);

    const updatedSelectedProductIds = event.target.checked
      ? [...selectedProductIds, item.id]
      : selectedProductIds.filter((id) => id !== item.id);

    dispatch(setSelectedProductsIDs(updatedSelectedProductIds as string[]));
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleEditClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOnDuplicateProductDialogCancel = () => {
    setIsDuplicateProductDialogOpen(false);
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
      <List sx={styles.list}>
        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            index={index}
            checkedItems={checkedItems}
            handleChange={handleChange}
            styles={styles}
            handleMenuClick={handleMenuClick}
            anchorEls={anchorEls}
          />
        ))}
      </List>
      <DialogManager
        currentItem={currentItem}
        isEditDialogOpen={isEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDuplicateProductDialogOpen={isDuplicateProductDialogOpen}
        handleEditDialogClose={handleEditDialogClose}
        handleDeleteDialogClose={handleDeleteDialogClose}
        handleOnDuplicateProductDialogCancel={
          handleOnDuplicateProductDialogCancel
        }
        editFunction={editFunction}
        deleteFunction={deleteFunction}
        duplicateFunction={duplicateFunction}
        selectedCategory={selectedCategory}
      />
    </Container>
  );
};

export default ItemsListView;
