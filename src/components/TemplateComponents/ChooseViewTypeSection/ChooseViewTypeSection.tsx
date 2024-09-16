import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import gridViewImage from "../../../assets/gridViewImage.png";
import listViewImage from "../../../assets/listViewImage.png";
import { useTranslation } from "react-i18next";
import { ViewType } from "../../../DataTypes/RestaurantObject";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { setUserUiPreferences } from "../../../redux/slices/menuSlice";

interface MenuViewType {
  id: string;
  type: ViewType;
}
const views = {
  gridView: {
    id: "gridView",
    type: ViewType.GRID,
  },
  listView: {
    id: "listView",
    type: ViewType.LIST,
  },
};
export default function ChooseViewTypeSection() {
  const [selectedView, setSelectedView] = useState<MenuViewType>(
    views.gridView
  );
  const { t } = useTranslation();
  const getString = t;
  const primaryColor = "#a4755d";
  const dispatch = useAppDispatch();
  const { userUiPreferences } = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant
  );

  const dispatchSelectedView = (selectedView: ViewType) => {
    const newUserUiPreferences = {
      ...userUiPreferences,
      itemsViewType: selectedView,
    };
    dispatch(setUserUiPreferences(newUserUiPreferences));
  };
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "2rem",
          marginTop: "3rem",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Card sx={{ borderRadius: "2rem", height: "100%" }}>
          <CardContent>
            <Typography
              sx={{
                color: "#797979",
                textAlign: "left",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
              variant="h6"
            >
              {getString("viewType")}
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: 0,
                marginTop: "1rem",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: "12vw",
                  height: "12vw",
                  cursor: "pointer",
                  border: selectedView?.id === "gridView" ? "solid" : "none",
                  borderRadius: "1rem",
                  borderColor: primaryColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  id="gridView"
                  onClick={() => {
                    setSelectedView(views.gridView);
                    dispatchSelectedView(views.gridView.type);
                  }}
                  sx={{
                    margin: 0,
                    width: "12vw",
                    height: "12vw",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={gridViewImage}
                  />
                </Box>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  width: "12.1vw",
                  height: "12.1vw",
                  cursor: "pointer",
                  border: selectedView.id === "listView" ? "solid" : "none",
                  borderRadius: "1rem",
                  borderColor: primaryColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  id="listView"
                  onClick={() => {
                    setSelectedView(views.listView);
                    dispatchSelectedView(views.listView.type);
                  }}
                  sx={{
                    width: "11.7vw",
                    height: "11.7vw",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={listViewImage}
                  />
                </Box>
              </Paper>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
