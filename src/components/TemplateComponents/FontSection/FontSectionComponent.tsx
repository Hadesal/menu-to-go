import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { useEffect } from "react";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
const defaultFontTypes = [
  "Aa.Serif",
  "Aa.Poppins",
  "Aa.Arial",
  "Aa.sans-serifs",
  "Aa.Mono",
];
const FontSectionComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );
  useEffect(() => {
    console.log(userUiPreferences);
  }, [userUiPreferences]);
  const renderFontBox = (font: string, key: number) => {
    const handleSelectFontType = (fontValue: string) => {
      if (!userUiPreferences) return;
      const updatedUserUiPreferences = {
        ...userUiPreferences,
        fontType: fontValue,
      };
      dispatch(updateRestaurantUserUiPreferences(updatedUserUiPreferences));
    };
    const fontSplitten = font.split(".");
    const fontType = fontSplitten[1];
    return (
      <Card
        key={key}
        sx={{
          width: { xs: "4rem", sm: "5rem" },
          height: { xs: "4rem", sm: "5rem" },
          borderRadius: "1rem",
          border: "solid",
          borderWidth: "2px",
          borderColor:
            userUiPreferences?.fontType === fontType ? "#A4755D" : "black",
          marginRight: "1rem",
          marginLeft: "1rem",
          marginBottom: "1rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            cursor: "pointer",
          }}
          key={key + 10}
          onClick={() => {
            handleSelectFontType(fontType);
          }}
        >
          <Typography
            key={key + 20}
            sx={{ fontSize: "14px", fontWeight: "bold" }}
            fontFamily={fontSplitten[1]}
          >
            {fontSplitten[0]}
          </Typography>
          <Typography
            key={key + 30}
            sx={{ fontSize: "14px" }}
            fontFamily={fontSplitten[1]}
          >
            {fontSplitten[1]}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "2rem",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Card
          key={"CardContainerKey"}
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent
            key={"CardContentContainerKey"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1rem",
                color: "#797979",
              }}
              variant="h5"
            >
              {getString("font")}
            </Typography>
            <Container
              key={"FontContainerKey"}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 0fr)",
                justifyItems: "center",
                rowGap: "1rem",
                columnGap: "1rem",
              }}
            >
              {defaultFontTypes.map((fontType, index) =>
                renderFontBox(fontType, index)
              )}
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default FontSectionComponent;
