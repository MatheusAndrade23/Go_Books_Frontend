"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
      contrastText: "#00ADB5",
    },
    secondary: {
      main: "#393E46",
      dark: "#222831",
    },
    background: {
      default: "#393E46",
    },
    text: {
      primary: "#00ADB5",
      secondary: "#393E46",
    },
    error: {
      main: "#FF5722",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
