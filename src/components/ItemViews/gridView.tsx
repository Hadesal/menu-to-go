/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  setSelectedCategory,
  setSelectedRestaurant,
} from "@slices/restaurantsSlice";
import { useTranslation } from "react-i18next";
import { useItemDialogHandlers } from "src/hooks/useItemDialogHandlers";
import useMenu from "src/hooks/useMenu";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import AddRestaurantDialog from "@components/common/Dialogs/AddItemDialog/addRestaurantDialog";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import DropDownMenuComponent from "../common/DropDownMenu/DropDownMenuComponent";
export type itemsType = ProductData[] | CategoryData[] | RestaurantData[];

interface GridViewProps {
  items: RestaurantData[];
  deleteFunction: (id: string) => void;
  editFunction: (item: object) => void;
  styles: any;
  CardIcon: string;
}

const GridView = ({
  CardIcon,
  items,
  deleteFunction,
  editFunction,
  styles,
}: GridViewProps) => {
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const { anchorEls, handleMenuClick, handleMenuClose } = useMenu(items.length);

  const {
    currentItem,
    isDeleteDialogOpen,
    isEditDialogOpen,
    handleEditClick,
    handleDeleteClick,
    handleDeleteDialogClose,
    handleEditDialogClose,
  } = useItemDialogHandlers();

  const generateMenuItems = (item: RestaurantData) => [
    {
      text: getString("edit"),
      icon: <EditIcon fontSize="small" sx={styles.menuItemIcon} />,
      onClick: () => handleEditClick(item),
    },
    {
      text: getString("delete"),
      icon: <DeleteOutlinedIcon fontSize="small" sx={styles.menuItemIcon} />,
      onClick: () => handleDeleteClick(item),
    },
  ];

  return (
    <Grid container spacing={4}>
      {items.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Paper elevation={3} sx={styles.gridPaper}>
            <Card
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                dispatch(setSelectedRestaurant(item));
                dispatch(setSelectedCategory(item.categories?.[0] ?? {}));
              }}
              sx={styles.card}
            >
              <CardHeader
                sx={styles.cardHeader}
                action={
                  <IconButton
                    sx={styles.cardHeaderActionButton}
                    aria-label="more"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleMenuClick(event, index);
                    }}
                  >
                    <MoreVertIcon fontSize="small" color="primary" />
                  </IconButton>
                }
              />
              <CardContent sx={styles.cardContent}>
                <DropDownMenuComponent
                  menuItems={generateMenuItems(item)}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  anchorEl={anchorEls[index]}
                  idPrefix="restaurantOptions"
                  index={index}
                />
                <Stack direction="column" sx={styles.cardContentBody}>
                  <img
                    style={styles.cardContentBodyImg}
                    width={140}
                    height={140}
                    src={CardIcon}
                    alt={item.name}
                  />
                  <Tooltip arrow title={item.name}>
                    <Typography
                      sx={styles.cardContentBodyText}
                      noWrap
                      variant="h6"
                    >
                      {item.name}
                    </Typography>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
      <AddRestaurantDialog
        title={getString("updateRestaurant")}
        errorMessage={getString("restaurantError")}
        cancelText={getString("cancel")}
        confirmText={getString("update")}
        isOpen={isEditDialogOpen}
        onCancelClick={handleEditDialogClose}
        onConfirmClick={(newRestaurantName) => {
          const newRestaurant = {
            ...currentItem,
            name: newRestaurantName.name,
          };
          editFunction(newRestaurant);
        }}
        initialData={currentItem as RestaurantData}
        data={restaurantList}
      />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onPrimaryActionClick={() => {
          if (currentItem && currentItem.id) {
            deleteFunction(currentItem.id);
            handleDeleteDialogClose();
          }
        }}
        onSecondaryActionClick={handleDeleteDialogClose}
        onClose={handleDeleteDialogClose}
        width="500px"
        height="300px"
        showImg={false}
        secondaryActionText={getString("cancel")}
        primaryActionText={getString("delete")}
        title={getString("deleteConfirmText")}
        subTitle={getString("restaurantDeleteText", {
          restaurantName: currentItem?.name,
        })}
      />
    </Grid>
  );
};

export default GridView;
