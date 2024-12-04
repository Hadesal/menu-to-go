// AccordionWrapper.tsx
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";

interface AccordionWrapperProps extends AccordionProps {
  hasItems: boolean;
  summaryContent: React.ReactNode;
  summaryProps?: AccordionSummaryProps;
  detailsContent: React.ReactNode;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  summarySx?: object;
  detailsSx?: object;
}

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion
    slotProps={{ transition: { unmountOnExit: true } }}
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&::before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  borderRadius: "15px 15px 0px 0px",
  padding: "0.5rem 1.5rem",
  backgroundColor: "#E0E4E5",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AccordionWrapper = ({
  hasItems,
  summaryContent,
  summaryProps,
  detailsContent,
  expanded,
  onChange,
  summarySx,
  detailsSx,
  ...rest
}: AccordionWrapperProps) => {
  return (
    <StyledAccordion expanded={expanded} onChange={onChange} {...rest}>
      <StyledAccordionSummary
        expandIcon={
          <ArrowForwardIosSharpIcon
            sx={{
              fontSize: "1.2rem",
              color: "var(--primary-color)",
              display: hasItems ? "inherit" : "none",
            }}
          />
        }
        {...summaryProps}
        sx={summarySx}
      >
        {summaryContent}
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={detailsSx}>
        {detailsContent}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default AccordionWrapper;
