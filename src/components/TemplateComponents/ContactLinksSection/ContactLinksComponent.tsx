import {
  Paper,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  Popover,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PlatformPopoverContentsComponent from "./PlatformPopoverContentsComponent";

const ContactLinksComponent = () => {
  const { t } = useTranslation();
  const getString = t;
  const [faceBookOpenPopover, setFaceBookOpenPopover] =
    useState<boolean>(false);
  const [instagramOpenPopover, setInstagramOpenPopover] =
    useState<boolean>(false);
  const [twitterOpenPopover, setTwitterOpenPopover] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          marginTop: "1rem",
          borderRadius: "2rem",
          width: "100%",
        }}
      >
        <Card
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Typography
              sx={{
                color: "000000",
              }}
              variant="h6"
            >
              {getString("contactLinks")}
            </Typography>

            <Container
              disableGutters
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: "flex-start",
                gap: 2,
                marginTop: "1rem",
                padding: 0,
              }}
            >
              <div id="facebookLinkContainer">
                <Button
                  id="facebookLinkButton"
                  startIcon={<FacebookOutlinedIcon />}
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    marginBottom: { xs: "1rem", sm: "0" },
                  }}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setFaceBookOpenPopover(true);
                  }}
                >
                  Facebook
                </Button>
                <Popover
                  id="facebookLinkPopover"
                  open={faceBookOpenPopover}
                  onClose={() => {
                    setFaceBookOpenPopover(false);
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <PlatformPopoverContentsComponent
                    type="facebook"
                    setIsOpen={setFaceBookOpenPopover}
                  />
                </Popover>
              </div>
              <div>
                <Button
                  startIcon={<CiTwitter />}
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    marginBottom: { xs: "1rem", sm: "0" },
                  }}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setTwitterOpenPopover(true);
                  }}
                >
                  Twitter
                </Button>
                <Popover
                  id="twitterLinkPopover"
                  open={twitterOpenPopover}
                  onClose={() => {
                    setTwitterOpenPopover(false);
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <PlatformPopoverContentsComponent
                    type="twitter"
                    setIsOpen={setTwitterOpenPopover}
                  />
                </Popover>
              </div>
              <div>
                <Button
                  startIcon={<FaInstagram />}
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setInstagramOpenPopover(true);
                  }}
                >
                  Instagram
                </Button>
                <Popover
                  id="instagramLinkPopover"
                  open={instagramOpenPopover}
                  onClose={() => {
                    setInstagramOpenPopover(false);
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <PlatformPopoverContentsComponent
                    type="instagram"
                    setIsOpen={setInstagramOpenPopover}
                  />
                </Popover>
              </div>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ContactLinksComponent;
