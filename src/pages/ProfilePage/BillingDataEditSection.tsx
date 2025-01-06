/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "./ProfilePage.css";
import { countries } from "../../components/common/Dialogs/UserDetailsDialog/Data/userDetailsData";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { BillingDataType, UserDataType } from "../../DataTypes/UserDataTypes";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { updateUser } from "../../redux/thunks/userThunks";
import { defaultUserData } from "@constants/defaultObjects";

interface BillingDataEditSectionProps {
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface Country {
  id: string;
  name: string;
}

const sortCountriesAlphabetically = (countriesList: Country[]): Country[] => {
  return countriesList.slice().sort((a, b) => a.name.localeCompare(b.name));
};

const BillingDataEditSection = ({
  setToastVisible,
  setIsEditing,
}: BillingDataEditSectionProps) => {
  const { t } = useTranslation();
  const getString = t;
  const { user, loading } = useAppSelector((state) => state.userData);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      billingData: { ...prevValue.billingData!, [name]: value },
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      billingData: { ...prevValue.billingData!, [name]: value },
    }));
  };

  function isUserDataType(response: any): response is UserDataType {
    return typeof response === "object" && "id" in response;
  }
  const isFormDataChanged = (
    formData: UserDataType,
    userData: UserDataType
  ): boolean => {
    // Compare email directly, ensuring trimming to avoid discrepancies
    if (formData.email?.trim() !== userData.email?.trim()) return true;

    // Check if billingData exists in both formData and userData
    if (formData.billingData && userData.billingData) {
      for (const key in formData.billingData) {
        const formValue = formData.billingData[key as keyof BillingDataType];
        const userValue = userData.billingData[key as keyof BillingDataType];

        // Handle string comparison with trimming
        if (typeof formValue === "string" && typeof userValue === "string") {
          if (formValue.trim() !== userValue.trim()) {
            return true;
          }
        } else {
          // Fallback for direct comparison of other types
          if (formValue !== userValue) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const handleOnSave = () => {
    if (isFormDataChanged(formData, user!)) {
      // Updated regex to match either "+" or country codes like +20, +43, etc.
      const onlyCountryCode = /^\+(\d+)?$/;

      // Check if phone number is only a "+" or a country code and set it to an empty string
      const updatedPhoneNumber = onlyCountryCode.test(
        formData.billingData?.phoneNumber || ""
      )
        ? ""
        : formData.billingData?.phoneNumber;

      // Update formData with the cleaned phone number before saving
      const updatedFormData = {
        ...formData,
        billingData: {
          ...formData.billingData,
          phoneNumber: updatedPhoneNumber,
        },
      };
      dispatch(
        updateUser({ updatedUser: updatedFormData, userId: user!.id })
      ).then((value) => {
        const response = value.payload;
        if (typeof response === "string") {
          setToastMessage(response);
          setSeverity("error");
        } else if (isUserDataType(response)) {
          setToastVisible(true);
          onCancel();
        } else {
          const errorMessage =
            (response as any)?.message || getString("unknownError");
          setToastMessage(errorMessage);
          setSeverity("error");
        }

        setShowToast(true);
      });
    } else {
      setToastMessage(getString("dataNotChanged"));
      setShowToast(true);
      setSeverity("warning");
      return;
    }
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
          open={loading}
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
            {getString("billingDataPageDescription")}
          </Typography>
        </Container>
        <Container
          sx={{
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
            {getString("fullName")}
          </Typography>
          <InputComponent
            name="fullName"
            id="nameField"
            type="Name"
            label=""
            textFieldStyle={{
              width: "100%",
              padding: "0",
              marginTop: "0.5rem",
            }}
            InputPropStyle={{ borderRadius: "0.5rem" }}
            boxStyle={{ flexGrow: 1 }}
            value={formData?.billingData?.fullName}
            onChange={handleInputChange}
          />
        </Container>
        <Container
          sx={{
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
            {getString("email")}
          </Typography>
          <InputComponent
            id="emailField"
            name="email"
            type="Email"
            label=""
            textFieldStyle={{
              width: "100%",
              padding: "0",
              marginTop: "0.5rem",
            }}
            InputPropStyle={{ borderRadius: "0.5rem" }}
            boxStyle={{ flexGrow: 1 }}
            value={formData?.email as string}
            readOnly={true}
            disabled={true}
          />
        </Container>
        <Container
          sx={{
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
            {getString("phonenumber")}
          </Typography>
          <PhoneInput
            country=""
            enableAreaCodes={true}
            value={formData.billingData?.phoneNumber as string}
            onChange={(_, __, ___, formattedValue) => {
              setFormData((prevValue) => ({
                ...prevValue,
                billingData: {
                  ...prevValue.billingData!,
                  phoneNumber: formattedValue,
                },
              }));
            }}
            specialLabel=""
            containerStyle={{
              marginTop: "0.5rem",
            }}
            inputStyle={{
              width: "100%",
            }}
          />
        </Container>
        <Container
          disableGutters
          sx={{ display: "flex", flexDirection: "row", marginTop: 3 }}
        >
          <Container disableGutters>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("companyName")}
              </Typography>
              <InputComponent
                id="companyNameField"
                type="companyName"
                name="companyName"
                label=""
                onChange={handleInputChange}
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.companyName as string}
              />
            </Container>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("country")}
              </Typography>
              {/* <InputComponent
                id="countryField"
                type="country"
                name="country"
                onChange={handleInputChange}
                label=""
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.country as string}
              /> */}
              <Select
                id="countryField"
                value={formData?.billingData?.country as string}
                name="country"
                onChange={handleSelectChange}
                sx={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {sortCountriesAlphabetically(countries).map((country) => (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Container>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("address")}
              </Typography>
              <InputComponent
                id="addressField"
                type="address"
                name="address"
                label=""
                onChange={handleInputChange}
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.address as string}
              />
            </Container>
          </Container>
          <Container>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("taxId")}
              </Typography>
              <InputComponent
                id="taxIdField"
                type="taxId"
                name="taxId"
                label=""
                onChange={handleInputChange}
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.taxId as string}
              />
            </Container>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("city")}
              </Typography>
              <InputComponent
                id="cityField"
                type="city"
                name="city"
                label=""
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                onChange={handleInputChange}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.city as string}
              />
            </Container>
            <Container
              sx={{
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {getString("zipCode")}
              </Typography>
              <InputComponent
                id="zipCodeField"
                type="zipCode"
                name="zipCode"
                label=""
                onChange={handleInputChange}
                textFieldStyle={{
                  width: "100%",
                  padding: "0",
                  marginTop: "0.5rem",
                }}
                InputPropStyle={{ borderRadius: "0.5rem" }}
                boxStyle={{ flexGrow: 1 }}
                value={formData?.billingData?.zipCode as string}
              />
            </Container>
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
              color: "white",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "var(--primary-color)",
                color: "var(--primary-color)",
              },
            }}
            variant="outlined"
            startIcon={<DoneOutlineOutlinedIcon />}
            onClick={handleOnSave}
            disabled={!isFormDataChanged(formData, user!)}
          >
            {getString("save")}
          </Button>
        </Container>
      </Box>
    </>
  );
};
export default BillingDataEditSection;
