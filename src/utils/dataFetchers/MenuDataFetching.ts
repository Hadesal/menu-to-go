import { fetchRestaurantData } from "@slices/menuSlice";
import { AppDispatch } from "@redux/store";

type FetchMenuDataResult = { success: boolean; error?: string };

export const fetchMenuData = async (
  restaurantId: string,
  dispatch: AppDispatch
): Promise<FetchMenuDataResult> => {
  try {
    const resultAction = await dispatch(
      fetchRestaurantData({
        restaurantID: restaurantId,
      })
    );

    if (fetchRestaurantData.fulfilled.match(resultAction)) {
      return { success: true };
    }

    const error = (resultAction.payload as string) || "Unknown error occurred";
    return { success: false, error };
  } catch (err) {
    console.error("Unexpected error fetching menu data:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
};
