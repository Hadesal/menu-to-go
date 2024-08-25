import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingDataEditSection from "./BillingDataEditSection";
import BillingDataTextSection from "./BillingDataTextSection";

const BillingDetailsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const [activeSection, setActiveSection] = useState<string>("billingDataText");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
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
            //setActiveTab("edit");
            setIsEditing(true);
          }}
        >
          {getString("edit")}
        </Button>
      </Container>
      {/* <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5"> {getString("billingData")}</Typography>
      </Container> */}
      {!isEditing && (
        <BillingDataTextSection setActiveSection={setActiveSection} />
      )}
      {isEditing && (
        <BillingDataEditSection setActiveSection={setActiveSection} />
      )}
    </Box>
  );
};

export default BillingDetailsSection;
