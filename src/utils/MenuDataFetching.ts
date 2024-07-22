import { fetchAllCategories } from "../redux/slices/menuSlice";
import { AppDispatch } from "../redux/store"; // Adjust the path as needed

export const fetchMenuData = async (dispatch: AppDispatch) => {
  const resultAction = await dispatch(
    fetchAllCategories({
      restaurantID: "4663af86-c1f3-44dd-a757-a69ed5c05e07",
    })
  );

  if (fetchAllCategories.fulfilled.match(resultAction)) {
    return { success: true };
  } else {
    // If the action was rejected, get the error message from the payload
    const error = resultAction.payload || "Unknown error occurred";
    console.log("Error fetching data:", error);
    return { success: false, error };
  }
};
