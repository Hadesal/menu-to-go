import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ColorSelectionSection from "./ColorSelectionSection";
import { useTranslation } from "react-i18next";
const ColorsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  return (
    <>
      <Paper
        id="colorsStylingContainerPaper"
        elevation={6}
        sx={{
          borderRadius: "2rem",
          marginTop: "1rem",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Card
          id="colorsStylingContainer"
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Typography
              sx={{
                color: "000000",
              }}
              variant="h6"
            >
              {getString("templateColorSectionHeader")}
            </Typography>

            <Container
              disableGutters
              id="checkBoxesContainerid"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  {getString("templateColorSectionBckColor")}
                </Typography>
                <ColorSelectionSection type="backgroundColor" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  {getString("templateColorSectionTextColor")}
                </Typography>
                <ColorSelectionSection type="primaryColor" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  {getString("templateColorSectionHighlightColor")}
                </Typography>
                <ColorSelectionSection type="secondaryColor" />
              </Box>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ColorsSection;
