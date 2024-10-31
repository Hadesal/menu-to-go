/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorsSection from "@components/TemplateComponents/ColorsSection/ColorsSection";
import FontSectionComponent from "@components/TemplateComponents/FontSection/FontSectionComponent";
import CategoryShapesComponent from "@components/TemplateComponents/CategoryShapesSection/CategoryShapesComponent";
import ContactLinksComponent from "@components/TemplateComponents/ContactLinksSection/ContactLinksComponent";
import { useEffect, useState } from "react";
import ChooseViewTypeSection from "@components/TemplateComponents/ChooseViewTypeSection/ChooseViewTypeSection";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks.ts";
import { setSelectedRestaurant } from "@slices/restaurantsSlice";
import { editRestaurant } from "@redux/thunks/restaurantThunks.ts";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import ToastNotification from "@components/common/ToastNotification/ToastNotification.tsx.tsx";

export default function TemplatePage() {
  const { t } = useTranslation();
  const getString = t;
  const [bigScreen, setBigScreen] = useState<number>(2000);
  const { restaurantList, selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setBigScreen(window.innerWidth);
  }, []);
  const [toastMessageObject, setToastMessageObject] = useState<{
    success: boolean;
    message: string;
    show: boolean;
  }>({
    success: true,
    message: "",
    show: false,
  });

  const handleChangeSelectedRestaurant = (event: any) => {
    const selectedName = event.target.value;
    const selected = restaurantList.find(
      (restaurant) => restaurant.name === selectedName
    );
    dispatch(setSelectedRestaurant(selected as RestaurantData));
  };

  const handleSaveChanges = async () => {
    if (selectedRestaurant && selectedRestaurant.id) {
      const result = await dispatch(
        editRestaurant({
          updatedRestaurant: selectedRestaurant,
          restaurantId: selectedRestaurant.id,
        })
      );
      if (editRestaurant.fulfilled.match(result)) {
        setToastMessageObject({
          success: true,
          message: result.payload.message,
          show: true,
        });
      } else {
        setToastMessageObject({
          success: false,
          message: result.error.message,
          show: true,
        });
      }
    }
  };
  const handleToastClose = () => {
    setToastMessageObject((prev) => ({ ...prev, show: false }));
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 0,
          padding: 0,
          maxWidth: "inherit !important",
          minWidth: "inherit !important",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "#797979",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            textAlign: "left",
            margin: 0,
          }}
          variant="h5"
        >
          {getString("customizeYourMenu")}
        </Typography>

        <FormControl sx={{ width: "30rem" }}>
          <InputLabel id="restaurant-select-label">
            {selectedRestaurant
              ? selectedRestaurant.name
              : restaurantList[0].name}
          </InputLabel>

          <Select
            key="restaurantSelect"
            labelId="restaurant-select-label"
            value={
              selectedRestaurant
                ? selectedRestaurant.name
                : restaurantList[0].name
            }
            onChange={handleChangeSelectedRestaurant}
            sx={{ width: "100%" }}
          >
            {restaurantList.length > 0 ? (
              restaurantList.map((restaurant, index) => (
                <MenuItem key={index} value={restaurant.name}>
                  {restaurant.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                {getString("noRestaurantsAvailable")}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Container>
      <Divider
        sx={{
          marginTop: "1rem",
        }}
      />
      <Container
        id="mainContainer"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          padding: 0,
          margin: 0,
          minWidth: "inherit !important",
          maxWidth: "inherit !important",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            width: bigScreen > 2000 ? "40%" : "50%",
            marginRight: "inherit !important",
            marginLeft: "inherit !important",
            marginBottom: { xs: "2rem", md: 0 },
          }}
        >
          <ChooseViewTypeSection />
          <ColorsSection />
          <FontSectionComponent />
          <CategoryShapesComponent />
          <ContactLinksComponent />
          <Button
            sx={{
              alignSelf: "end",
              marginTop: "2rem",
              backgroundColor: "#a4755d",
              width: "6rem",
              color: "white",
            }}
            onClick={handleSaveChanges}
          >
            {getString("save")}
          </Button>
        </Container>

        <Paper
          elevation={6}
          sx={{
            marginTop: { xs: "1rem", md: "3rem" },
            padding: 0,
            borderRadius: "2rem",
            width: bigScreen > 2000 ? "29vw" : "37vw",
          }}
        >
          <Card
            title={"Embedded Content"}
            id="menuLiveViewContainerid"
            sx={{
              height: "100%",
              padding: 0,
              margin: 0,
              borderRadius: "2rem",
            }}
          >
            <CardContent
              sx={{
                ":last-child": { padding: 0 },
                height: "100%",
                width: "100%",
                padding: 0,
                margin: 0,
                borderRadius: "2rem",
              }}
            >
              <iframe
                src={
                  selectedRestaurant
                    ? `http://localhost:5173/menu/${selectedRestaurant.id}`
                    : ""
                }
                title={"menu"}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              ></iframe>
            </CardContent>
          </Card>
        </Paper>
        <ToastNotification
          severity={toastMessageObject.success === true ? "success" : "error"}
          message={toastMessageObject.message}
          show={toastMessageObject.show}
          onClose={handleToastClose}
        />
      </Container>
    </>
  );
}
