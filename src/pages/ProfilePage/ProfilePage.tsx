import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingDetailsSection from "./BillingDataSection";
import ChangePasswordSection from "./ChangePasswordSection";
import EditProfileDetailsSection from "./EditProfileDetailsSection";
import ProfileDetailsSection from "./ProfileDetailsSection";

const ProfilePage = () => {
  const { t } = useTranslation();
  const getString = t;
  const [activeTab, setActiveTab] = useState<string>("profileDetails");

  return (
    <Stack spacing={3} sx={{ width: "95%", margin: "0 auto" , marginTop:"24px" }}>
      <Typography variant="h5">{getString("profile")}</Typography>
      <Divider variant="fullWidth" />
      <Grid sx={{ margin: 0 }} container spacing={2}>
        <Grid sx={{ paddingLeft: "0 !important" }} item xs={4}>
          <Paper sx={{ padding: "0", borderRadius: "5px" }}>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveTab("profileDetails");
              }}
              sx={{
                width: "100%",
                padding: 2,
                cursor: "pointer",
                color:
                  activeTab === "profileDetails"
                    ? "var(--primary-color)"
                    : "inherit",
                borderLeft:
                  activeTab === "profileDetails"
                    ? "4px solid var(--primary-color)"
                    : "4px solid transparent",
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
                cursor: "pointer",
                color:
                  activeTab === "changePassword"
                    ? "var(--primary-color)"
                    : "inherit",
                borderLeft:
                  activeTab === "changePassword"
                    ? "4px solid var(--primary-color)"
                    : "4px solid transparent",
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
                cursor: "pointer",
                color:
                  activeTab === "billingData"
                    ? "var(--primary-color)"
                    : "inherit",
                borderLeft:
                  activeTab === "billingData"
                    ? "4px solid var(--primary-color)"
                    : "4px solid transparent",
              }}
            >
              {getString("billingData")}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ padding: "1rem", borderRadius: "5px" }}>
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
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProfilePage;
