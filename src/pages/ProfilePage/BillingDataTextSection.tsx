import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import InputComponent from "../../components/InputComponent/InputComponent";

const BillingDataTextSection = ({
  setActiveSection,
}: {
  setActiveSection: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const { user } = useAppSelector((state) => state.userData);

  useEffect(() => {}, [user]);
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "#797979" }}>
          {getString("billingDataPageDescription")}
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "15%", flexShrink: 0 }}>
          {getString("fullName")}
          {" :"}{" "}
        </Typography>
        <InputComponent
          name="name"
          id="nameField"
          type="Name"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.billingData?.fullName as string}
          readOnly={true}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "15%", flexShrink: 0 }}>
          {getString("email")}
          {" :"}
        </Typography>
        <InputComponent
          id="emailField"
          type="Email"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.email as string}
          readOnly={true}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "15%", flexShrink: 0 }}>
          {getString("phonenumber")}
          {" :"}
        </Typography>
        <InputComponent
          id="phoneField"
          type="Phone"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.billingData?.phoneNumber as string}
          readOnly={true}
        />
      </Container>
      <Container
        disableGutters
        sx={{ display: "flex", flexDirection: "row", marginTop: 3 }}
      >
        <Container disableGutters>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              {getString("companyName")}
              {" :"}
            </Typography>
            <InputComponent
              id="companyNameField"
              type="companyName"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.companyName as string}
              readOnly={true}
            />
          </Container>{" "}
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "20%", flexShrink: 0 }}
            >
              {getString("country")}
              {" :"}
            </Typography>
            <InputComponent
              id="countryField"
              type="country"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.country as string}
              readOnly={true}
            />
          </Container>{" "}
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "20%", flexShrink: 0 }}
            >
              {getString("address")}
              {" :"}
            </Typography>
            <InputComponent
              id="addressField"
              type="address"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.address as string}
              readOnly={true}
            />
          </Container>
        </Container>
        <Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "20%", flexShrink: 0 }}
            >
              {getString("taxId")}
              {" :"}
            </Typography>
            <InputComponent
              id="taxIdField"
              type="taxId"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.taxId as string}
              readOnly={true}
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "20%", flexShrink: 0 }}
            >
              {getString("city")}
              {" :"}
            </Typography>
            <InputComponent
              id="cityField"
              type="city"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.city as string}
              readOnly={true}
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "20%", flexShrink: 0 }}
            >
              {getString("zipCode")}
              {" :"}
            </Typography>
            <InputComponent
              id="zipCodeField"
              type="zipCode"
              label=""
              textFieldStyle={{ width: "100%", padding: "0" }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              styleInputProps={{ padding: "0.8rem" }}
              boxStyle={{ flexGrow: 1 }}
              value={user?.billingData?.zipCode as string}
              readOnly={true}
            />
          </Container>
          {/* <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("taxId")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingData?.taxId}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("city")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingData?.city}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("zipCode")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingCode?.zipCode}
            </Typography>
          </Container> */}
        </Container>
      </Container>
    </Box>
  );
};
export default BillingDataTextSection;
