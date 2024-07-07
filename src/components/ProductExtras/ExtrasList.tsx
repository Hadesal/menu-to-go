import { Box } from "@mui/material";
import ExtrasItem from "./ExtrasItem";

interface Extras {
  extrasName: string;
  extrasPrice: string;
}

interface ExtrasListProps {
  extras: Extras[];
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
};

export default function ExtrasList({ extras }: ExtrasListProps) {
  return (
    <Box sx={styles.container}>
      {extras.map((extra, index) => (
        <ExtrasItem key={index} extras={extra} />
      ))}
    </Box>
  );
}
