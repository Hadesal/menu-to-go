import { fetchUserData } from "@redux/thunks/userThunks";
import { fetchAllRestaurants } from "@redux/thunks/restaurantThunks";
import { AppDispatch } from "@redux/store";
import { getErrorMessage } from "@utils/errorHandler";

// Function to fetch all required data for the dashboard
export const fetchAllData = async (
  dispatch: AppDispatch
): Promise<{ success: boolean; error?: string }> => {
  try {
    const user = await dispatch(fetchUserData()).unwrap();

    if (user) {
      await dispatch(fetchAllRestaurants(user.id)).unwrap();
      return { success: true };
    } else {
      return { success: false, error: "User data not found" };
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to fetch all data");
    return { success: false, error: errorMessage };
  }
};
