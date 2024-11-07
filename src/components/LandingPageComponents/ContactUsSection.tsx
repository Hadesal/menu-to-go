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
            fontWeight: 400,
            fontSize: "56px",
            textAlign: "center",
            lineHeight: "56px",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: 1.2,
            color: "#BCB8B1",
            marginTop: "2rem",
            textAlign: "center",
            width: { xs: "100%", md: "80%", lg: "90%" },
            margin: "2rem auto",
          }}
        >
          Have a question? Feel free to contact us? we are happy to help you!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginTop: "2rem",
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
            marginTop: "1rem",
            "& .MuiInputBase-root": {
              borderRadius: "1rem",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            borderRadius: "20px",
            padding: "5px, 0px, 5px, 0px",
            backgroundColor: "var(--primary-color)",
            border: "1px solid transparent",
            alignSelf: "flex-end",
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              boxShadow: "none",
              color: "var(--primary-color)",
            },
          }}
          //onClick={handleFormSubmit}
        >
          {getString("SubmitMessage")}
        </Button>
      </Box>
    </Box>
  );
}
