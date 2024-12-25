import { ViewType } from "@dataTypes/RestaurantObject";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateMenuUiPreferences } from "@slices/menuSlice";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChooseViewTypeSection() {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );

  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [selectedView, setSelectedView] = useState(
    (userUiPreferences && selectedRestaurant.userUiPreferences.itemsViewType) ??
      ViewType.GRID
  );

  const handleChange = (selectedView: ViewType) => {
    setSelectedView(selectedView);

    const newUserUiPreferences = {
      ...userUiPreferences,
      itemsViewType: selectedView,
    };

    dispatch(updateRestaurantUserUiPreferences(newUserUiPreferences));
    dispatch(updateMenuUiPreferences(newUserUiPreferences));
  };

  useEffect(() => {
    if (selectedRestaurant) {
      setSelectedView(selectedRestaurant.userUiPreferences.itemsViewType);
    }
  }, [selectedRestaurant]);

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "2rem",
          width: "100%",
          height: "fit-content",
          marginTop: "1rem",
        }}
      >
        <Card sx={{ borderRadius: "2rem", height: "100%" }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography
              sx={{
                color: "000000",
              }}
              variant="h6"
            >
              {getString("viewType")}
            </Typography>
            <Container
              disableGutters
              sx={{
                display: "flex",
                padding: 0,
                marginTop: "1rem",
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  row
                  value={selectedView}
                  onChange={(e) => {
                    handleChange(e.target.value as ViewType);
                  }}
                >
                  <FormControlLabel
                    value="GRID"
                    control={
                      <Radio
                        sx={{
                          color: "var(--primary-color)",
                        }}
                      />
                    }
                    label={
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <GridViewIcon
                          style={{
                            marginRight: "8px",
                            color: "var(--primary-color)",
                          }}
                        />
                        {getString("viewTypeGrid")}
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="LIST"
                    control={
                      <Radio
                        sx={{
                          color: "var(--primary-color)",
                        }}
                      />
                    }
                    label={
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <ViewListIcon
                          style={{
                            marginRight: "8px",
                            color: "var(--primary-color)",
                          }}
                        />
                        {getString("viewTypeList")}
                      </span>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
