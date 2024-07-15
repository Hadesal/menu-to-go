import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../redux/slices/mainViewSlice";
import CategoriesCardImg from "../../../assets/categories-card.svg";
import ContactCardImg from "../../../assets/contactus-card.svg";
import FeedbacksCardImg from "../../../assets/feedbacks-card.svg";
import QRCodeCardImg from "../../../assets/generateqrcode-card.svg";
import RestaurantCardImg from "../../../assets/resturant-card.svg";
import TemplatesCardImg from "../../../assets/templates-card.svg";
import { useAppSelector } from "../../../utils/hooks";

const dashboardCards = [
  { id: "resturant", image: RestaurantCardImg, label: "Restaurant" },
  { id: "categories", image: CategoriesCardImg, label: "Categories" },
  { id: "templates", image: TemplatesCardImg, label: "Templates" },
  { id: "qrcode", image: QRCodeCardImg, label: "Generate qr code" },
  { id: "feedbacks", image: FeedbacksCardImg, label: "Feedbacks" },
  { id: "contactus", image: ContactCardImg, label: "Contact us" },
];

export default function DashboardView() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getString = t;
  const { userList } = useAppSelector((state) => state.userData);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "4rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "43.2px",
          }}
        >
          {getString("welcomeBack")}
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "43.2px",
            color: "#A4755D",
          }}
        >
         { userList[0].name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          marginTop: "2rem",
        }}
      >
        {dashboardCards.map((card) => (
          <Box
            key={card.id}
            sx={{
              borderRadius: "16px",
              height: "200px",
              width: "268px",
              border: "1px solid var(--light-strock, #D9D9D9)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "2rem",
              paddingLeft: "1rem",
              "&:hover": {
                backgroundColor: "#A4755D4D",
              },
              cursor: "pointer",
            }}
            onClick={() => dispatch(setActiveTab(card.label))}
          >
            <Box>
              <img
                width={"60px"}
                height={"63px"}
                src={card.image}
                alt={`${card.label} card image`}
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#A4755D",
                  marginTop: "0.6rem",
                }}
              >
                {card.label}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                sx={{ color: "#BCB8B1", marginRight: "1rem" }}
                aria-label="arrow"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
