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
      <Paper elevation={6} sx={{ borderRadius: "2rem" }}>
        <Card sx={{ borderRadius: "2rem" }}>
          <CardContent>
            <Typography
              sx={{ marginTop: "1rem", color: "#797979" }}
              variant="h6"
            >
              {getString("catgoryShape")}
            </Typography>
            <Container sx={{ display: "flex" }}>
              <Box
                sx={{
                  marginTop: "1rem",
                  width: "5vw",
                  height: "5vw",
                  borderRadius: "50%",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
                  marginRight: "2rem",
                }}
              />
              <Box
                sx={{
                  marginTop: "1rem",
                  width: "5vw",
                  height: "5vw",
                  borderRadius: "15%",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
                  marginRight: "2rem",
                }}
              />
              <Box
                sx={{
                  marginTop: "1rem",
                  width: "5vw",
                  height: "5vw",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#BCB8B1",
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
