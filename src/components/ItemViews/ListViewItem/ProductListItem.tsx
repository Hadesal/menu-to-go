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
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import placeHolderImg from "../../../assets/catering-item-placeholder-704x520.png";
import { ProductData } from "../../../DataTypes/ProductDataTypes";
import DropDownMenuComponent from "../../common/DropDownMenu/DropDownMenuComponent";
import Styles from "../../../DataTypes/StylesTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
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
            <img
              style={styles.productImg}
              src={item.image ? item.image : placeHolderImg}
              width={60}
              height={60}
            />
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
