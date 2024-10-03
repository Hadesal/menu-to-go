/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
const ItemMenu = ({
  index,
  anchorEls,
  handleMenuClick,
  handleMenuClose,
  handleEditClick,
  handleDeleteClick,
  duplicateFunction,
  item,
}: any) => {
  const { t } = useTranslation();
  const getString = t;

  return (
    <>
      <IconButton
        sx={{
          padding: 0.8,
          marginLeft: 4,
          "&:hover": {
            background: "#A4755D30",
          },
        }}
        aria-label="more"
        onClick={(event) => handleMenuClick(event, index)}
      >
        <MoreVertIcon
          sx={{
            color: "var(--primary-color)",
          }}
          fontSize="medium"
        />
      </IconButton>
      <Menu
        id={`productOptions-${index}`}
        anchorEl={anchorEls[index]}
        open={Boolean(anchorEls[index])}
        onClose={() => handleMenuClose(index)}
        disableScrollLock={true}
        elevation={1}
      >
        {duplicateFunction && (
          <MenuItem
            onClick={() => {
              duplicateFunction(item);
              handleMenuClose(index);
            }}
          >
            <ContentCopyOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
            {getString("duplicate")}
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleEditClick(item);
            handleMenuClose(index);
          }}
        >
          <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
          {getString("edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteClick(item);
            handleMenuClose(index);
          }}
        >
          <DeleteOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
          {getString("delete")}
        </MenuItem>
      </Menu>
    </>
  );
};
export default ItemMenu;
