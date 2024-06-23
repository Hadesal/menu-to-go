import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Styles from "../../DataTypes/StylesTypes";
interface GridViewProps {
  items: any[];
  deleteFunction: (item: object) => void;
  editFunction: (item: object) => void;
  styles: Styles;
}
const GridView = ({
  items,
  deleteFunction,
  editFunction,
  styles,
}: GridViewProps): JSX.Element => {
  return (
    <Grid container spacing={3}>
      {items.map((item: object) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Paper elevation={3} sx={styles.gridPaper}>
            <Card sx={styles.card}>
              <CardContent sx={styles.cardContent}>
                <Stack direction="column" sx={styles.stackColumn}>
                  <Typography sx={styles.typography} variant="h6">
                    {item.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={styles.stackRow}>
                    <IconButton
                      onClick={() => {
                        deleteFunction(item);
                      }}
                      aria-label="edit"
                    >
                      <EditOutlinedIcon sx={styles.iconButton} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        editFunction(item);
                      }}
                      aria-label="delete"
                    >
                      <DeleteOutlinedIcon sx={styles.iconButton} />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridView;
