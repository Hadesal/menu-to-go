import { Box } from "@mui/material";
import ExtrasItem from "./ExtrasItem";
import { ExtrasData as ExtrasData } from "@dataTypes/ProductDetailsDataTypes";

interface ExtrasListProps {
  extras: ExtrasData[];
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
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
