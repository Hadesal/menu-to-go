import { Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "../../utils/hooks";

const BillingDataTextSection = ({
  setActiveSection,
}: {
  setActiveSection: Dispatch<SetStateAction<String>>;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];

  useEffect(() => {}, [userList]);
  return (
    <Container className="billingDataTextMainContainer">
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "#797979" }}>
          {getString("billingDataPageDescription")}
        </Typography>
        <Button
          sx={{ borderRadius: "1rem" }}
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            setActiveSection("editBillingData");
          }}
        >
          {getString("edit")}
        </Button>
      </Container>
      <Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
            {getString("fullName")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {userData?.billingData?.fullName}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
            {getString("email")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {userData?.email}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
            {getString("phonenumber")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {userData?.billingData?.phoneNumber}
          </Typography>
        </Container>
      </Container>
      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <Container disableGutters>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("companyName")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingData?.companyName}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "rem",
              marginTop: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("country")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingData?.country}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              {getString("address")}
              {" :"}
            </Typography>
            <Typography variant="subtitle1" color={"#A4755D"}>
              {userData?.billingData?.address}
            </Typography>
          </Container>
        </Container>
        <Container>
          <Container
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
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default BillingDataTextSection;
