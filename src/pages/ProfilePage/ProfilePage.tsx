import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingDataTextSection from "./BillingDataTextSection";
import ChangePasswordSection from "./ChangePasswordSection";
import ProfileDetailsSection from "./ProfileDetailsSection";
import { DeleteAccount } from "./DeleteAccount";

const ProfilePage = () => {
  const { t } = useTranslation();
  const getString = t;
  const [activeTab, setActiveTab] = useState<string>("profileDetails");

  return (
    <Stack
      spacing={3}
      sx={{ width: "95%", margin: "0 auto", marginTop: "24px" }}
    >
      <Typography variant="h5">{getString("profile")}</Typography>
      <Divider variant="fullWidth" />
      <Grid
        sx={{
          margin: 0,
          marginTop: "2rem !important",
          width: "100% !important",
        }}
        container
        spacing={4}
      >
        <Grid
          sx={{ paddingLeft: "0 !important", paddingTop: "0 !important" }}
          item
          xs={12}
          lg={4}
        >
          <Paper elevation={3} sx={{ padding: "0", borderRadius: "15px" }}>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveTab("profileDetails");
              }}
              sx={{
                width: "100%",
                padding: 2,
                paddingBottom: 2.5,
                paddingTop: 2.5,
                cursor: "pointer",
                color:
                  activeTab === "profileDetails"
                    ? "var(--primary-color)"
                    : "inherit",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%", // Start halfway down
                  transform: "translateY(-50%)", // Center the line vertically
                  height: "50%", // Adjust the height of the line
                  width: "3px",
                  backgroundColor:
                    activeTab === "profileDetails"
                      ? "var(--primary-color)"
                      : "transparent",
                  transition: "background-color 0.3s",
                },
                borderBottom: "1px solid #BCB8B1",
              }}
            >
              {getString("profileDetailsButton")}
            </Box>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveTab("changePassword");
              }}
              sx={{
                width: "100%",
                padding: 2,
                paddingBottom: 2.5,
                paddingTop: 2.5,
                cursor: "pointer",
                color:
                  activeTab === "changePassword"
                    ? "var(--primary-color)"
                    : "inherit",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "50%",
                  width: "3px",
                  backgroundColor:
                    activeTab === "changePassword"
                      ? "var(--primary-color)"
                      : "transparent",
                  transition: "background-color 0.3s",
                },
                borderBottom: "1px solid #BCB8B1",
              }}
            >
              {getString("changePasswordButton")}
            </Box>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveTab("billingData");
              }}
              sx={{
                width: "100%",
                padding: 2,
                paddingBottom: 2.5,
                paddingTop: 2.5,
                cursor: "pointer",
                color:
                  activeTab === "billingData"
                    ? "var(--primary-color)"
                    : "inherit",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "50%",
                  width: "3px",
                  backgroundColor:
                    activeTab === "billingData"
                      ? "var(--primary-color)"
                      : "transparent",
                  transition: "background-color 0.3s",
                },
                borderBottom: "1px solid #BCB8B1",
              }}
            >
              {getString("billingData")}
            </Box>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveTab("deleteAccount");
              }}
              sx={{
                width: "100%",
                padding: 2,
                paddingBottom: 2.5,
                paddingTop: 2.5,
                cursor: "pointer",
                color:
                  activeTab === "deleteAccount"
                    ? "var(--primary-color)"
                    : "inherit",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "50%",
                  width: "3px",
                  backgroundColor:
                    activeTab === "deleteAccount"
                      ? "var(--primary-color)"
                      : "transparent",
                  transition: "background-color 0.3s",
                },
              }}
            >
              {getString("deleteAccount")}
            </Box>
          </Paper>
        </Grid>
        <Grid
          sx={{
            marginTop: { xs: 2, lg: 0 },
            paddingLeft: { xs: "0 !important", lg: "2rem !important" },
            paddingTop: "0 !important",
          }}
          item
          lg={8}
          xs={12}
        >
          <Paper
            elevation={3}
            sx={{ padding: "2rem 1rem", borderRadius: "15px" }}
          >
            {activeTab === "profileDetails" && <ProfileDetailsSection />}
            {activeTab === "changePassword" && <ChangePasswordSection />}
            {/* {activeTab === "edit" && (
              <EditProfileDetailsSection setActiveTab={setActiveTab} />
            )} */}
            {activeTab === "billingData" && <BillingDataTextSection />}
            {activeTab === "deleteAccount" && <DeleteAccount />}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProfilePage;
