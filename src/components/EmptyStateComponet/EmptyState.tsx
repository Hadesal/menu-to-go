import { Container, Typography } from "@mui/material";
import emptyStateImage from "../../assets/79436.png";
interface EmptyStateProps {
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}
const EmptyState = ({
  emptyStateTitle,
  emptyStateMessage,
}: EmptyStateProps) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <img width={200} height={200} style={{opacity:0.5}} src={emptyStateImage} />
      <Typography variant="h6" textAlign={"center"} sx={{ marginTop: 2 }}>
        {emptyStateTitle || "no items found"}
      </Typography>
      <Typography textAlign={"center"} sx={{ marginTop: 1 }}>
        {emptyStateMessage || "no items found"}
      </Typography>
    </Container>
  );
};

export default EmptyState;
