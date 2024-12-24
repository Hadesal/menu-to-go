import InputComponent from "@components/InputComponent/InputComponent";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControl,
} from "@mui/material";
import { Styles as inputStyles } from "@pages/LoginPage/LoginPage.style";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { addRestaurant } from "@redux/thunks/restaurantThunks";
import { updateUser } from "@redux/thunks/userThunks";
import { fetchAllData } from "@utils/dataFetchers/DashboaredDataFetching";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Styles } from "../LogoutDialog/confirmDialog.style";
import { countries, currencies } from "./Data/userDetailsData";

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
  const { user } = useAppSelector((state) => state.userData);
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const [errors, setErrors] = useState({
    restaurantName: false,
    country: false,
    currency: false,
  });

  useEffect(() => {
    setUserDetails((prevState) => {
      return {
        ...prevState,
        restaurantName: restaurantList.length > 0 ? restaurantList[0].name : "",
        country: user?.billingData?.country || "",
        currency: user?.currency || "",
      };
    });
  }, [restaurantList, user?.billingData?.country, user?.currency]);
  const handleUserDetails = async () => {
    const newErrors = {
      restaurantName: !userDetails.restaurantName.trim(),
      country: !userDetails.country.trim(),
      currency: !userDetails.currency.trim(),
    };

    setErrors(newErrors);

    // Only proceed if there are no validation errors
    if (
      !newErrors.restaurantName &&
      !newErrors.country &&
      !newErrors.currency
    ) {
      await dispatch(
        addRestaurant({
          name: userDetails?.restaurantName,
          tables: [],
          categories: [],
          userUiPreferences: undefined,
        })
      );
      await dispatch(
        updateUser({
          updatedUser: {
            ...user!,
            billingData: {
              ...user!.billingData,
              country: userDetails.country,
            },
            currency: userDetails.currency,
          },
          userId: user!.id,
        })
      );
      await fetchAllData(dispatch);
    }
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);

    setUserDetails((prevState) => ({
      ...prevState,
      country: event.target.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      country: false,
    }));
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);

    setUserDetails((prevState) => ({
      ...prevState,
      currency: event.target.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      currency: false,
    }));
  };

  return (
    <Dialog
      PaperProps={{ sx: { ...Styles.dialog, width: width, height: height } }}
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle
        sx={{
          fontSize: "1.4rem",
          color: "#797979",
          textAlign: "center",
          paddingBottom: 0,
        }}
      >
        Let's get your restaurant ready!
      </DialogTitle>
      <DialogContent sx={{ alignContent: "center" }}>
        <Typography
          width={"100%"}
          variant="subtitle2"
          textAlign={"center"}
          sx={Styles.subTitle}
        >
          {getString("detailsText")}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <InputLabel
            sx={{
              textFieldLabelStyle: {
                color: "#797979",
                fontWeight: "400",
                marginBottom: 0,
              },
            }}
          >
            Restaurant Name
          </InputLabel>
          <InputComponent
            id="restaurantNameField"
            type="name"
            label=""
            required
            value={userDetails.restaurantName}
            InputPropStyle={{ borderRadius: "1rem" }}
            onChange={(e) => {
              setUserDetails((prevState) => ({
                ...prevState,
                restaurantName: e.target.value,
              }));

              setErrors((prev) => ({
                ...prev,
                restaurantName: !e.target.value.trim(),
              }));
            }}
            boxStyle={inputStyles.input_box}
            textFieldStyle={inputStyles.inputStyle}
            error={errors.restaurantName}
            MAXCHARSLENGTH={25}
            helperText={
              errors.restaurantName
                ? "Name cannot be empty"
                : `${userDetails.restaurantName.length}/25`
            }
          />
        </Box>

        <InputLabel id="restaurant-country">Country</InputLabel>
        <FormControl sx={{ width: "100%" }} error={errors.country === true}>
          <Select
            labelId="restaurant-country"
            id="restaurantCountryDropdownId"
            value={selectedCountry}
            onChange={handleCountryChange}
            sx={{
              width: "100%",
              borderRadius: "1rem",
              marginTop: "0.5rem",
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <InputLabel sx={{ marginTop: 2 }} id="restaurant-currency">
          Currency
        </InputLabel>
        <FormControl sx={{ width: "100%" }} error={errors.currency === true}>
          <Select
            labelId="restaurant-currency"
            id="restaurantCurrencyDropdownId"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            sx={{
              width: "100%",
              borderRadius: "1rem",
              marginTop: "0.5rem",
            }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.currency} value={currency.currency}>
                {currency.currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
