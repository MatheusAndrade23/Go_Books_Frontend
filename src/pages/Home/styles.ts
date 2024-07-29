import { styled } from "@mui/material/styles";

export const HomeContainer = styled("div", {
  name: "HomeContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: "2rem",
  minHeight: "100vh",
}));

export const AuctionsContainer = styled("div", {
  name: "AuctionsContainer",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%",
  paddingTop: "2rem",
}));
