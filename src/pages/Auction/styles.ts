import { styled } from "@mui/material/styles";

export const AuctionContainer = styled("div", {
  name: "AuctionContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: "2rem",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
}));

export const InfoContainer = styled("div", {
  name: "InfoContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: "2rem",

  "& p": {
    color: theme.palette.primary.main,
  },

  "& button": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,

    "&:disabled": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

export const ImageContainer = styled("div", {
  name: "ImageContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: "2rem",

  "& img": {
    width: "500px",
    objectFit: "contain",
  },
}));
