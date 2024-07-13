import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the more menu icon
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useState } from "react";

interface GridViewProps {
  items: any[];
  deleteFunction: (item: object) => void;
  editFunction: (item: object) => void;
  styles: any; // Updated to any to avoid import issues
  CardIcon: string;
}

const ItemsGridView = ({
  CardIcon,
  items,
  deleteFunction,
  editFunction,
  styles,
}: GridViewProps): JSX.Element => {
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  return (
    <Grid container spacing={4}>
      {items.map((item: any, index: number) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper elevation={3} sx={styles.gridPaper}>
            <Card sx={styles.card}>
              <CardContent sx={{ ...styles.cardContent, position: "relative" }}>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: 0.8,
                    background: "#A4755D30",
                    "&:hover": {
                      background: "#A4755D30", // Ensure the background remains the same on hover
                    },
                  }}
                  aria-label="more"
                  onClick={(event) => handleMenuClick(event, index)} // Prevent card click when clicking the menu
                >
                  <MoreVertIcon fontSize="small" color="primary" />
                </IconButton>
                <Menu
                  id={`resturantOptions-${index}`}
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    "aria-labelledby": `resturantOptions-${index}`,
                  }}
                  disableScrollLock={true}
                  elevation={1}
                >
                  <MenuItem
                    onClick={() => {
                      console.log(item);
                      //editFunction(item);
                    }}
                  >
                    <EditIcon
                      aria-label="edit"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      console.log(item);
                      //deleteFunction(item);
                    }}
                  >
                    <DeleteOutlinedIcon
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    <FileCopyIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Duplicate
                  </MenuItem>
                </Menu>
                <Stack direction="column" sx={styles.stackColumn}>
                  <img
                    style={{
                      display: "block",
                      margin: "0 auto",
                      opacity: 0.5,
                      mixBlendMode: "multiply",
                    }}
                    width={140}
                    height={140}
                    src={CardIcon}
                  />
                  <Typography
                    sx={{
                      marginTop: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "90%",
                    }}
                    noWrap
                    variant="h6"
                    title={item.name} // Set the title attribute to show full text on hover
                  >
                    {item.name}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsGridView;
