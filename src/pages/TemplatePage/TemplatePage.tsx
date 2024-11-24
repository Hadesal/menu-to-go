/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@components/common/ToastNotification/ToastNotification.tsx.tsx";
import CategoryShapesComponent from "@components/TemplateComponents/CategoryShapesSection/CategoryShapesComponent";
import ChooseViewTypeSection from "@components/TemplateComponents/ChooseViewTypeSection/ChooseViewTypeSection";
import ColorsSection from "@components/TemplateComponents/ColorsSection/ColorsSection";
import ContactLinksComponent from "@components/TemplateComponents/ContactLinksSection/ContactLinksComponent";
import FontSectionComponent from "@components/TemplateComponents/FontSection/FontSectionComponent";
import UploadLogo from "@components/TemplateComponents/UploadLogo/UploadLogo";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import MenuPage from "@pages/MenuPage/MenuPage";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks.ts";
import { editRestaurant } from "@redux/thunks/restaurantThunks.ts";
import { setSelectedRestaurant } from "@slices/restaurantsSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TemplatePage() {
  const { t } = useTranslation();
  const getString = t;
  const { restaurantList, selectedRestaurant, restaurantLoading } =
    useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(setSelectedRestaurant(restaurantList[0] as RestaurantData));
  }, []);

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
      <Stack spacing={3} sx={{ width: "95%", margin: "0 auto" }}>
        <Backdrop
          sx={{
            color: "var(--primary-color)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={restaurantLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "0 !important",
          }}
        >
          <Typography variant="h5" sx={{ alignSelf: "end" }}>
            {getString("customizeYourMenu")}
          </Typography>

          <Box sx={{ width: "25%" }}>
            <InputLabel id="restaurant-select-label">Restaurant</InputLabel>

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
          </Box>
        </Box>

        <Divider
          sx={{
            marginTop: "1rem",
          }}
        />
        <Container
          id="mainContainer"
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "column", xl: "row" },
            justifyContent: "space-between",
            padding: "0 !important",
            margin: "0 !important",
            minWidth: "inherit !important",
            maxWidth: "inherit !important",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { lg: "100%", xl: "50%" },
              marginRight: "inherit !important",
              marginBottom: { xs: "2rem", md: 0 },
              padding: "0 !important",
              margin: "0 !important",
            }}
          >
            <UploadLogo />
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
              //width: bigScreen > 2000 ? "29vw" : "28vw",
              width: { lg: "29vw", xl: "28vw" },
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
                <MenuPage
                  restaurantTemplateId={
                    (selectedRestaurant && selectedRestaurant.id) ||
                    restaurantList[0].id
                  }
                />
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
      </Stack>
    </>
  );
}
