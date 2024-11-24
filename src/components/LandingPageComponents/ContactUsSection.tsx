import { Box, Typography, Button, TextField } from "@mui/material";
import Ellipse from "../../assets/Ellipse 18.svg";
import { useTranslation } from "react-i18next";

export default function ContactUsSection() {
  const { t } = useTranslation();
  const getString = t;

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          paddingBottom: "10rem",
          width: { xs: "80%", md: "40%" },
          gap: "32px",
        }}
      >
        <Box
          component="img"
          src={Ellipse}
          sx={{
            position: "absolute",
            top: "25rem",
            left: "-5rem",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          component="img"
          src={Ellipse}
          sx={{
            position: "absolute",
            top: "7.5rem",
            right: "2rem",
            display: { xs: "none", md: "block" },
          }}
        />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "56px",
            lineHeight: "56px",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "20px",
            textAlign: "center",
            margin: "0 auto",
            width: { xs: "100%", md: "80%", lg: "90%" },
            color: "#BCB8B1",
          }}
        >
          Have a question? Feel free to contact us? we are happy to help you!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <TextField
            id="usernameField"
            label="User Name"
            variant="outlined"
            required
            sx={{ flexGrow: 1 }}
            InputProps={{
              style: {
                borderRadius: "1rem",
              },
            }}
          />
          <TextField
            id="emailField"
            label="Email"
            variant="outlined"
            required
            sx={{ flexGrow: 1 }}
            InputProps={{
              style: {
                borderRadius: "1rem",
              },
            }}
          />
        </Box>
        <TextField
          id="message"
          label="Message"
          placeholder={"Message"}
          multiline
          required
          rows={8}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderRadius: "1rem",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: "36px",
            backgroundColor: "var(--primary-color)",
            border: "1px solid transparent",
            alignSelf: "flex-end",
            fontSize: "24px",
            lineHeight: "24px",
            padding: "1.5rem",
            width: "292px",
            heigh: "72px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              boxShadow: "none",
              color: "var(--primary-color)",
            },
          }}
          onClick={() => {
            console.log("Submit Message");
          }}
        >
          {getString("SubmitMessage")}
        </Button>
      </Box>
    </Box>
  );
}
