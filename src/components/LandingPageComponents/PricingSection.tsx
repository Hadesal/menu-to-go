import { useState } from "react";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  const pricingPlans = [
    {
      id: "freeAccount",
      title: "Free",
      description: "Get started for free",
      features: [
        "1 QR Code",
        "Basic Menu Creation (up to 10 items)",
        "Limited Customization",
        "Basic Analytics",
      ],
      price: "0",
    },
    {
      id: "starterPlan",
      title: "Starter",
      description: "Essentials for small businesses",
      features: [
        "1 QR Code",
        "Up to 20 Menu Items",
        "Basic Customization",
        "Basic Analytics",
      ],
      price: billingCycle === "yearly" ? "8.5" : "10",
    },
    {
      id: "businessPlan",
      title: "Business",
      description: "Growing multi-location restaurants",
      features: [
        "Up to 10 QR Codes",
        "Unlimited Menu Items",
        "Full Branding Control",
        "API Integration and Analytics",
      ],
      price: billingCycle === "yearly" ? "17" : "20",
    },
    {
      id: "enterprisePlan",
      title: "Enterprise",
      description: "Ultimate customization and support",
      features: [
        "Unlimited QR Codes and Items",
        "Custom Features and Integrations",
        "Dedicated Account Manager",
        "24/7 Premium Support",
      ],
      price: "Custom",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 2rem" }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          textAlign: "center",
          fontWeight: 400,
          fontSize: "56px",
          lineHeight: "56px",
        }}
      >
        Streamline your teamwork. Start free.
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          textAlign: "center",
          color: "#BCB8B1",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "20px",
          margin: "0 auto",
          marginTop: "2rem",
          width: { xs: "100%", md: "80%", lg: "60%" },
        }}
      >
        Choose the perfect plan for your business needs
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "1.5rem",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: "#A4755D",
            fontWeight: 700,
            fontSize: "12px",
          }}
        >
          Save 15% on yearly plan!
        </Typography>
        <Box
          sx={{
            display: "flex",
            borderRadius: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            onClick={() => setBillingCycle("yearly")}
            sx={{
              padding: "0.5rem 1rem",
              margin: "0.3rem 0.5rem",
              borderRadius: "20px",
              backgroundColor:
                billingCycle === "yearly" ? "#A4755D" : "transparent",
              color: billingCycle === "yearly" ? "#FFF" : "#A4755D",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor:
                  billingCycle === "yearly" ? "#A4755D" : "transparent",
              },
            }}
          >
            Yearly
          </Button>
          <Button
            onClick={() => setBillingCycle("monthly")}
            sx={{
              padding: "0.5rem 1rem",
              margin: "0.3rem 0.5rem",
              borderRadius: "20px",
              backgroundColor:
                billingCycle === "monthly" ? "#A4755D" : "transparent",
              color: billingCycle === "monthly" ? "#FFF" : "#A4755D",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor:
                  billingCycle === "monthly" ? "#A4755D" : "transparent",
              },
            }}
          >
            Monthly
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {pricingPlans.map((plan) => (
          <Box
            key={plan.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "300px",
              height: "470px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "23px",
              }}
            >
              {plan.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "18px",
              }}
            >
              {plan.description}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                marginTop: "1.5rem",
              }}
            >
              {plan.price === "Custom" ? (
                <span style={{ fontWeight: 700, fontSize: "32px" }}>
                  {plan.price}
                </span>
              ) : (
                <>
                  <span style={{ fontWeight: 700, fontSize: "32px" }}>
                    ${plan.price}
                  </span>
                  <span style={{ fontWeight: 400, fontSize: "12px" }}>
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </span>
                </>
              )}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "4px 0px 0px 0px",
                padding: "5px, 0px, 5px, 0px",
                marginTop: "1.5rem",
                backgroundColor: "var(--primary-color)",
                border: "1px solid transparent",
                fontSize: "16px",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  borderColor: "var(--primary-color)",
                  boxShadow: "none",
                  color: "var(--primary-color)",
                },
              }}
            >
              Get started
            </Button>
            <Typography
              sx={{ fontWeight: 600, fontSize: "16px", marginTop: "1.5rem" }}
            >
              Features
            </Typography>
            <List>
              {plan.features.map((feature, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "flex", gap: 1, padding: 0.5 }}
                >
                  <CheckIcon
                    fontSize="medium"
                    sx={{ color: "var(--primary-color)" }}
                  />
                  <Typography sx={{ fontWeight: 400, fontSize: "15px" }}>
                    {feature}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
