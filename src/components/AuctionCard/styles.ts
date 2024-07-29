import { styled } from "@mui/material/styles";

export const AuctionCardContainer = styled("div", {
  name: "AuctionCard",
  slot: "root",
})(({ theme }) => ({
  height: "30rem",
  minWidth: "20rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  backgroundColor: theme.palette.secondary.dark,
  border: `1px solid ${theme.palette.secondary.main}`,

  margin: "2rem",
  marginBottom: "4rem",
  paddingBottom: "1rem",

  borderBottomLeftRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
}));

export const BookPoster = styled("div", {
  name: "AuctionCard",
  slot: "root",
})(({ theme }) => ({
  overflow: "hidden",
  minHeight: "20rem",
  width: "100%",

  position: "relative",

  display: "flex",
  justifyContent: "center",

  "& img": {
    height: "100%",
    objectFit: "contain",
    position: "absolute",
  },
}));

interface ImageContainerProps {
  srcImgBackground: string;
}

export const ImageContainer = styled(
  "div",
  {}
)<ImageContainerProps>(({ srcImgBackground, theme }) => ({
  height: "100%",
  width: "100%",
  position: "absolute",

  backgroundImage: `url(${srcImgBackground})`,

  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(2px)",
  backgroundRepeat: "no-repeat",
  "-webkit-filter": "blur(2px)",
}));

export const InfoContainer = styled("div", {
  name: "Info",
  slot: "root",
})(({ theme }) => ({
  width: "90%",
  height: "100%",
  display: "flex",
  flexDirection: "column",

  "& h4": {
    textOverflow: "ellipsis",
    color: theme.palette.primary.contrastText,
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: "0.5rem",
  },
}));
