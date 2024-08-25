import { fetchUserData } from "../redux/slices/userSlice";
import { fetchAllRestaurants } from "../redux/slices/restaurantsSlice";
import { AppDispatch } from "../redux/store";
export const fetchAllData = async (dispatch: AppDispatch) => {
  try {
    const user = await dispatch(fetchUserData()).unwrap();

    if (user.length > 0) {
      await dispatch(fetchAllRestaurants({ userID: user[0].id })).unwrap();
      return { success: true };
    }
  } catch (error) {
    if (error.message) {
      return { success: false, error: error?.message };
    } else {
      {
        return { success: false, error: error };
      }
    }
  }
};
