import { styled } from "@mui/material/styles";

export const CreateAuctionContainer = styled("div", {
  name: "CreateAuctionContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  padding: "2rem",
  minHeight: "100vh",
}));

export const Form = styled("form", {
  name: "ImageContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,

  display: "flex",
  flexDirection: "column",

  "& button": {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },

    "&:disabled": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.dark,
    },
  },
}));

export const ImageContainer = styled("div", {
  name: "ImageContainer",
  slot: "root",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,

  "& img": {
    width: "100%",
    objectFit: "contain",
  },
}));
