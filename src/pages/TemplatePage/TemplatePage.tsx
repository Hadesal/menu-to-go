import { Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorsSection from "../../components/TemplateComponents/ColorsSection/ColorsSection";
import FontSectionComponent from "../../components/TemplateComponents/FontSection/FontSectionComponent";
import CategoryShapesComponent from "../../components/TemplateComponents/CategoryShapesSection/CategoryShapesComponent";
import ContactLinksComponent from "../../components/TemplateComponents/ContactLinksSection/ContactLinksComponent";
export default function TemplatePage() {
  const { t } = useTranslation();
  const getString = t;

  return (
    <>
      <Typography sx={{ color: "#797979" }} variant="h5">
        {"Customize your Menu"}
      </Typography>
      <Divider />
      <Container
        id="mainContainer"
        sx={{
          marginLeft: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          <ColorsSection />
          <FontSectionComponent />
          <CategoryShapesComponent />
          <ContactLinksComponent />
        </Container>

        <Container
          id="menuLiveViewContainerid"
          sx={{
            width: "auto",
            margin: 0,
            padding: 0,
            paddingLeft: {
              xs: 0,
              sm: 0,
              md: 0,
            },
            paddingRight: {
              xs: 0,
              sm: 0,
              md: 0,
            },
            border: "solid",
            borderRadius: "1rem",
            marginTop: "3rem",
          }}
        >
          <iframe
            src={"http://localhost:5173/dashboard"}
            width={"400px"}
            height={"100%"}
            title={"menu"}
            style={{ border: "none", borderRadius: "1rem" }}
          ></iframe>
        </Container>
      </Container>
    </>
  );
}
