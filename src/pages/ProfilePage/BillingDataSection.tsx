import { useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BillingDataTextSection from "./BillingDataTextSection";
import BillingDataEditSection from "./BillingDataEditSection";

const BillingDetailsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const [activeSection, setActiveSection] = useState<String>("billingDataText");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <Typography sx={{ marginLeft: "1vw", color: "#797979" }} variant="h5">
          {getString("billingData")}
        </Typography>
        <Divider variant="middle" component={"h5"} />
      </Container>
      {activeSection === "billingDataText" && (
        <BillingDataTextSection setActiveSection={setActiveSection} />
      )}
      {activeSection === "editBillingData" && (
        <BillingDataEditSection setActiveSection={setActiveSection} />
      )}
    </Box>
  );
};

export default BillingDetailsSection;
