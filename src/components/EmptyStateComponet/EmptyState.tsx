import { Container, Typography } from "@mui/material";
import emptyStateImage from "../../assets/emptystate.svg";
interface EmptyStateProps {
  emptyText: String;
}
const EmptyState = ({ emptyText }: EmptyStateProps) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={emptyStateImage} />
      <Typography>{emptyText}</Typography>
    </Container>
  );
};

export default EmptyState;
