import { fetchUserData } from "../redux/slices/userSlice";
import { fetchAllRestaurants } from "../redux/slices/restaurantsSlice";
import { getUserData } from "../services/api/userCrud";

export const fetchData = async (dispatch) => {
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
