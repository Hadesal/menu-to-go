import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import AddItemDialog from "../Dialogs/AddItemDialog/addItemDialog";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";
import { useTranslation } from "react-i18next";
import { Cancel } from "@mui/icons-material";

interface GridViewProps {
  items: any[];
  deleteFunction: (item: object) => void;
  editFunction: (item: object) => void;
  styles: any;
  CardIcon: string;
}

const ItemsGridView = ({
  CardIcon,
  items,
  deleteFunction,
  editFunction,
  styles,
}: GridViewProps): JSX.Element => {
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<RestaurantData>({
    name: "",
  });
  const { t } = useTranslation();
  const getString = t;

  const handleEditDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
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

  const handleEditClick = (item: RestaurantData) => {
    setCurrentItem(item);
    setIsUpdateDialogOpen(true);
  };
  const handleDeleteClick = (item: RestaurantData) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Grid container spacing={4}>
      {items.map((item: any, index: number) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper elevation={3} sx={styles.gridPaper}>
            <Card sx={styles.card}>
              <CardContent sx={{ ...styles.cardContent, position: "relative" }}>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: 0.8,
                    background: "#A4755D30",
                    "&:hover": {
                      background: "#A4755D30",
                    },
                  }}
                  aria-label="more"
                  onClick={(event) => handleMenuClick(event, index)}
                >
                  <MoreVertIcon fontSize="small" color="primary" />
                </IconButton>
                <Menu
                  id={`resturantOptions-${index}`}
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    "aria-labelledby": `resturantOptions-${index}`,
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
                  <MenuItem
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    <FileCopyIcon fontSize="small" sx={{ marginRight: 1 }} />
                    {getString("duplicate")}
                  </MenuItem>
                </Menu>
                <Stack direction="column" sx={styles.stackColumn}>
                  <img
                    style={{
                      display: "block",
                      margin: "0 auto",
                      opacity: 0.5,
                      mixBlendMode: "multiply",
                    }}
                    width={140}
                    height={140}
                    src={CardIcon}
                  />
                  <Typography
                    sx={{
                      marginTop: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "90%",
                    }}
                    noWrap
                    variant="h6"
                    title={item.name}
                  >
                    {item.name}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
      <AddItemDialog
        title={getString("updateRestaurant")}
        fileUpload={false}
        errorMessage={getString("restaurantError")}
        cancelText={getString("cancel")}
        confirmText={getString("update")}
        isOpen={isUpdateDialogOpen}
        onCancelClick={handleEditDialogClose}
        onConfirmClick={(newRestaurantName) => {
          const newRestaurant = {
            ...currentItem,
            name: newRestaurantName.name.trim(),
          };
          editFunction(newRestaurant);
          handleEditDialogClose();
        }}
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
        subTitle={`${getString("restaurantDeleteText")}`}
      />
    </Grid>
  );
};

export default ItemsGridView;
