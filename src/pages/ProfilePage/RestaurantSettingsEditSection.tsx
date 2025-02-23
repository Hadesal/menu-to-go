/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import { currencies } from "../../components/common/Dialogs/UserDetailsDialog/Data/userDetailsData";
import "./ProfilePage.css";

import { defaultUserData } from "@constants/defaultObjects";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { updateRestaurantsCurrency } from "@redux/thunks/restaurantThunks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserDataType } from "../../DataTypes/UserDataTypes";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { updateUser } from "../../redux/thunks/userThunks";

interface RestaurantSettingsEditSectionProps {
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface Country {
  id: string;
  name: string;
}

const RestaurantSettingsEditSection = ({
  setToastVisible,
  setIsEditing,
}: RestaurantSettingsEditSectionProps) => {
  const { t } = useTranslation();
  const getString = t;
  const { user, loading } = useAppSelector((state) => state.userData);
  const { restaurantLoading } = useAppSelector(
    (state) => state.restaurantsData
  );
  const [formData, setFormData] = useState<UserDataType>(
    user ?? defaultUserData
  );
  const dispatch = useAppDispatch();
  const [severity, setSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    setFormData(user ?? defaultUserData);
  }, [user]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const isFormDataChanged = (
    formData: UserDataType,
    userData: UserDataType
  ): boolean => {
    return formData.currency !== userData.currency;
  };

  function isUserDataType(response: any): response is UserDataType {
    return typeof response === "object" && "id" in response;
  }
  const handleSaveCurrencyUpdate = () => {
    // Check if form data has changed before proceeding
    if (!isFormDataChanged(formData, user!)) {
      setToastMessage(getString("dataNotChanged"));
      setShowToast(true);
      setSeverity("warning");
      return;
    }

    // Dispatch action to update restaurant currency
    dispatch(
      updateRestaurantsCurrency({
        userId: user!.id,
        currency: formData.currency as string,
      })
    ).then((currencyResponse: any) => {
      // Handle currency update failure
      if (currencyResponse.error) {
        setToastMessage(
          currencyResponse.payload?.message || "Currency update failed."
        );
        setSeverity("error");
        return;
      }

      // Verify if the restaurant currency update was successful
      const updatedRestaurantIds =
        currencyResponse.payload?.data?.updatedRestaurantIds;
      if (!Array.isArray(updatedRestaurantIds)) {
        console.error("Failed to update currency");
        setToastMessage("Failed to update currency.");
        setSeverity("error");
        setToastVisible(true);
        return;
      }

      // Prepare updated user data
      const updatedUserData = { ...user!, currency: formData.currency };

      // Dispatch action to update user details
      dispatch(
        updateUser({ updatedUser: updatedUserData, userId: user!.id })
      ).then((userResponse: any) => {
        if (typeof userResponse === "string") {
          setToastMessage(userResponse);
          setSeverity("error");
          return;
        }

        // Handle successful user data update
        if (isUserDataType(userResponse.payload)) {
          setSeverity("success");
          setToastVisible(true);
          setShowToast(true);
          onCancel(); // Close dialog or reset form
        } else {
          // Handle unknown error case
          const errorMessage =
            userResponse?.message || getString("unknownError");
          setToastMessage(errorMessage);
          setSeverity("error");
        }
      });
    });
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Box>
        <Backdrop
          sx={{
            color: "var(--primary-color)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading || restaurantLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showToast}
          autoHideDuration={6000}
          onClose={() => setShowToast(false)}
        >
          <Alert
            onClose={() => setShowToast(false)}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <Container
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">{getString("editBillingData")}</Typography>
          </Container>
          <Typography variant="subtitle1" sx={{ color: "#797979" }}>
            {getString("restaurantSettingsPageDescription")}
          </Typography>
        </Container>

        <Container
          disableGutters
          sx={{ display: "flex", flexDirection: "row", marginTop: 3 }}
        >
          <Container
            sx={{
              marginTop: "0.5rem",
            }}
          >
            <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
              {getString("completeRegistrationCurrencyLabel")}
            </Typography>
            <Select
              id="currencyField"
              value={formData?.currency as string}
              name="currency"
              onChange={handleSelectChange}
              sx={{
                width: "100%",
                borderRadius: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.currency} value={currency.currency}>
                  {currency.currency}
                </MenuItem>
              ))}
            </Select>
          </Container>
        </Container>

        <Container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            padding: 0,
            marginTop: 2,
          }}
        >
          <Button
            sx={{ borderRadius: "1rem", marginRight: "2rem" }}
            variant="outlined"
            startIcon={<CloseOutlinedIcon />}
            onClick={onCancel}
          >
            {getString("cancel")}
          </Button>
          <Button
            sx={{
              borderRadius: "1rem",
              backgroundColor: "var(--primary-color)",
              border: "1px solid transparent",
              color: "white",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "var(--primary-color)",
                boxShadow: "none",
                color: "var(--primary-color)",
              },
            }}
            variant="contained"
            startIcon={<DoneOutlineOutlinedIcon />}
            onClick={handleSaveCurrencyUpdate}
            disabled={!isFormDataChanged(formData, user!)}
          >
            {getString("save")}
          </Button>
        </Container>
      </Box>
    </>
  );
};
export default RestaurantSettingsEditSection;
