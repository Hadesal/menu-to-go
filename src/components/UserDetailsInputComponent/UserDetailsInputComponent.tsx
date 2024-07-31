import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Styles } from "../Dialogs/LogoutDialog/confirmDialog.style";
import { useTranslation } from "react-i18next";
import InputComponent from "../InputComponent/InputComponent";
import { useEffect, useState } from "react";
import { Styles as inputStyles } from "../../pages/LoginPage/LoginPage.style";
import logo from "../../assets/logo.svg";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addRestaurant } from "../../redux/slices/restaurantsSlice";
import { userUpdate } from "../../redux/slices/userSlice";
interface UserDetailsInputComponentProps {
  width?: string;
  height?: string;
  onClose?: () => void;
  isOpen: boolean;
}
interface userDetails {
  restaurantName: string;
  country: string;
  currency: string;
}
const UserDetailsInputComponent = ({
  width,
  height,
  onClose,
  isOpen,
}: UserDetailsInputComponentProps) => {
  const { t } = useTranslation();
  const getString = t;
  const [userDetails, setUserDetails] = useState<userDetails>({
    restaurantName: "",
    currency: "",
    country: "",
  });
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector((state) => state.userData);
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const userData = userList[0];
  useEffect(() => {
    setUserDetails((prevState) => {
      return {
        ...prevState,
        restaurantName: restaurantList.length > 0 ? restaurantList[0].name : "",
        country:
          userData?.billingData.country !== ""
            ? userData?.billingData.country
            : "",
        currency: userData?.currency !== "" ? userData?.currency : "",
      };
    });
  }, []);
  const handleUserDetails = () => {
    dispatch(
      addRestaurant({
        restaurant: { name: userDetails.restaurantName, table: [] },
      })
    );
    dispatch(
      userUpdate({
        updatedUser: {
          ...userData,
          billingData: {
            ...userData.billingData,
            country: userDetails.country,
          },
          currency: userDetails.currency,
        },
        userId: userData.id,
      })
    );
    console.log(userDetails);
  };
  return (
    <Dialog
      PaperProps={{ sx: { ...Styles.dialog, width: width, height: height } }}
      onClose={onClose}
      open={isOpen}
    >
      <DialogContent sx={{ alignContent: "center" }}>
        <img
          style={{ display: "block", margin: "0 auto" }}
          src={logo}
          alt="logo"
        />
        <Typography
          width={"100%"}
          variant="subtitle2"
          textAlign={"center"}
          sx={Styles.subTitle}
        >
          {getString("detailsText")}
        </Typography>
        <InputComponent
          id="restaurantNameField"
          type="name"
          label="Restaurant Name"
          required
          value={userDetails.restaurantName}
          InputPropStyle={{ borderRadius: "1rem" }}
          onChange={(e) => {
            setUserDetails((prevState) => ({
              ...prevState,
              restaurantName: e.target.value,
            }));
          }}
          boxStyle={inputStyles.input_box}
          textFieldStyle={inputStyles.inputStyle}
        />
        <InputComponent
          id="counrtyField"
          type="name"
          label="Country"
          required
          value={userDetails.country}
          InputPropStyle={{ borderRadius: "1rem" }}
          onChange={(e) => {
            setUserDetails((prevState) => ({
              ...prevState,
              country: e.target.value,
            }));
          }}
          boxStyle={inputStyles.input_box}
          textFieldStyle={inputStyles.inputStyle}
        />
        <InputComponent
          id="currencyField"
          type="name"
          label="Currency"
          value={userDetails.currency}
          required
          InputPropStyle={{ borderRadius: "1rem" }}
          onChange={(e) => {
            setUserDetails((prevState) => ({
              ...prevState,
              currency: e.target.value,
            }));
          }}
          boxStyle={inputStyles.input_box}
          textFieldStyle={inputStyles.inputStyle}
        />
        <Box sx={Styles.actionBox} justifyContent={"center"}>
          <Button
            variant="contained"
            onClick={handleUserDetails}
            sx={Styles.secondaryActionButton}
          >
            {getString("completeAccount")}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default UserDetailsInputComponent;
