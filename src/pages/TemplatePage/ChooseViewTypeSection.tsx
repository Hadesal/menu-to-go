import {
  Card,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import gridViewImage from "../../assets/gridViewImage.png";
import listViewImage from "../../assets/listViewImage.png";
import { useTranslation } from "react-i18next";

export default function ChooseViewTypeSection() {
  const [selectedView, setSelectedView] = useState<string>("");
  const { t } = useTranslation();
  const getString = t;
  return (
    <Container
      sx={{
        marginTop: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Container sx={{ width: "auto" }}>
        <Paper
          id="gridViewCardPaper"
          elevation={3}
          style={{ borderRadius: "1rem", padding: "1rem" }}
          sx={{ borderRadius: "1rem" }}
        >
          <Card id="gridViewCardId" sx={{ borderRadius: "1rem" }}>
            <img
              style={{ width: "25vw", height: "25vw", borderRadius: "1rem" }}
              src={gridViewImage}
            />
          </Card>
        </Paper>
      </Container>

      <Container sx={{ width: "auto" }}>
        <Paper
          id="listViewCardPaperId"
          elevation={3}
          sx={{ borderRadius: "1rem", padding: "1rem" }}
        >
          <Card id="listViewCardId" sx={{ borderRadius: "1rem" }}>
            <img
              style={{ width: "25vw", height: "25vw" }}
              src={listViewImage}
            />
          </Card>
        </Paper>
        <RadioGroup>
          <FormControlLabel
            value={"gridView"}
            control={<Radio />}
            label={getString("gridView")}
          />
          <FormControlLabel
            value={"ListView"}
            control={<Radio />}
            label={getString("gridView")}
          />
        </RadioGroup>
      </Container>
    </Container>
  );
}
