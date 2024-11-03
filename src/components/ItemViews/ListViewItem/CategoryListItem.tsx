import { CategoryData } from "@dataTypes/CategoryDataTypes";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Styles from "../../../DataTypes/StylesTypes";
import { useAppSelector } from "@redux/reduxHooks";
import { useTranslation } from "react-i18next";
import DropDownMenuComponent from "../../common/DropDownMenu/DropDownMenuComponent";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CategoryListItemProps {
  item: CategoryData;
  index: number;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  itemClick: (item: CategoryData) => void;
  anchorEl: HTMLElement | null;
  handleEditClick: (item: CategoryData) => void;
  handleDeleteClick: (item: CategoryData) => void;
  styles: Styles;
  length: number;
}

const CategoryListItemItem = ({
  item,
  index,
  onMenuClick,
  onMenuClose,
  anchorEl,
  handleEditClick,
  handleDeleteClick,
  itemClick,
  styles,
  length,
}: CategoryListItemProps) => {
  const { t } = useTranslation();
  const getString = t;
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const menuItems = () => [
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
    <ListItem
      onClick={() => {
        itemClick(item);
      }}
      ref={setNodeRef}
      {...attributes}
      style={style}
      sx={{
        ...styles.categoryListItem,
        borderRadius: index === length - 1 ? "0 0 16px 16px" : "0",
        background:
          selectedCategory?.id === item.id ? "var(--primary-color)" : "initial",
      }}
      key={item.id}
    >
      <Box sx={{ ...styles.categoryListItemBox, display: "flex", minWidth: 0 }}>
        <ListItemText
          primary={
            <Box sx={styles.categoryListItemTextWrapper}>
              <IconButton
                sx={{ ...styles.iconButton, cursor: "grab" }}
                aria-label="more"
                {...listeners}
              >
                <DragIndicatorIcon
                  sx={{
                    color:
                      selectedCategory?.id === item.id
                        ? styles.selectedCategoryColor
                        : styles.defaultCategoryColor,
                  }}
                  fontSize="medium"
                />
              </IconButton>
              <Box
                sx={{
                  minWidth: 0,
                  display: "flex",
                }}
              >
                <Typography
                  title={item.name}
                  sx={styles.categoryName}
                  variant="body1"
                  color={
                    selectedCategory?.id === item.id
                      ? "white"
                      : "var(--primary-color)"
                  }
                >
                  {item.name}
                </Typography>
                <Typography
                  title={item?.products?.length.toString()}
                  color={selectedCategory?.id === item.id ? "white" : "#BCB8B1"}
                  sx={styles.categoryItemsLengthText}
                  component="span"
                >
                  ({item?.products?.length})
                </Typography>
              </Box>
            </Box>
          }
        />
      </Box>
      <IconButton
        sx={{
          ...styles.iconButton,
          flexShrink: 0,
        }}
        aria-label="more"
        onClick={(event) => onMenuClick(event, index)}
      >
        <MoreVertIcon
          sx={{
            color:
              selectedCategory?.id === item.id
                ? styles.selectedCategoryColor
                : styles.defaultCategoryColor,
          }}
          fontSize="small"
        />
      </IconButton>
      <DropDownMenuComponent
        menuItems={menuItems()}
        open={Boolean(anchorEl)}
        onClose={() => onMenuClose(index)}
        anchorEl={anchorEl}
        idPrefix="categoryOptions"
        index={index}
      />
    </ListItem>
  );
};

export default CategoryListItemItem;
