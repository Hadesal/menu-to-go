import { Box, Typography, IconButton } from "@mui/material";
import ReactPlayer from "react-player";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoBackground from "../../assets/VideoBackground.png";

export default function HowItWorksSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "800px",
        width: "100%",
        gap: "32px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "56px",
          lineHeight: "56px",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        How it works?
      </Typography>
      <Typography
        sx={{
          margin: "0 auto",
          fontFamily: "Poppins",
          textAlign: "center",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "20x",
          color: "#BCB8B1",
          width: { xs: "100%", md: "80%", lg: "60%" },
        }}
      >
        By using
        <span
          style={{
            fontFamily: "Lucida Calligraphy",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "24px",
          }}
        >
          <span style={{ color: "#A4755D" }}> Menu</span>
          <span style={{ color: "#797979" }}>-To-Go </span>
        </span>
        café & Restaurant PDF to QR Code or From Scratch Menu Builder, you can
        easily create a non-contact digital menu for free and many more!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {!isPlaying ? (
          <Box
            sx={{
              width: "80%",
              height: "100%",
              backgroundImage: `url(${VideoBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              cursor: "pointer",
              borderRadius: 5,
            }}
            onClick={handlePlay}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#A4755D",
                color: "white",
                "&:hover": {
                  backgroundColor: "#8b5e4c",
                },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 60 }} />
            </IconButton>
          </Box>
        ) : (
          <ReactPlayer
            width={"70%"}
            height={"100%"}
            style={{
              borderRadius: 5,
              overflow: "hidden",
            }}
            controls={true}
            playing={true}
            url="https://youtu.be/zYR53vO42W4?si=_d2qzKoxSLNAE0po"
          />
        )}
      </Box>
    </Box>
  );
}
