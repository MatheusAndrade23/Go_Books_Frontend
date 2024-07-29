/* eslint-disable @next/next/no-img-element */
import { Auction } from "@/domain/entities/auction";
interface AuctionCardProps {
  auction: Auction;
}

import { redirect } from "next/navigation";

import {
  AuctionCardContainer,
  BookPoster,
  ImageContainer,
  InfoContainer,
} from "./styles";

import { Typography } from "@mui/material";

import { Button } from "@mui/material";

export const AuctionCard = ({ auction }: AuctionCardProps) => {
  const { bookImageUrl, bookName, bookGenre } = auction;

  return (
    <AuctionCardContainer>
      <BookPoster>
        <ImageContainer srcImgBackground={bookImageUrl} />
        <img src={bookImageUrl} alt={bookName} />
      </BookPoster>
      <InfoContainer>
        <h4>{bookName}</h4>
        <Typography
          style={{
            fontSize: "1.2rem",
            textTransform: "capitalize",
          }}
        >
          {bookGenre}
        </Typography>
        <Button
          onClick={() => {
            window.location.href = `/auction/${auction.id}`;
          }}
          variant="contained"
          color="secondary"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
          }}
        >
          Ver detalhes
        </Button>
      </InfoContainer>
    </AuctionCardContainer>
  );
};
