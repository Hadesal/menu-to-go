import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProfileDetailsSection from "./ProfileDetailsSection";
import ChangePasswordSection from "./ChangePasswordSection";
import EditProfileDetailsSection from "./EditProfileDetailsSection";
import BillingDetailsSection from "./BillingDataSection";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation();
  const getString = t;
  const [activeTab, setActiveTab] = useState<String>("profileDetails");
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            sx={{
              background: "#A4755D30",
              "&:hover": {
                background: "#A4755D30",
              },
            }}
            aria-label="back"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <KeyboardBackspaceIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography sx={{ marginTop: "1rem" }} variant="h3">
            {getString("profile")}
          </Typography>
        </Box>

        <Divider variant="fullWidth" component={"h4"} />
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            sx={{ borderRadius: "1rem", marginRight: "1rem" }}
            variant={activeTab === "profileDetails" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("profileDetails");
            }}
          >
            {getString("profileDetailsButton")}
          </Button>

          <Button
            sx={{ borderRadius: "1rem" }}
            variant={activeTab === "changePassword" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("changePassword");
            }}
          >
            {getString("changePasswordButton")}
          </Button>
          <Button
            sx={{ borderRadius: "1rem", marginLeft: "1rem" }}
            variant={activeTab === "billingData" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("billingData");
            }}
          >
            {getString("billingData")}
          </Button>
        </Container>

        <Paper sx={{ padding: "1rem" }}>
          {activeTab === "profileDetails" && (
            <ProfileDetailsSection setActiveTab={setActiveTab} />
          )}
          {activeTab === "changePassword" && (
            <ChangePasswordSection setActiveTab={setActiveTab} />
          )}
          {activeTab === "edit" && (
            <EditProfileDetailsSection setActiveTab={setActiveTab} />
          )}
          {activeTab === "billingData" && <BillingDetailsSection />}
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
