import { Divider, Stack, Typography } from "@mui/material";
import styles from "./RestaurantSection.styles";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import {
  addRestaurant,
  deleteRestaurant,
  editRestaurant,
  setRestaurantList,
} from "../../redux/slices/restaurantsSlice";
import { getAllRestaurantsByUserId } from "../../services/api/restaurantCrud";
import { getUserData } from "../../services/api/userCrud";
import { RestaurantData } from "../../DataTypes/RestaurantObject";

interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const userToken = localStorage.getItem("userToken");
  const dispatch = useAppDispatch();
  const { restaurantList, loading, error } = useAppSelector(
    (state) => state.restaurantsData
  );

  const retriveUserAndRestaurantsdata = async () => {
    const user = await getUserData(userToken);
    const restaurantData = await getAllRestaurantsByUserId(
      user.id,
      userToken as string
    );
    dispatch(setRestaurantList(restaurantData));
  };

  useEffect(() => {
    retriveUserAndRestaurantsdata();
  }, []);

  const handleAddRestaurant = (restaurant: RestaurantData) => {
    dispatch(addRestaurant({ restaurant, token: userToken as string }));
  };

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    dispatch(editRestaurant({ restaurant, token: userToken as string }));
  };

  const handleDeleteRestaurant = (restaurant: RestaurantData) => {
    dispatch(
      deleteRestaurant({
        restaurantId: restaurant.id,
        token: userToken as string,
      })
    );
  };

  return (
    <Stack spacing={3} sx={styles.stack}>
      <Typography variant="h5">{label}</Typography>
      <Divider />
      <BoxComponent
        CardIcon={RestaurantIcon}
        items={restaurantList}
        addFunction={handleAddRestaurant}
        editFunction={handleEditRestaurant}
        deleteFunction={handleDeleteRestaurant}
        styles={styles}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </Stack>
  );
};

export default RestaurantSection;
