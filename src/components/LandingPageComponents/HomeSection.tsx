import { Box, Typography, Button } from "@mui/material";
import HalfCircle from "../../assets/HalfCircle.svg";
import Ellipse from "../../assets/Ellipse 18.svg";
import ThinHalfCircle from "../../assets/ThinHalfCircle.svg";
import MobileMenu from "../../assets/MobileMenu.svg";
import LaptopMenu from "../../assets/LaptopMenu.svg";

export default function HomeSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        component={"img"}
        src={HalfCircle}
        alt="Decorative Half Circle"
        sx={{
          position: "absolute",
          height: "321px",
          left: "-3rem",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "50%" },
          paddingTop: "8rem",
          paddingLeft: "2rem",
          gap: "32px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Lucida Calligraphy",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "48px",
            lineHeight: "48px",
          }}
        >
          <span style={{ color: "#A4755D" }}>Menu</span>
          -To-Go
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "54px",
            lineHeight: "60px",
          }}
        >
          Help You To Create Your Digital Menu for Free
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "24px",
            color: "#BCB8B1",
          }}
        >
          Easily Create a Digital Menu for your Restaurant or Café within the
          next 5 minutes for Free
        </Typography>

        <Button
          variant="outlined"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "24px",
            borderRadius: "36px",
            padding: "1.5rem",
            width: "292px",
            heigh: "72px",
            backgroundColor: "var(--primary-color)",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              color: "var(--primary-color)",
            },
          }}
          onClick={() => {
            console.log("Create Your Menu");
          }}
        >
          Create Your Menu
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "end" },
          width: { xs: "100%", md: "50%" },
          marginTop: { xs: "2rem", md: "0" },
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: "424px",
            borderBottomRightRadius: "424px",
            background: "#D9B18F33",
            width: "696px",
            height: "869px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={Ellipse}
            sx={{ position: "absolute", top: "36rem", right: "0" }}
          />
          <Box
            component="img"
            src={ThinHalfCircle}
            sx={{ position: "absolute", top: "25rem", left: "-4rem" }}
          />
          <Box
            component="img"
            src={LaptopMenu}
            sx={{ position: "absolute", top: "12rem", left: "11rem" }}
          />
          <Box
            component="img"
            src={MobileMenu}
            sx={{ position: "absolute", top: "18rem", left: "6rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
