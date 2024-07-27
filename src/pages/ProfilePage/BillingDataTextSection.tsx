import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const BillingDataTextSection = ({ setActiveSection, uesrData }) => {
  const { t } = useTranslation();
  const getString = t;
  return (
    <Container className="billingDataTextMainContainer">
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ marginLeft: "2.5vw", color: "#797979" }}
        >
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
            {uesrData?.billingData?.fullName}
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
            {uesrData?.email}
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
            {getString("phoneNumber")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {uesrData?.billingData?.phoneNumber}
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
              {uesrData?.billingData?.companyName}
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
              {uesrData?.billingData?.country}
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
              {uesrData?.billingData?.address}
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
              {uesrData?.billingData?.taxId}
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
              {uesrData?.billingData?.city}
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
              {uesrData?.billingCode?.zipCode}
            </Typography>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default BillingDataTextSection;
