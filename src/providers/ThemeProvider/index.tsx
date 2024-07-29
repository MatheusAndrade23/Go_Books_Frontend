"use client";

import { createContext, ReactNode } from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

import theme from "../../styles/theme";
import { MdHeight } from "react-icons/md";

interface ThemeProviderContextType {
  theme: typeof theme;
}

export const ThemeProviderContext = createContext(
  {} as ThemeProviderContextType
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProviderContext.Provider value={{ theme }}>
        {children}
      </ThemeProviderContext.Provider>
      <GlobalStyles
        styles={(theme) => ({
          html: {
            padding: 0,
            margin: 0,
            fontSize: "62.5%", //use "rem" as px -> 1px = 0.1rem
            height: "100vh",
            boxSizing: "border-box",
            scrollBehavior: "smooth",
            fontFamily: theme.typography.fontFamily,
          },
          body: {
            padding: 0,
            margin: 0,
            height: "100vh",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            fontSize: "1.6rem",
            overFlowX: "hidden",
          },
          button: {
            cursor: "pointer",
          },
          a: {
            textDecoration: "none",
          },
          li: {
            listStyle: "none",
          },
          input: {
            outline: "none",
          },
        })}
      />
    </MuiThemeProvider>
  );
};
