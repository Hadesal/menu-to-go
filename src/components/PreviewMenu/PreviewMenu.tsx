import { productDefaultData } from "@constants/constants";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useMediaQuery } from "@mui/system";
import MenuPage from "@pages/MenuPage/MenuPage";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { Dispatch, forwardRef, SetStateAction } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "./device.css";

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
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenPreviewMenu(false);
    dispatch(setSelectedProduct(productDefaultData));
  };
  const { restaurantList, selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );
  const { selectedProduct } = useAppSelector((state) => state.menuData);

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
        className="device"
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
