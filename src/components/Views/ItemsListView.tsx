import {
  Container,
  List,
  Paper,
  ListItem,
  Box,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Styles from "../../DataTypes/StylesTypes";

interface Props {
  items: any[];
  editfunction: (item: object) => void;
  deleteFunction: (item: object) => void;
  styles: Styles;
}
const ItemsListView = ({
  items,
  editfunction,
  deleteFunction,
  styles,
}: Props): JSX.Element => {
  return (
    <Container sx={styles.container}>
      <List sx={styles.list}>
        {items.map((item) => (
          <Paper key={item.id} elevation={3} sx={styles.paperListView}>
            <ListItem key={item.id}>
              <Box sx={styles.listItemBox}>
                <ListItemText primary={item.name} />
              </Box>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    editfunction(item);
                  }}
                >
                  <EditOutlinedIcon sx={styles.iconButton} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    deleteFunction(item);
                  }}
                >
                  <DeleteOutlinedIcon sx={styles.iconButton} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default ItemsListView;
