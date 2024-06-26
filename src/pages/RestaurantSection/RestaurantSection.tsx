import { Divider, Stack, Typography } from "@mui/material";
import styles from "./RestaurantSection.styles";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import BoxComponent from "../../components/DialogComponent/BoxComponent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useSelector } from "react-redux";
interface RestaurantSectionProps {
  label: string;
}
const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const restaurantState = useSelector((state) => state.restaurant);
  const restaurants: RestaurantData[] = [
    { id: "1", name: "Restaurant 1", table: [] },
    { id: "2", name: "Restaurant 2", table: [] },
    { id: "3", name: "Restaurant 3", table: [] },
    { id: "4", name: "Restaurant 4", table: [] },
    { id: "5", name: "Restaurant 5", table: [] },
  ];
  const editRestaurant = (restaurant: object): void => {};
  const deleteRestaurant = (restaurant: object) => {};
  const addRestaurant = () => {
    deleteRestaurant;
  };
  return (
    <Stack spacing={3} sx={styles.stack}>
      <Typography variant="h5">{label}</Typography>
      <Divider />
      <BoxComponent
        CardIcon={RestaurantIcon}
        items={restaurants}
        addFunction={addRestaurant}
        editFunction={editRestaurant}
        deleteFunction={deleteRestaurant}
        styles={styles}
      />
    </Stack>
  );
};

export default RestaurantSection;
