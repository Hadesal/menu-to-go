import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useMediaQuery } from "@mui/system";
import MenuPage from "@pages/MenuPage/MenuPage";
import { useAppSelector } from "@redux/reduxHooks";
import { Dispatch, forwardRef, SetStateAction } from "react";
import { Slide, Toolbar, Dialog, AppBar, IconButton } from "@mui/material";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface PreviewMenuProps {
  openPreviewMenu: boolean;
  setOpenPreviewMenu: Dispatch<SetStateAction<boolean>>;
}

export default function PreviewMenu({
  openPreviewMenu,
  setOpenPreviewMenu,
}: PreviewMenuProps) {
  const handleClose = () => {
    setOpenPreviewMenu(false);
  };
  const { restaurantList, selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const isLgAndUp = useMediaQuery("(max-width:1536px)");

  return (
    <Dialog
      fullScreen
      open={openPreviewMenu}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          marginTop: isLgAndUp ? "" : "1rem",
        }}
      >
        <DeviceFrameset
          device="iPhone X"
          zoom={isLgAndUp ? 0.7 : 0.95}
          color="black"
        >
          <div
            style={{
              height: "100%",
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              boxSizing: "border-box",
              paddingTop: "20px",
            }}
            className="hide-scrollbar"
          >
            <MenuPage
              restaurantTemplateId={
                (selectedRestaurant && selectedRestaurant.id) ||
                restaurantList[0].id
              }
            />
          </div>
        </DeviceFrameset>
      </div>
    </Dialog>
  );
}
