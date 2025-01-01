import { Styles } from "./MenuFooter.styles";
import { Box } from "@mui/material";
import BottomRightVector from "@assets/bottomrightvector.svg";
import TopLeftVector from "@assets/topleftvector.svg";
import TopRightVector from "@assets/toprightvector.svg";
import FacebookIcon from "@assets/facebookvector.svg";
import InstagramIcon from "@assets/instagramvector.svg";
import GmailIcon from "@assets/gmailvector.svg";
import Button from "@mui/material/Button";
import { useAppSelector } from "@redux/reduxHooks";

export default function MenuFooter() {
  const { restaurantData } = useAppSelector((state) => state.menuData);
  return (
    <Box
      component={"footer"}
      sx={{
        ...Styles.footerContainer,
        backgroundColor: restaurantData.userUiPreferences.colors.primaryColor,
      }}
      maxWidth="sm"
    >
      <Box>
        <Box
          component={"img"}
          src={BottomRightVector}
          sx={Styles.footerBottomRightSvg}
        />
        <Box
          component={"img"}
          src={TopLeftVector}
          sx={Styles.footerTopLeftSvg}
        />
        <Box
          component={"img"}
          src={TopRightVector}
          sx={Styles.footerTopRightSvg}
        />
      </Box>

      <Box sx={Styles.socialMediaContainer}>
        <Box sx={Styles.menuTextContainer}>
          <span style={Styles.menuText}>Menu</span>
          <span style={Styles.menuText}>-To-</span>
          <span style={Styles.menuText}>Go</span>
        </Box>
        <Box sx={Styles.socialMediaIconsContainer}>
          <Box>
            <Box
              component={"img"}
              sx={Styles.socialMediaIcon}
              src={FacebookIcon}
            />
            <Box
              component={"img"}
              sx={{ ...Styles.socialMediaIcon, mx: 1 }}
              src={InstagramIcon}
            />
            <Box
              component={"img"}
              sx={{ ...Styles.socialMediaIcon, mx: 1 }}
              src={GmailIcon}
            />
          </Box>

          <Box sx={Styles.contactInfo}>
            <Box component={"span"}>For inquiries Call</Box>
            <Box component={"span"}>+10025568852</Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button sx={Styles.policyButton}>Policy</Button>
          </Box>
        </Box>
      </Box>
      <Box component={"span"} style={Styles.footerText}>
        © 2024
        <a href="https://flowbite.com/" style={Styles.footerLink}>
          MenuToGo™
        </a>
        . All Rights Reserved.
      </Box>
    </Box>
  );
}
