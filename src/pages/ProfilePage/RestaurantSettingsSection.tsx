import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useAppSelector } from "../../redux/reduxHooks";
import RestaurantSettingsEditSection from "./RestaurantSettingsEditSection";

const RestaurantSettingsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const { successMessage } = useAppSelector((state) => state.restaurantsData);
  const { user } = useAppSelector((state) => state.userData);

  useEffect(() => {}, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  if (isEditing) {
    return (
      <RestaurantSettingsEditSection
        setToastVisible={setShowToast}
        setIsEditing={setIsEditing}
      />
    );
  }
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
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
          <Typography variant="h5">
            {getString("restaurantSettingsButton")}{" "}
          </Typography>
          <Button
            sx={{ borderRadius: "1rem" }}
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {getString("edit")}
          </Button>
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
          <InputComponent
            id="countryField"
            type="country"
            label=""
            textFieldStyle={{
              width: "100%",
              padding: "0",
              marginTop: "0.5rem",
            }}
            InputPropStyle={{ borderRadius: "0.5rem" }}
            boxStyle={{ flexGrow: 1 }}
            value={user?.currency as string}
            readOnly={true}
            disabled={true}
          />
        </Container>
      </Container>
    </Box>
  );
};
export default RestaurantSettingsSection;
