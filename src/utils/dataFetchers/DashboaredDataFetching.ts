import { fetchUserData } from "@redux/thunks/userThunks";
import { fetchAllRestaurants } from "@redux/thunks/restaurantThunks";
import { AppDispatch } from "@redux/store";
import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";

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
    const errorResponse = error as ErrorResponseObject;
    return { success: false, error: errorResponse.errors.name };
  }
};
