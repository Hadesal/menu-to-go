/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ItemMenu from "./ItemMenu";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import placeHolderImg from "@assets/catering-item-placeholder-704x520.png";

const ItemRow = ({
  item,
  index,
  checkedItems,
  handleChange,
  styles,
  handleMenuClick,
  anchorEls,
}: any) => (
  <Paper
    key={item.id}
    elevation={3}
    sx={{
      ...styles.paperListView,
      background: checkedItems[item?.id || ""] ? "#FFF9F4" : "inherit",
      "&:hover": {
        backgroundColor: "#FFF9F4",
      },
    }}
  >
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          ...styles.listItemBox,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Checkbox
          checked={checkedItems[item?.id || ""]}
          onChange={(e) => handleChange(e, item)}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            borderRadius: 0,
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
        <IconButton
          sx={{
            padding: 0.8,
            cursor: "grab",
            "&:hover": {
              background: "transparent",
            },
          }}
          aria-label="drag"
        >
          <DragIndicatorIcon
            sx={{
              color: "var(--primary-color)",
            }}
            fontSize="medium"
          />
        </IconButton>
        <img
          style={{ borderRadius: "10px" }}
          src={item.image ? item.image : placeHolderImg}
          width={60}
          height={60}
        />
        <ListItemText
          primary={
            <Typography
              sx={{ fontWeight: 500, fontSize: "18px" }}
              variant="body1"
              style={{ color: "var(--primary-color)" }}
            >
              {item.name}
            </Typography>
          }
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
          {item.price}$
        </Typography>
        <ItemMenu
          index={index}
          anchorEls={anchorEls}
          handleMenuClick={handleMenuClick}
          item={item}
        />
      </Box>
    </ListItem>
  </Paper>
);
export default ItemRow;
