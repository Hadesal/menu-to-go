import { Box } from "@mui/material";
import HomeSection from "./HomeSection";
import ContactUsSection from "./ContactUsSection";
import HowItWorksSection from "./HowItWorksSection";
import BenefitsSection from "./BenefitsSection";
import PricingSection from "./PricingSection";

export default function SectionsContainer() {
  return (
    <Box
      sx={{
        margin: { xs: "1rem 1rem 0", md: "2rem 2rem 0" },
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <HomeSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingSection />
      <ContactUsSection />
    </Box>
  );
}
