import { ViewType } from "@dataTypes/RestaurantObject";
import ImageIcon from "@mui/icons-material/Image";
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

export default function ChooseIngredientsViewTypeSection() {
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );

  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [selectedView, setSelectedView] = useState(
    (userUiPreferences &&
      selectedRestaurant.userUiPreferences.ingredientViewType) ??
      ViewType.GRID
  );

  const handleChange = (selectedView: ViewType) => {
    setSelectedView(selectedView);

    const newUserUiPreferences = {
      ...userUiPreferences,
      ingredientViewType: selectedView,
    };

    dispatch(updateRestaurantUserUiPreferences(newUserUiPreferences));
    dispatch(updateMenuUiPreferences(newUserUiPreferences));
  };

  useEffect(() => {
    if (
      selectedRestaurant &&
      selectedRestaurant.userUiPreferences &&
      selectedRestaurant.userUiPreferences.ingredientViewType
    ) {
      setSelectedView(selectedRestaurant.userUiPreferences.ingredientViewType);
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
              Ingredients view type
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
                        <ImageIcon
                          style={{
                            marginRight: "8px",
                            color: "var(--primary-color)",
                          }}
                        />
                        Visual Cards
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
                        List
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
