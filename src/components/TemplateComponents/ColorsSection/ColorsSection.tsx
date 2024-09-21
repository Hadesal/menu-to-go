import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { Colors } from "../../../DataTypes/RestaurantObject";
import ColorSelectionSection from "./ColorSelectionSection";
import { updateRestaurantUserUiPreferences } from "../../../redux/slices/restaurantsSlice";

const ColorsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const radioList = [
    getString("Text"),
    getString("Background"),
    getString("text&background"),
  ];

  const dispatch = useAppDispatch();
  const { userUiPreferences } = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant
  );
  const [selectedColors, setSelectedColors] = useState<Colors>(
    userUiPreferences?.colors
  );
  useEffect(() => {}, [selectedColors]);

  const handleEffectedSpace = async (effectedSpace: string) => {
    setSelectedColors((prev) => ({ ...prev, effectedSpace: effectedSpace }));

    dispatch(
      updateRestaurantUserUiPreferences({
        ...userUiPreferences,
        colors: {
          ...userUiPreferences.colors,
          effectedSpace: effectedSpace,
        },
      })
    );
  };

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
          <CardContent>
            {selectedColors?.effectedSpace === "Background" ? (
              <ColorSelectionSection type="Background" />
            ) : selectedColors?.effectedSpace === "Text" ? (
              <ColorSelectionSection type="Text" />
            ) : (
              <>
                <ColorSelectionSection type="Background" />
                <ColorSelectionSection type="Text" />
              </>
            )}
            <Typography
              variant="body1"
              sx={{
                color: "#797979",
                marginTop: "2rem",
                textAlign: "left",
              }}
            >
              {getString("applyAccentColor")}
            </Typography>
            <Container
              id="checkBoxesContainerid"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <RadioGroup sx={{ display: "flex", flexDirection: "row" }}>
                {radioList.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    sx={{ color: "#797979" }}
                    control={
                      <Radio
                        sx={{
                          color: "#A4755D",
                          "& .MuiSvgIcon-root": { fontSize: 25 },
                        }}
                        checked={selectedColors?.effectedSpace === value}
                        value={value}
                        onChange={(radioEl) => {
                          handleEffectedSpace(radioEl.target.value);
                        }}
                      />
                    }
                    label={value}
                  />
                ))}
              </RadioGroup>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ColorsSection;
