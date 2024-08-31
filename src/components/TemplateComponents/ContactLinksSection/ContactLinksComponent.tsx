import {
  Paper,
  Box,
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
      <Paper elevation={6} sx={{ borderRadius: "2rem" }}>
        <Card sx={{ borderRadius: "2rem" }}>
          <CardContent>
            <Typography
              sx={{ marginTop: "1rem", color: "#797979" }}
              variant="h6"
            >
              {getString("contactLinks")}
            </Typography>
            <Container
              sx={{
                display: "flex",
                margin: 0,
                marginTop: "1rem",
                paddingLeft: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
                justifyContent: "space-around",
              }}
            >
              <Button startIcon={<FacebookOutlinedIcon />} variant="outlined">
                Facebook
              </Button>
              <Button startIcon={<CiTwitter />} variant="outlined">
                Twitter
              </Button>
              <Button startIcon={<FaInstagram />} variant="outlined">
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
