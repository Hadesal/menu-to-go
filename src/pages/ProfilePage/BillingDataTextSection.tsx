import { useAppSelector } from "../../redux/reduxHooks";
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
import BillingDataEditSection from "./BillingDataEditSection";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const BillingDataTextSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const { user } = useAppSelector((state) => state.userData);

  useEffect(() => {}, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  if (isEditing) {
    return (
      <BillingDataEditSection
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
          {getString("billingDataUpdateSuccess")}
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
          <Typography variant="h5">{getString("billingData")} </Typography>
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
          name="name"
          id="nameField"
          type="Name"
          label=""
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.billingData?.fullName as string}
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
          {getString("email")}
        </Typography>
        <InputComponent
          id="emailField"
          type="Email"
          label=""
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.email as string}
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
        <InputComponent
          id="phoneField"
          type="Phone"
          label=""
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.billingData?.phoneNumber as string}
          readOnly={true}
          disabled={true}
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
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.companyName as string}
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
              {getString("country")}
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
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.country as string}
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
              {getString("address")}
            </Typography>
            <InputComponent
              id="addressField"
              type="address"
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.address as string}
              readOnly={true}
              disabled={true}
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
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.taxId as string}
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
              {getString("city")}
            </Typography>
            <InputComponent
              id="cityField"
              type="city"
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.city as string}
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
              {getString("zipCode")}
            </Typography>
            <InputComponent
              id="zipCodeField"
              type="zipCode"
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.zipCode as string}
              readOnly={true}
              disabled={true}
            />
          </Container>
        </Container>
      </Container>
    </Box>
  );
};
export default BillingDataTextSection;
