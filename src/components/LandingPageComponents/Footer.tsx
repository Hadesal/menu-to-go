import { Box, Typography } from "@mui/material";
import LandingFooter from "../../assets/LandingFooter.jpg";
import FacebookIcon from "../../assets/facebook.svg";
import InstagramIcon from "../../assets/instagram.svg";
import LinkdinIcon from "../../assets/linkdin.svg";
import TwiterIcon from "../../assets/twiter.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "2rem 4rem",
        backgroundColor: "rgba(87, 62, 49, 0.9)",
        backgroundImage: `url(${LandingFooter})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        flexDirection: { xs: "column", md: "row" },
        textAlign: { xs: "center", md: "start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: { xs: "center", md: "start" },
          mb: { xs: 3, md: 0 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Lucida Calligraphy",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "48px",
            lineHeight: "48px",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#F9FDFE" }}>Menu</span>
          <br />
          <span style={{ color: "#D9B18F" }}>-To-</span>
          <br />
          <span style={{ color: "#D9B18F" }}>Go</span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 6 },
          //height: "100%",
          justifyContent: "center",
          alignItems: { xs: "center", md: "start" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "30px",
              color: "#D9B18F",
            }}
          >
            Quick links
          </Typography>
          <ul
            style={{
              color: "#D1CFCF",
              fontWeight: 500,
              fontSize: "20px",
              listStyle: "none",
              padding: 0,
              textAlign: "inherit",
            }}
          >
            <li>Home</li>
            <li>How it Works</li>
            <li>Pricing</li>
            <li>Features</li>
          </ul>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "30px",
              color: "#D9B18F",
            }}
          >
            Legal
          </Typography>
          <ul
            style={{
              color: "#D1CFCF",
              fontWeight: 500,
              fontSize: "20px",
              listStyle: "none",
              padding: 0,
              textAlign: "inherit",
            }}
          >
            <li>Privacy Policy </li>
            <li>Refund Policy</li>
            <li>Terms & Conditions</li>
            <li>Subscription</li>
          </ul>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "192px",
          alignItems: { xs: "center", md: "end" },
          mt: { xs: 3, md: 0 },
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: "30px",
            color: "#D9B18F",
            width: "188px",
            textAlign: "center",
          }}
        >
          Follow Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexDirection: "row",
            width: "188px",
            justifyContent: "center",
          }}
        >
          <Box
            component={"img"}
            sx={{ width: "24px", height: "24px", mx: 1 }}
            src={FacebookIcon}
          />
          <Box
            component={"img"}
            sx={{ width: "24px", height: "24px" }}
            src={InstagramIcon}
          />
          <Box
            component={"img"}
            sx={{ width: "24px", height: "24px" }}
            src={LinkdinIcon}
          />
          <Box
            component={"img"}
            sx={{ width: "24px", height: "24px" }}
            src={TwiterIcon}
          />
        </Box>
      </Box>
    </Box>
  );
}
