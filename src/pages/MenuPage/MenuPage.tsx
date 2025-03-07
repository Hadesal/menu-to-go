import emptyData from "@assets/Animation - 1724972864386.json";
import MenuCategories from "@components/Menu/MenuCategories/MenuCategories";
import MenuProductsCard from "@components/Menu/MenuProductsCard/MenuProductsCard";
import MenuProductsList from "@components/Menu/MenuProductsCard/MenuProductsList";
import MenuSelection from "@components/Menu/MenuSelection/MenuSelection";
import { productDefaultData } from "@constants/constants";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ProductPage from "@pages/ProductPage/ProductPage";
import { Styles } from "@pages/ProductPage/ProductPage.styles";
import SplashScreen from "@pages/SplashScreen/SplashScreen";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { fetchMenuData } from "@utils/dataFetchers/MenuDataFetching";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "src/hooks/useLanguage";

// Define menu selection options
const menuSelections = [
  {
    id: "food",
    Label: "Food",
  },
  {
    id: "drinks",
    Label: "Drinks",
  },
];

interface MenuPageProps {
  restaurantTemplateId?: string;
  isDesktop?: boolean;
  isTemplatePage?: boolean;
  loaded?: boolean;
}

export default function MenuPage({
  restaurantTemplateId,
  isDesktop,
  isTemplatePage,
  loaded,
}: MenuPageProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { currentLanguage } = useLanguage();

  const {
    restaurantData,
    selectedCategory,
    selectedCategoryType,
    selectedProduct,
  } = useAppSelector((state) => state.menuData);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  useEffect(() => {
    if (loaded === false) {
      setLoading(false);
      return;
    }
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      const result = await fetchMenuData(
        restaurantTemplateId || (id as string),
        dispatch
      );

      if (result.success) {
        setLoading(false);
      } else {
        console.error("Error fetching data:", result.error);
      }
    };

    fetchDataAndHandleLoading();
  }, [dispatch, restaurantTemplateId]);

  useEffect(() => {
    if ((isDesktop || isTemplatePage) && menuContainerRef.current) {
      console.log("Scrolling to top");
      menuContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (menuContainerRef.current) {
      menuContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedCategory]);

  if (loaded !== false && selectedProduct !== productDefaultData) {
    return <ProductPage />;
  }

  // Filter categories to include only those with at least one available product
  const filteredCategories = restaurantData.categories.filter((category) => {
    // Filter available products
    const availableProducts = category.products?.filter(
      (product) => product.isAvailable
    );
    // Check if availableProducts is defined and has at least one product
    return availableProducts && availableProducts.length > 0;
  });

  // Filter products within the selected category that are available
  const filteredProducts = selectedCategory?.products?.filter(
    (product) => product.isAvailable
  );

  // Determine if menu selection should be shown
  const categoryLabels = filteredCategories.map(
    (category) => category.categoryType
  );
  const showMenuSelection =
    categoryLabels.includes("food") && categoryLabels.includes("drinks");

  return (
    <Container
      dir="ltr"
      ref={menuContainerRef}
      disableGutters
      sx={{
        ...Styles.container,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        ...(isDesktop && { overflowY: "scroll" }), // Only add when greater than sm
      }}
      maxWidth={isDesktop ? "xs" : "md"}
    >
      {loading && (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <SplashScreen />
        </Box>
      )}

      {!loading && (
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor:
              restaurantData.userUiPreferences.colors.backgroundColor,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Show Empty Menu Message When No Data */}
          {filteredCategories.length === 0 ||
          (selectedCategory && Object.keys(selectedCategory).length === 0) ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "100vh" }}
            >
              <Lottie
                animationData={emptyData}
                style={{ width: 200, height: 200 }}
              />
              <Typography>Menu has no data</Typography>
              <Typography>Check again later</Typography>
            </Stack>
          ) : (
            <>
              {/* Main Content */}
              <Box>
                {restaurantData?.userUiPreferences?.logo &&
                  restaurantData.userUiPreferences.logo.length > 0 && (
                    <>
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
                          style={{ width: "100px", height: "100px" }}
                          src={restaurantData.userUiPreferences.logo}
                          alt="Logo"
                        />
                      </Box>
                      <Divider sx={{ marginBottom: 3 }} variant="fullWidth" />
                    </>
                  )}
                <Box
                  sx={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "1rem",
                  }}
                >
                  {showMenuSelection && (
                    <MenuSelection menuSelections={menuSelections} />
                  )}
                </Box>
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingTop: "0.5rem",
                    backgroundColor:
                      restaurantData.userUiPreferences.colors.backgroundColor,
                    paddingBottom: "8px",
                  }}
                >
                  <MenuCategories
                    categories={filteredCategories}
                    categoryTag={selectedCategoryType}
                    selectedCategory={
                      (selectedCategory && selectedCategory.name) || ""
                    }
                  />
                </Box>
                <Divider sx={{ marginTop: 1 }} variant="fullWidth" />
                <Typography
                  color={restaurantData.userUiPreferences.colors.primaryColor}
                  sx={{
                    paddingLeft: currentLanguage === "ar" ? "0rem" : "1rem",
                    paddingRight: currentLanguage === "ar" ? "1rem" : "0rem",
                    paddingTop: "2rem",
                    fontWeight: 500,
                    fontFamily: restaurantData.userUiPreferences.fontType,
                    width: "95%",
                    wordBreak: "break-word",
                  }}
                  variant="h6"
                >
                  {selectedCategory && selectedCategory.name}
                </Typography>
                {/* Render Products */}
                {restaurantData.userUiPreferences.itemsViewType === "GRID" ? (
                  <Grid
                    spacing={2}
                    container
                    sx={{
                      marginTop: "1rem",
                      width: "100%",
                      paddingBottom: "1rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      marginLeft: 0,
                      marginBottom: 5,
                    }}
                  >
                    {filteredProducts &&
                      filteredProducts.map((product, index) => (
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          key={index}
                          sx={{
                            ...(currentLanguage !== "ar" && {
                              paddingLeft:
                                index % 2 === 0
                                  ? "0 !important"
                                  : "8px !important",
                              paddingRight:
                                index % 2 !== 0 ? "0 !important" : "8px",
                            }),
                            ...(currentLanguage === "ar" && {
                              paddingLeft:
                                index % 2 === 0
                                  ? "8px !important"
                                  : "0 !important",
                              paddingRight:
                                index % 2 !== 0 ? "8px" : "0 !important",
                            }),
                          }}
                        >
                          <MenuProductsCard key={index} product={product} />
                        </Grid>
                      ))}
                  </Grid>
                ) : (
                  <Grid
                    spacing={2}
                    container
                    sx={{
                      marginTop: "1rem",
                      width: "100%",
                      paddingBottom: "1rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      marginLeft: 0,
                      marginBottom: 5,
                    }}
                  >
                    {filteredProducts &&
                      filteredProducts.map((product, index) => (
                        <Grid
                          sx={{ paddingLeft: "0 !important" }}
                          item
                          xs={12}
                          sm={12}
                          key={index}
                        >
                          <MenuProductsList key={index} product={product} />
                        </Grid>
                      ))}
                  </Grid>
                )}
              </Box>

              {/* Footer */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 1,
                    width: "100%",
                  }}
                >
                  {/* Contact Links */}
                  {restaurantData.userUiPreferences.contactLinks.facebook
                    .length > 0 && (
                    <IconButton
                      component="a"
                      href={`https://${restaurantData.userUiPreferences.contactLinks.facebook}`}
                      target="_blank"
                    >
                      <FacebookIcon
                        sx={{
                          color:
                            restaurantData.userUiPreferences?.colors
                              .primaryColor,
                        }}
                      />
                    </IconButton>
                  )}
                  {restaurantData.userUiPreferences.contactLinks.twitter
                    .length > 0 && (
                    <IconButton
                      component="a"
                      href={`https://${restaurantData.userUiPreferences.contactLinks.twitter}`}
                      target="_blank"
                    >
                      <XIcon
                        sx={{
                          color:
                            restaurantData.userUiPreferences?.colors
                              .primaryColor,
                        }}
                      />
                    </IconButton>
                  )}
                  {restaurantData.userUiPreferences.contactLinks.instagram
                    .length > 0 && (
                    <IconButton
                      component="a"
                      href={`https://${restaurantData.userUiPreferences.contactLinks.instagram}`}
                      target="_blank"
                    >
                      <InstagramIcon
                        sx={{
                          color:
                            restaurantData.userUiPreferences?.colors
                              .primaryColor,
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
                <Divider variant="fullWidth" />
                {/* Footer */}
                <Box
                  sx={{
                    textAlign: "center",
                    fontSize: "14px",
                    width: "100%",
                    padding: 1,
                    marginTop: "auto", // Ensures footer stays at the bottom
                  }}
                >
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    target="_blank"
                    href=""
                  >
                    Powered by MenuToGo®
                  </a>
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}
