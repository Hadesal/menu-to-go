import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import placeHolderImg from "../../assets/catering-item-placeholder-704x520.png";
import Styles from "../../DataTypes/StylesTypes";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import { ProductData } from "../../DataTypes/ProductDataTypes";
import AddProductDialog from "../Dialogs/AddItemDialog/addProductDialog";

interface Props {
  items: any[];
  editFunction: (item: ProductData) => void;
  deleteFunction: (item: ProductData) => void;
  styles: Styles;
}
const ItemsListView = ({
  items,
  editFunction,
  deleteFunction,
  styles,
}: Props): JSX.Element => {
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );
  const { t } = useTranslation();
  const getString = t;

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };
  //const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ProductData>({
    details: {},
    id: "",
    image: null,
    isAvailable: true,
    name: "",
    price: 0,
    uniqueProductOrderingName: "",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
    //setOpen(true);
  };

  const handleDeleteClick = (item) => {
    console.log(currentItem);
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  return (
    <Container sx={styles.container}>
      <List sx={styles.list}>
        {items.map((item, index) => (
          <Paper key={item.id} elevation={3} sx={styles.paperListView}>
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
                  gap: 2,
                }}
              >
                <IconButton
                  sx={{
                    padding: 0.8,
                    cursor: "grab",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  aria-label="more"
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
                  id={`categoryOptions-${index}`}
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    "aria-labelledby": `categoryOptions-${index}`,
                  }}
                  disableScrollLock={true}
                  elevation={1}
                >
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
      <AddProductDialog
        dialogTitle={"Edit category"}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={isEditDialogOpen}
        onCancelClick={handleEditDialogClose}
        onConfirmClick={(data) => editFunction({ ...data, id: currentItem.id })}
        initialData={currentItem}
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
    </Container>
  );
};

export default ItemsListView;
