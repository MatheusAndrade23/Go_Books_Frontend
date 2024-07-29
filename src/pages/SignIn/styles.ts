import { styled } from "@mui/material/styles";

export const SignInContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const InputsContainer = styled("div", {
  name: "MuiInputsContainer",
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "280px",
  marginBottom: "1rem",
}));

export const SignInForm = styled("form", {
  name: "MuiSignInForm",
  slot: "root",
})(({ theme }) => ({
  border: "2px solid #00ADB5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "1.6rem",
  padding: "2.6rem",
  backgroundColor: theme.palette.secondary.dark,
}));
