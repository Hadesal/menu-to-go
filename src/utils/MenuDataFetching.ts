import { fetchRestaurantData } from "../redux/slices/menuSlice";
import { AppDispatch } from "../redux/store"; // Adjust the path as needed

export const fetchMenuData = async (
  restaurantId: string,
  dispatch: AppDispatch
) => {
  const resultAction = await dispatch(
    fetchRestaurantData({
      restaurantID: restaurantId,
    })
  );

  if (fetchRestaurantData.fulfilled.match(resultAction)) {
    return { success: true };
  } else {
    // If the action was rejected, get the error message from the payload
    const error = resultAction.payload || "Unknown error occurred";
    console.log("Error fetching data:", error);
    return { success: false, error };
  }
};
