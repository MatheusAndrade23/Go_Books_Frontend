import { styled, createStyles } from "@mui/material/styles";

export const Text = styled("p", {
  name: "MuiStat", // The component name
  slot: "root", // The slot name
})(({ theme }) => ({
  color: theme.palette.text.primary,
}));
