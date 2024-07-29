import { BidsContainer, AuctionBidsContainer } from "./styles";

import { Container, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { Bid } from "@/domain/entities/bid";

import { toast } from "react-toastify";

import { api } from "@/services/api";
import { AxiosError } from "axios";

import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Footer } from "@/components/Footer";
import { BidCard } from "@/components/BidCard";

interface AuctionBidsPageProps {
  auctionId: string;
}

export const AuctionBidsPage = ({ auctionId }: AuctionBidsPageProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/bids/auction/${auctionId}`);
        setBids(response.data.bids);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setLoading(false);
          return toast.error(error.response?.data.message);
        }
        setLoading(false);
        toast.error("Erro buscar os lances!!");
      }
    };
    getData();
  }, [auctionId]);

  return (
    <>
      <Header />
      <Container>
        <AuctionBidsContainer>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
            }}
          >
            {bids.length > 0 && "Lances dados:"}
            {bids.length == 0 && "Nenhum lance dado!"}
          </Typography>
          {!loading && (
            <BidsContainer>
              {bids?.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </BidsContainer>
          )}

          {loading && <Loading />}
        </AuctionBidsContainer>
      </Container>
      <Footer />
    </>
  );
};
