import { Divider, Stack, Typography } from "@mui/material";
import styles from "./RestaurantSection.styles";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useEffect, useState } from "react";
import {
  createRestaurant,
  getAllRestaurantsByUserId,
} from "../../services/api/restaurantCrud";
import { getUserData } from "../../services/api/userCrud";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
interface RestaurantSectionProps {
  label: string;
}
const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const userToken = localStorage.getItem("userToken");
  const [userData, setUserData] = useState();
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const retriveUserAndRestaurantsdata = async (token: string | null) => {
    const user = await getUserData(userToken);
    setUserData(user);
    const restaurantData = await getAllRestaurantsByUserId(
      user.id,
      userToken as string
    );
    setRestaurants(restaurantData);
  };
  useEffect(() => {
    retriveUserAndRestaurantsdata(userToken);
  }, []);
  const editRestaurant = (restaurant: object): void => {};
  const deleteRestaurant = (restaurant: object) => {};
  const addRestaurant = async (restaurant: RestaurantData) => {
    createRestaurant(restaurant, userToken as String).then((data) => {
      setRestaurants((prev) => [...prev, restaurant]);
    });
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
