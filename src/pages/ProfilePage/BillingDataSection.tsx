import { useState } from "react";
import { BillingDataType, UserUpdateData } from "../../DataTypes/UserDataTypes";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BillingDataTextSection from "./BillingDataTextSection";
import BillingDataEditSection from "./BillingDataEditSection";

const BillingDetailsSection = ({
  userData,
  onSave,
  onCancel,
}: {
  userData: UserUpdateData;
  onSave: (updatedBillingData: BillingDataType) => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const [activeSection, setActiveSection] = useState<String>("billingDataText");
  const [formData, setFormData] = useState<BillingDataType>({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    address: "",
    city: "",
    taxId: "",
    zipCode: "",
  });

  const handleSave = () => {
    onSave(formData);
  };

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
        <BillingDataTextSection
          uesrData={userData}
          setActiveSection={setActiveSection}
        />
      )}
      {activeSection === "editBillingData" && (
        <BillingDataEditSection
          onSave={onSave}
          onCancel={onCancel}
          setActiveSection={setActiveSection}
          setNewUser={setFormData}
        />
      )}
    </Box>
  );
};

export default BillingDetailsSection;
