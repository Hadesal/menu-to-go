import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { setSelectedProductsIDs } from "@slices/restaurantsSlice";

import {
  Box,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import placeHolderImg from "../../assets/catering-item-placeholder-704x520.png";
import Styles from "../../DataTypes/StylesTypes";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import { ProductData } from "../../DataTypes/ProductDataTypes";
import AddProductDialog from "../Dialogs/AddItemDialog/addProductDialog";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

interface Props {
  CardIcon: string;
  items: ProductData[]; // Explicit typing for product items
  editFunction: (item: ProductData) => void;
  deleteFunction: (item: ProductData) => void;
  styles: Styles;
  duplicateFunction?: (item: ProductData) => void; // ProductData for consistency
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
  const { t } = useTranslation();
  const getString = t;
  const [isDuplicateProductDialogOpen, setIsDuplicateProductDialogOpen] =
    useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ProductData | null>(null); // Make sure currentItem can be null initially
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
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
    console.log(checkedItems);

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
      console.log(prevCheckedItems);
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

  const handleEditClick = (item: ProductData) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (item: ProductData) => {
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

  useEffect(() => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems }; // Create a new object to avoid mutating the previous state
      for (let i = 0; i < selectedProductIds.length; i++) {
        newCheckedItems[selectedProductIds[i]] = true; // Update the checked state for each selected product
      }
      return newCheckedItems; // Return the updated checkedItems object
    });
  }, [selectedProductIds]); // Add selectedProductIds to the dependency array

  return (
    <Container sx={styles.container}>
      <List sx={styles.list}>
        {items.map((item, index) => (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              ...styles.paperListView,
              background: checkedItems[item?.id || ""] ? "#FFF9F4" : "inherit",
              "&:hover": {
                backgroundColor: "#FFF9F4",
              },
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={item.id}
            >
              <Box
                sx={{
                  ...styles.listItemBox,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Checkbox
                  checked={checkedItems[item?.id || ""]} // Check if the item ID exists in checkedItems
                  onChange={(e) => handleChange(e, item)}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    borderRadius: 0,
                    padding: 0,
                    "&:hover": {
                      backgroundColor: "transparent", // Make background transparent when hovered
                    },
                  }}
                />
                <IconButton
                  sx={{
                    padding: 0.8,
                    cursor: "grab",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  aria-label="drag"
                >
                  <DragIndicatorIcon
                    sx={{
                      color: "var(--primary-color)",
                    }}
                    fontSize="medium"
                  />
                </IconButton>
                <img
                  style={{ borderRadius: "10px" }}
                  src={item.image ? item.image : placeHolderImg}
                  width={60}
                  height={60}
                />
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "18px" }}
                      variant="body1"
                      style={{
                        color: "var(--primary-color)",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 500, fontSize: "18px" }}
                  component="span"
                >
                  {item.price}$
                </Typography>
                <IconButton
                  sx={{
                    padding: 0.8,
                    marginLeft: 4,
                    "&:hover": {
                      background: "#A4755D30",
                    },
                  }}
                  aria-label="more"
                  onClick={(event) => handleMenuClick(event, index)}
                >
                  <MoreVertIcon
                    sx={{
                      color: "var(--primary-color)",
                    }}
                    fontSize="medium"
                  />
                </IconButton>

                <Menu
                  id={`productOptions-${index}`}
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    "aria-labelledby": `productOptions-${index}`,
                  }}
                  disableScrollLock={true}
                  elevation={1}
                  // onClick={() => {
                  //   setCheckedItems({});
                  //   dispatch(setSelectedProductsIDs([])); // Reset selected product IDs
                  // }}
                >
                  {duplicateFunction && (
                    <MenuItem
                      onClick={() => {
                        setIsDuplicateProductDialogOpen(true);
                        setCurrentItem(item);
                        handleMenuClose(index);
                      }}
                    >
                      <ContentCopyOutlinedIcon
                        aria-label="duplicate"
                        fontSize="small"
                        sx={{ marginRight: 1 }}
                      />
                      {getString("duplicate")}
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleEditClick(item);
                      handleMenuClose(index);
                    }}
                  >
                    <EditIcon
                      aria-label="edit"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    {getString("edit")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDeleteClick(item);
                      handleMenuClose(index);
                    }}
                  >
                    <DeleteOutlinedIcon
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    {getString("delete")}
                  </MenuItem>
                </Menu>
              </Box>
            </ListItem>
          </Paper>
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
            initialData={currentItem}
            data={selectedCategory?.products || []}
          />
          <AddProductDialog
            dialogTitle={getString("DuplicateProduct")}
            cancelText={getString("cancel")}
            confirmText={getString("add")}
            isDialogOpen={isDuplicateProductDialogOpen}
            onCancelClick={handleOnDuplicateProductDialogCancel}
            initialData={currentItem}
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

export default ItemsListView;
