import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import ColorSelectionSection from "./ColorSelectionSection";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";

const ColorsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const radioList = [
    getString("Text"),
    getString("Background"),
    getString("text&background"),
  ];

  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );

  // const handleEffectedSpace = async (effectedSpace: string) => {
  //   dispatch(
  //     updateRestaurantUserUiPreferences({
  //       ...userUiPreferences,
  //       colors: {
  //         ...userUiPreferences.colors,
  //         effectedSpace: effectedSpace,
  //       },
  //     })
  //   );
  // };

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
              Color
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
                  flexDirection: { xs: "column", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  Background color:
                </Typography>
                <ColorSelectionSection type="backgroundColor" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  Main color:
                </Typography>
                <ColorSelectionSection type="primaryColor" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  width: "100%",
                  justifyContent: "center",
                  gap: { xs: 1, md: 0 },
                  alignItems: { xs: "flex-start", lg: "center" },
                }}
              >
                <Typography sx={{ whiteSpace: "nowrap", width: "28%" }}>
                  Help color:
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
