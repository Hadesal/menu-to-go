import { fetchUserData } from "../redux/slices/userSlice";
import { fetchAllRestaurants } from "../redux/slices/restaurantsSlice";
import { getUserData } from "../services/api/userCrud";
import { AppDispatch } from "../redux/store";
export const fetchAllData = async (dispatch: AppDispatch) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    await dispatch(fetchUserData()).unwrap();

    const user = await getUserData(userToken.token);
    await dispatch(fetchAllRestaurants({ userID: user.id })).unwrap();

    return { success: true };
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
