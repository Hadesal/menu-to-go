import { productDefaultData } from "@constants/constants";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductPage from "@pages/ProductPage/ProductPage";
import SplashScreen from "@pages/SplashScreen/SplashScreen";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { fetchMenuData } from "@utils/dataFetchers/MenuDataFetching";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuPage from "./MenuPage";

interface MenuComponentProps {
  showOnlyMobile?: boolean;
}

export default function MenuComponent({ showOnlyMobile }: MenuComponentProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const { restaurantData, selectedProduct } = useAppSelector(
    (state) => state.menuData
  );
  // Inside your component
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { id } = useParams();

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      const result = await fetchMenuData(id as string, dispatch);

      if (result.success) {
        setLoading(false);
      } else {
        console.error("Error fetching data:", result.error);
      }
    };

    fetchDataAndHandleLoading();
  }, [dispatch]);

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        ...(isDesktop && { overflowY: "hidden"}), // Only add when greater than sm
        width: "100%",
        maxWidth: "100% !important",
        minHeight: "100vh",
      }}
    >
      {selectedProduct !== productDefaultData ? (
        <ProductPage isDesktop={isDesktop} />
      ) : (
        <MenuPage isDesktop={isDesktop} loaded={loading} />
      )}

      {/* <MenuPage isDesktop={isDesktop} loaded={loading} /> */}
      {showOnlyMobile ||
        (isDesktop && (
          <>
            {/* For desktop view */}
            <Container
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#fffdfd",
                maxWidth: "100% !important",
              }}
            >
              {restaurantData.userUiPreferences.logo && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      mixBlendMode: "multiply",
                    }}
                    src={restaurantData.userUiPreferences.logo}
                    alt="Logo"
                  />
                </Box>
              )}

              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color:
                    restaurantData.userUiPreferences?.colors.secondaryColor,
                }}
              >
                {restaurantData.name}
              </Typography>
            </Container>
          </>
        ))}
    </Container>
  );
}
