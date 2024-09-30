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

  const handleEffectedSpace = async (effectedSpace: string) => {
    dispatch(
      updateRestaurantUserUiPreferences({
        ...userUiPreferences!,
        colors: {
          ...userUiPreferences!.colors,
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
            {userUiPreferences &&
            userUiPreferences?.colors?.effectedSpace === "Background" ? (
              <ColorSelectionSection type="Background" />
            ) : userUiPreferences?.colors?.effectedSpace === "Text" ? (
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
              {getString("effectedSpace")}
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
                        checked={
                          userUiPreferences?.colors?.effectedSpace === value
                        }
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
