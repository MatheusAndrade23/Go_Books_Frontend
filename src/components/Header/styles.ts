import { styled } from "@mui/material/styles";

export const HeaderContainer = styled("header", {
  name: "MuiHeader",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "calc(100% - 4rem)",
  justifyContent: "space-between",
  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  paddingBottom: "1rem",
  padding: "2rem",
}));

export const LinksContainer = styled("nav", {
  name: "MuiHeader",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "calc(100% - 4rem)",

  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  paddingBottom: "2rem",
  padding: "2rem",
}));
