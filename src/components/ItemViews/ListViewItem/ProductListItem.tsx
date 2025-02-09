import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Skeleton } from "@mui/material";
import { currencies } from "../../common/Dialogs/UserDetailsDialog/Data/userDetailsData";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateProductInCategory as editProduct } from "@redux/thunks/productThunks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import placeHolderImg from "../../../assets/catering-item-placeholder-704x520.png";
import { ProductData } from "../../../DataTypes/ProductDataTypes";
import Styles from "../../../DataTypes/StylesTypes";
import DropDownMenuComponent from "../../common/DropDownMenu/DropDownMenuComponent";
interface ProductListItemProps {
  item: ProductData;
  index: number;
  checked: boolean;
  onCheckChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  anchorEl: HTMLElement | null;
  handleDuplicateClick: (item: ProductData) => void;
  handleEditClick: (item: ProductData) => void;
  handleDeleteClick: (item: ProductData) => void;
  styles: Styles;
}

const ListViewProductItem = ({
  item,
  index,
  checked,
  onCheckChange,
  onMenuClick,
  onMenuClose,
  anchorEl,
  handleDuplicateClick,
  handleEditClick,
  handleDeleteClick,
  styles,
}: ProductListItemProps) => {
  const { t } = useTranslation();
  const getString = t;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id || "" });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const { user } = useAppSelector((state) => state.userData);
  const menuItems = () => [
    {
      text: getString("duplicate"),
      icon: (
        <ContentCopyOutlinedIcon
          aria-label="duplicate"
          fontSize="small"
          sx={styles.dropDownMenuItemIcon}
        />
      ),
      onClick: () => handleDuplicateClick(item),
    },
    {
      text: getString("edit"),
      icon: <EditIcon fontSize="small" sx={styles.dropDownMenuItemIcon} />,
      onClick: () => handleEditClick(item),
    },
    {
      text: getString("delete"),
      icon: (
        <DeleteOutlinedIcon fontSize="small" sx={styles.dropDownMenuItemIcon} />
      ),
      onClick: () => handleDeleteClick(item),
    },
  ];

  const currencyObject = currencies.find(
    (curr) => curr.currency === user.currency
  );

  return (
    <Paper
      key={item.id}
      elevation={3}
      sx={{
        ...styles.paperListView,
        background: checked ? "#FFF9F4" : "inherit",
        opacity: item.isSoldOut || !item.isAvailable ? 0.8 : 1,
        filter:
          item.isSoldOut || !item.isAvailable ? "grayscale(100%)" : "none", // Apply grayscale if sold out and unavailable
      }}
      {...attributes}
      style={style}
    >
      <ListItem ref={setNodeRef} sx={styles.productListItem} key={item.id}>
        <Box
          sx={{
            ...styles.productListItemBox,
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => item.id && onCheckChange(e, item.id)}
            inputProps={{ "aria-label": "controlled" }}
            sx={styles.productCheckBox}
          />
          <IconButton
            sx={{
              ...styles.iconButton,
              cursor: "grab",
              color: "var(--primary-color)",
            }}
            aria-label="drag"
            {...listeners}
          >
            <DragIndicatorIcon fontSize="medium" />
          </IconButton>
          <Box>
            <div style={{ width: 60, height: 60, position: "relative" }}>
              {/* Show skeleton only while retrieving the image */}
              {loading && !error && (
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={60}
                  animation="pulse"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: 1,
                  }}
                />
              )}

              <img
                src={
                  item.image !== "" ? (item.image as string) : placeHolderImg
                }
                width={60}
                height={60}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  display: loading ? "none" : "block",
                }}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setError(true);
                  setLoading(false);
                }}
              />
            </div>
          </Box>
          <ListItemText
            primary={
              <Tooltip arrow title={item.name}>
                <Typography
                  sx={{
                    ...styles.productName,
                    minWidth: 0, // Ensures truncation within available space
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body1"
                >
                  {item.name}
                </Typography>
              </Tooltip>
            }
          />
          {item.isSoldOut && (
            <Chip
              sx={{ display: { xs: "none", sm: "inherit" } }}
              color="error"
              label={getString("isSoldOut")}
              variant="outlined"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              ...styles.productPrice,
              display: { xs: "none", sm: "block" },
            }}
            component="span"
          >
            {item.price} {currencyObject?.symbol}
          </Typography>
          <Box sx={styles.iconsBox}>
            <Tooltip
              title={
                item.isAvailable
                  ? getString("productAvailable")
                  : getString("productNotAvailable")
              }
            >
              <IconButton
                sx={{ ...styles.productMoreIcon, marginRight: 1 }}
                aria-label="availability"
                onClick={() => {
                  if (selectedCategory?.id && item?.id) {
                    dispatch(
                      editProduct({
                        categoryId: selectedCategory.id,
                        productId: item.id,
                        updatedProduct: {
                          ...item,
                          isAvailable: !item.isAvailable,
                        },
                      })
                    );
                  }
                }}
              >
                {item.isAvailable ? (
                  <VisibilityIcon
                    sx={{ display: { xs: "none", sm: "block" } }}
                    fontSize="medium"
                  />
                ) : (
                  <VisibilityOffIcon
                    sx={{ display: { xs: "none", sm: "block" } }}
                    fontSize="medium"
                  />
                )}
              </IconButton>
            </Tooltip>
            <IconButton
              sx={styles.productMoreIcon}
              aria-label="more"
              onClick={(event) => onMenuClick(event, index)}
            >
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          </Box>
          <DropDownMenuComponent
            menuItems={menuItems()}
            open={Boolean(anchorEl)}
            onClose={() => onMenuClose(index)}
            anchorEl={anchorEl}
            idPrefix="productOptions"
            index={index}
          />
        </Box>
      </ListItem>
    </Paper>
  );
};

export default ListViewProductItem;
