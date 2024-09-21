import {
  Paper,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContactLinksComponent = () => {
  const { t } = useTranslation();
  const getString = t;

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          marginTop: "1rem",
          borderRadius: "2rem",
          width: "100%",
        }}
      >
        <Card
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                marginTop: "1rem",
                color: "#797979",
                textAlign: "left",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
              variant="h6"
            >
              {getString("contactLinks")}
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: { xs: "center", sm: "space-evenly" },
                gap: { xs: "1rem", sm: "0" },
                marginTop: "1rem",
                padding: 0,
              }}
            >
              <Button
                startIcon={<FacebookOutlinedIcon />}
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  marginBottom: { xs: "1rem", sm: "0" },
                }}
              >
                Facebook
              </Button>
              <Button
                startIcon={<CiTwitter />}
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  marginBottom: { xs: "1rem", sm: "0" },
                }}
              >
                Twitter
              </Button>
              <Button
                startIcon={<FaInstagram />}
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Instagram
              </Button>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ContactLinksComponent;
