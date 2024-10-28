import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import placeHolderImg from "../../../assets/catering-item-placeholder-704x520.png";
import { ProductData } from "../../../DataTypes/ProductDataTypes";
import DropDownMenuComponent from "../../DropDownMenu/DropDownMenuComponent";
import Styles from "../../../DataTypes/StylesTypes";

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

  return (
    <Paper
      key={item.id}
      elevation={3}
      sx={{
        ...styles.paperListView,
        background: checked ? "#FFF9F4" : "inherit",
      }}
    >
      <ListItem sx={styles.productListItem} key={item.id}>
        <Box sx={styles.productListItemBox}>
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
          >
            <DragIndicatorIcon fontSize="medium" />
          </IconButton>
          <img
            style={styles.productImg}
            src={item.image ? item.image : placeHolderImg}
            width={60}
            height={60}
          />
          <ListItemText
            primary={
              <Typography noWrap sx={styles.productName} variant="body1">
                {item.name}
              </Typography>
            }
          />
        </Box>
        <Box>
          <Typography sx={styles.productPrice} component="span">
            {item.price}$
          </Typography>
          <IconButton
            sx={styles.productMoreIcon}
            aria-label="more"
            onClick={(event) => onMenuClick(event, index)}
          >
            <MoreVertIcon fontSize="medium" />
          </IconButton>
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
