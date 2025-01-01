import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateMenuUiPreferences } from "@redux/slices/menuSlice";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CategoryShapesComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [selecteCategoryShape, setSelecteCategoryShape] = useState(
    (userUiPreferences && selectedRestaurant.userUiPreferences.categoryShape) ??
      "circle"
  );
  const handleChangeShape = (shapeType: string) => {
    setSelecteCategoryShape(shapeType);
    const newUserUiPreferences = {
      ...userUiPreferences,
      categoryShape: shapeType,
    };
    dispatch(updateRestaurantUserUiPreferences(newUserUiPreferences));

    dispatch(updateMenuUiPreferences(newUserUiPreferences));
  };

  useEffect(() => {
    if (
      selectedRestaurant &&
      selectedRestaurant.userUiPreferences &&
      selectedRestaurant.userUiPreferences.categoryShape
    ) {
      setSelecteCategoryShape(
        selectedRestaurant.userUiPreferences.categoryShape
      );
    }
  }, [selectedRestaurant]);

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "2rem",
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
              {getString("categoryShape")}
            </Typography>

            <FormControl sx={{ marginTop: "1rem" }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                value={selecteCategoryShape}
                onChange={(e) => {
                  handleChangeShape(e.target.value);
                }}
              >
                <FormControlLabel
                  value="circle"
                  control={
                    <Radio
                      sx={{
                        color: "var(--primary-color)",
                      }}
                    />
                  }
                  label="Circle"
                />
                <FormControlLabel
                  value="rounded"
                  control={
                    <Radio
                      sx={{
                        color: "var(--primary-color)",
                      }}
                    />
                  }
                  label="Rounded"
                />
                <FormControlLabel
                  value="square"
                  control={
                    <Radio
                      sx={{
                        color: "var(--primary-color)",
                      }}
                    />
                  }
                  label="Square"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default CategoryShapesComponent;
