import {
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { useEffect, useState } from "react";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
import { updateMenuUiPreferences } from "@redux/slices/menuSlice";
const defaultFontTypes = ["Serif", "Poppins", "Arial", "sans-serifs", "Mono"];
const FontSectionComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );
  const [selectedFont, setSelectedFont] = useState<string>(
    selectedRestaurant && selectedRestaurant.userUiPreferences.fontType
  );

  const handleSelectFontType = (fontValue: string) => {
    const updatedUserUiPreferences = {
      ...userUiPreferences,
      fontType: fontValue,
    };
    dispatch(updateRestaurantUserUiPreferences(updatedUserUiPreferences));
    dispatch(updateMenuUiPreferences(updatedUserUiPreferences));
  };

  useEffect(() => {
    if (selectedRestaurant) {
      setSelectedFont(selectedRestaurant.userUiPreferences.fontType);
    }
  }, [selectedRestaurant]);

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
              padding: 4,
            }}
          >
            <Typography
              sx={{
                // marginBottom: "1rem",
                // marginTop: "1rem",
                color: "000000",
              }}
              variant="h6"
            >
              {getString("font")}
            </Typography>

            <FormControl fullWidth sx={{ marginTop: "1rem" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedFont}
                sx={{ borderRadius: "15px", marginTop: 1 }}
                onChange={(e) => {
                  setSelectedFont(e.target.value);
                  handleSelectFontType(e.target.value);
                }}
              >
                {defaultFontTypes.map((fontType, index) => (
                  <MenuItem key={index} value={fontType}>
                    {fontType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Container
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
            </Container> */}
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default FontSectionComponent;
