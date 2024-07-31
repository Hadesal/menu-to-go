import { fetchUserData } from "../redux/slices/userSlice";
import { fetchAllRestaurants } from "../redux/slices/restaurantsSlice";
import { getUserData } from "../services/api/userCrud";
import { AppDispatch } from "../redux/store";

export const fetchAllData = async (dispatch: AppDispatch) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    await dispatch(fetchUserData());

    const user = await getUserData(userToken.token);
    await dispatch(fetchAllRestaurants({ userID: user.id }));

    return { success: true };
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
