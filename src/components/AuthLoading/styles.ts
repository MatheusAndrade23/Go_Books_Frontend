import { styled, keyframes } from "@mui/material/styles";

const bounce = keyframes`
  0% {
    transform: scaleX(1.25);
  }
  100% {
    transform: translateY(-50px) scaleX(1);
  }
`;

export const Container = styled(
  "div",
  {}
)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(34, 40, 49, 0.8)",
}));

export const Loader = styled("div")`
  width: 120px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Ball = styled("div")(({ theme }) => ({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  animation: `${bounce} 0.5s alternate infinite`,
  backgroundColor: theme.palette.primary.contrastText,

  "&:nth-child(2)": {
    animationDelay: "0.16s",
  },

  "&:nth-child(3)": {
    animationDelay: "0.32s",
  },
}));

export const Loading = styled("span")(({ theme }) => ({
  fontSize: "22px",
  margin: "auto",
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));
