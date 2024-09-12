import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const CategoryShapesComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "2rem",
        }}
      >
        <Card sx={{ borderRadius: "2rem", height: "100%" }}>
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
              {getString("catgoryShape")}
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "flex-start" },
                flexWrap: "wrap",
                padding: 0,
                marginTop: "1rem",
              }}
            >
              <Box
                sx={{
                  width: "5vw",
                  height: "5vw",
                  borderRadius: "50%",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
                  marginRight: { xs: "1rem", sm: "2rem" },
                  marginBottom: "1rem",
                }}
              />
              <Box
                sx={{
                  width: "5vw",
                  height: "5vw",
                  borderRadius: "15%",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
                  marginRight: { xs: "1rem", sm: "2rem" },
                  marginBottom: "1rem",
                }}
              />
              <Box
                sx={{
                  width: "5vw",
                  height: "5vw",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
                  marginBottom: "1rem",
                }}
              />
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default CategoryShapesComponent;
