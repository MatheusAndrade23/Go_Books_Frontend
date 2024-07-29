import { styled } from "@mui/material/styles";

interface BidCardContainerProps {
  status: "pending" | "accepted" | "rejected";
}

const getBorderColor = (status: "pending" | "accepted" | "rejected") => {
  switch (status) {
    case "pending":
      return "yellow";

    case "accepted":
      return "green";

    case "rejected":
      return "red";
  }
};

export const BidCardContainer = styled("div", {
  name: "BidCard",
  slot: "root",
})<BidCardContainerProps>(({ theme, status }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "0.5rem",
  width: "100%",
  marginBottom: "1rem",

  backgroundColor: theme.palette.secondary.dark,
  border: `1px solid ${getBorderColor(status)}`,

  borderBottomLeftRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",

  "& button": {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
}));
