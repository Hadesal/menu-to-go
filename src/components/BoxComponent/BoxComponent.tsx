/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useAppSelector } from "@redux/reduxHooks";
import { ConfirmDialogSection } from "./ConfirmDialogSection";
import { ActionHeader } from "./SearchAndAddSection";
import { ItemsViewSection } from "./ItemsViewSection";
import { AddDialogsSection } from "./AddDialogsSection";
import { findNameProperty } from "./boxServices";

import Styles from "@dataTypes/StylesTypes";
interface BoxComponentProps {
  CardIcon: string;
  items: any[] | null;
  styles: Styles;
  editFunction: (item: any) => void;
  deleteFunction: (item: any) => void;
  addFunction: (item: any) => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  title?: string;
  listView: boolean;
  product: boolean;
  duplicateFunction?: (item: any) => void;
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
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const [filteredItems, setFilteredItems] = useState<any[]>(items || []);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const selectedCategory = useAppSelector(
    (state) => state.restaurantsData.selectedCategory
  );

  useEffect(() => {
    if (items) setFilteredItems(items);
  }, [items]);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const onSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.target.value.toLowerCase();
    const filtered =
      items &&
      items.filter((item) => {
        const nameValue = findNameProperty(item);
        return nameValue && nameValue.toLowerCase().includes(searchText);
      });
    setFilteredItems(filtered || []);
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      <ConfirmDialogSection
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />

      {title && (
        <ActionHeader
          onSearch={onSearch}
          handleClickOpen={handleClickOpen}
          isProduct={product}
          selectedCategoryName={selectedCategory?.name}
          styles={styles}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          title={title}
        />
      )}
      <ItemsViewSection
        filteredItems={filteredItems}
        listView={listView}
        styles={styles}
        CardIcon={CardIcon}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
        duplicateFunction={duplicateFunction}
        emptyStateTitle={emptyStateTitle}
        emptyStateMessage={emptyStateMessage}
      />

      <AddDialogsSection
        open={open}
        handleClose={handleClose}
        addFunction={addFunction}
        restaurantList={restaurantList}
        selectedCategoryProducts={selectedCategory?.products}
        product={product}
      />
    </Paper>
  );
};

export default BoxComponent;
