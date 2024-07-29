import { styled, keyframes } from "@mui/material/styles";

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const Container = styled(
  "div",
  {}
)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "transparent",

  "&::before": {
    width: "2rem",
    height: "2rem",
    borderLeft: `0.5rem solid ${theme.palette.primary.contrastText}`,
    borderTop: `0.5rem solid ${theme.palette.primary.contrastText}`,
    animation: `${rotate} 600ms linear infinite`,
  },

  "&::after": {
    width: "6rem",
    height: "6rem",
    borderLeft: `0.5rem solid ${theme.palette.primary.contrastText}`,
    borderTop: `0.5rem solid ${theme.palette.primary.contrastText}`,
    animation: `${rotate} 1s linear reverse infinite`,
  },
}));
