import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FontSectionComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  return (
    <>
      <Paper elevation={6} sx={{ borderRadius: "2rem" }}>
        <Card sx={{ borderRadius: "2rem" }}>
          <CardContent>
            <Typography
              sx={{ marginBottom: "1rem", marginTop: "1rem", color: "#797979" }}
              variant="h5"
            >
              {getString("font")}
            </Typography>
            <Container
              sx={{
                display: "flex",
                paddingLeft: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
              }}
            >
              <Card
                sx={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "1rem",
                  border: "solid",
                  borderWidth: "2px",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                }}
              >
                <CardContent>
                  <Typography fontFamily={"serif"}>Aa</Typography>
                  <Typography fontFamily={"serif"}>Serif</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "1rem",
                  border: "solid",
                  borderWidth: "2px",
                  marginRight: "1rem",
                }}
              >
                <CardContent sx={{ borderRadius: "1rem" }}>
                  <Typography fontFamily={"sans-serif"}>Aa</Typography>
                  <Typography fontFamily={"sans-serif"}>Sans</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "1rem",
                  border: "solid",
                  borderWidth: "2px",
                  marginRight: "1rem",
                }}
              >
                <CardContent>
                  <Typography fontFamily={"monospace"}>Aa</Typography>
                  <Typography fontFamily={"monospace"}>Mono</Typography>
                </CardContent>
              </Card>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default FontSectionComponent;
