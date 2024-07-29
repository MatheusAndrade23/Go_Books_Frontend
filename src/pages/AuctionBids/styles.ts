import { styled } from "@mui/material/styles";

export const AuctionBidsContainer = styled("div", {
  name: "AuctionContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: "2rem",
  minHeight: "100vh",
}));

export const BidsContainer = styled("div", {
  name: "BidsContainer",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%",
  paddingTop: "2rem",
}));
