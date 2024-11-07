import { Box, Typography } from "@mui/material";
import CostEfficient from "../../assets/CostEfficient.svg";
import CustomerExpericne from "../../assets/CustomerExperince.svg";
import EasyUpdates from "../../assets/EasyUpdates.svg";

export default function BenefitsSection() {
  const benifitsData = [
    {
      id: "CostEfficient",
      img: CostEfficient,
      title: "Cost Efficiency and Environmental Impact",
      describtion:
        "Save on printing costs while reducing your carbon footprint by switching to digital menus. Lower expenses and contribute to a more sustainable future.",
    },
    {
      id: "CustomerExperience",
      img: CustomerExpericne,
      title: "Improved Customer Experience",
      describtion:
        "Offer a seamless, user-friendly menu interface that enhances customer satisfaction by making ordering easier and faster.",
    },
    {
      id: "EasyUpdates",
      img: EasyUpdates,
      title: "Easy Updates and Multimedia Content",
      describtion:
        "Quickly update your menu, pricing, or promotions in real-time. Add engaging multimedia like photos and videos to showcase your dishes.",
    },
    {
      id: "OperationalEfficiency",
      img: EasyUpdates,
      title: "Increased Operational Efficiency",
      describtion:
        "Automate menu management, reduce manual errors, and streamline communication between your kitchen and front-of-house teams.",
    },
    {
      id: "AnalyticsInsights",
      img: EasyUpdates,
      title: " Analytics and Insights",
      describtion:
        "Gain valuable insights into customer preferences and popular menu items to optimize your offerings and boost sales.",
    },
    {
      id: "IncreasedVisibilityPromotion",
      img: EasyUpdates,
      title: "Increased Visibility and Promotion",
      describtion:
        "Highlight promotions, special offers, or seasonal dishes directly on the menu, grabbing customers’ attention right when they are ready to order.",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0 2rem",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          textAlign: "center",
          fontWeight: 400,
          fontSize: "56px",
          lineHeight: "56px",
        }}
      >
        Benefits
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          textAlign: "center",
          color: "#BCB8B1",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "20x",
          margin: "0 auto",
          marginTop: "2rem",
          width: { xs: "100%", md: "80%", lg: "60%" },
        }}
      >
        Discover the advantages of going digital with{" "}
        <span
          style={{
            fontFamily: "Lucida Calligraphy",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "24px",
          }}
        >
          <span
            style={{
              color: "#A4755D",
            }}
          >
            Menu
          </span>
          -To-Go
        </span>
        . From streamlining your ordering process to reducing wait times, our
        platform helps you provide a seamless dining experience.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          },
          gap: 8,
          marginTop: "2rem",
        }}
      >
        {benifitsData.map((benifit, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              background: "#D9B18F33",
              padding: "2rem 2rem 4rem",
              gap: 2,
            }}
          >
            <Box
              style={{
                display: "flex",
                width: "50px",
                height: "50px",
                background: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src={benifit.img}
                alt={benifit.title}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "28px",
                color: "#797979",
              }}
            >
              {benifit.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "28px",
                color: "#797979",
              }}
            >
              {benifit.describtion}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
