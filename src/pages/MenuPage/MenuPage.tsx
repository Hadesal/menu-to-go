import emptyData from "@assets/Animation - 1724972864386.json";
import MenuCategories from "@components/Menu/MenuCategories/MenuCategories";
import MenuProductsCard from "@components/Menu/MenuProductsCard/MenuProductsCard";
import MenuProductsList from "@components/Menu/MenuProductsCard/MenuProductsList";
import MenuSelection from "@components/Menu/MenuSelection/MenuSelection";
import { categoryDefaultData, productDefaultData } from "@constants/constants";
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
}

export default function MenuPage({ restaurantTemplateId }: MenuPageProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const {
    restaurantData,
    selectedCategory,
    selectedCategoryType,
    selectedProduct,
  } = useAppSelector((state) => state.menuData);

  const { id } = useParams();
  useEffect(() => {
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

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  if (selectedProduct !== productDefaultData) {
    return <ProductPage />;
  }

  // Filter categories to include only those with products
  const filteredCategories = restaurantData.categories.filter(
    (category) => category.products!.length > 0
  );

  // Determine if menu selection should be shown
  const categoryLabels = filteredCategories.map(
    (category) => category.categoryType
  );
  const showMenuSelection =
    categoryLabels.includes("food") && categoryLabels.includes("drinks");

  if (
    filteredCategories.length === 0 ||
    (selectedCategory && Object.keys(selectedCategory).length === 0)
  ) {
    return (
      <>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <Lottie
            animationData={emptyData}
            style={{ width: 200, height: 200 }}
          />
          <Typography>Menu has no data</Typography>
          <Typography>check again later</Typography>
        </Stack>
      </>
    );
  }
  return (
    <Container
      disableGutters
      sx={{
        ...Styles.container,
        backgroundColor:
          restaurantData.userUiPreferences.colors.backgroundColor,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      maxWidth="sm"
    >
      <Box sx={{ flexGrow: 1 }}>
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
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      // borderRadius: "50%",
                    }}
                    src={restaurantData.userUiPreferences.logo}
                    alt="Logo"
                  />
                </Box>
              </Box>
              <Divider sx={{ marginBottom: 3 }} variant="fullWidth" />
            </>
          )}

        <Box sx={Styles.box}>
          {showMenuSelection && (
            <MenuSelection menuSelections={menuSelections} />
          )}
          <MenuCategories
            categories={filteredCategories}
            categoryTag={selectedCategoryType}
            selectedCategory={
              (selectedCategory !== categoryDefaultData &&
                selectedCategory.name) ||
              ""
            }
          />
        </Box>
        <Divider sx={{ marginTop: 3 }} variant="fullWidth" />
        <Typography
          color={restaurantData.userUiPreferences.colors.primaryColor}
          sx={{
            paddingLeft: "1rem",
            paddingTop: "2rem",
            fontWeight: 500,
            fontFamily: restaurantData.userUiPreferences.fontType,
          }}
          variant="h6"
        >
          {selectedCategory !== categoryDefaultData && selectedCategory.name}
        </Typography>
        {restaurantData.userUiPreferences.itemsViewType === "GRID" ? (
          <Grid
            spacing={2}
            container
            sx={{
              marginTop: "1rem",
              width: "100%",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "1rem",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              paddingLeft: "1rem",
              paddingRight: "1rem",
              marginLeft: 0,
              marginBottom: 5,
            }}
          >
            {selectedCategory !== categoryDefaultData &&
              selectedCategory.products!.map((product, index) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  key={index}
                  sx={{
                    paddingLeft: index % 2 === 0 ? "0 !important" : "0px",
                    paddingTop: index < 2 ? "0 !important" : "0px",
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "1rem",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              paddingLeft: "1rem",
              paddingRight: "1rem",
              marginLeft: 0,
              marginBottom: 5,
            }}
          >
            {selectedCategory?.products!.map((product, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                key={index}
                sx={{
                  paddingLeft: "0 !important",
                  // paddingTop: index < 2 ? "0 !important" : "0px",
                }}
              >
                <MenuProductsList key={index} product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
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
        {restaurantData.userUiPreferences.contactLinks.facebook.length > 0 && (
          <IconButton
            component="a"
            href={`https://${restaurantData.userUiPreferences.contactLinks.facebook}`}
            target="_blank"
          >
            <FacebookIcon
              sx={{
                color: restaurantData.userUiPreferences?.colors.primaryColor,
              }}
            />
          </IconButton>
        )}
        {restaurantData.userUiPreferences.contactLinks.twitter.length > 0 && (
          <IconButton
            component="a"
            href={`https://${restaurantData.userUiPreferences.contactLinks.twitter}`}
            target="_blank"
          >
            <XIcon
              sx={{
                color: restaurantData.userUiPreferences?.colors.primaryColor,
              }}
            />
          </IconButton>
        )}
        {restaurantData.userUiPreferences.contactLinks.instagram.length > 0 && (
          <IconButton
            component="a"
            href={`https://${restaurantData.userUiPreferences.contactLinks.instagram}`}
            target="_blank"
          >
            <InstagramIcon
              sx={{
                color: restaurantData.userUiPreferences?.colors.primaryColor,
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
    </Container>
  );
}
