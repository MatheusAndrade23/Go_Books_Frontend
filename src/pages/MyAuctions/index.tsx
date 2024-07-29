"use client";

import { Auction } from "@/domain/entities/auction";
import { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { api } from "@/services/api";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { AuctionCard } from "@/components/AuctionCard";
import { Typography } from "@mui/material";

import Container from "@mui/material/Container";

import { AuctionsContainer, MyAuctionsContainer } from "./styles";
import { Loading } from "@/components/Loading";
import { Footer } from "@/components/Footer";

export const MyAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/auctions/seller");
        setAuctions(response.data.auctions);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setLoading(false);
          return toast.error(error.response?.data.message);
        }
        setLoading(false);
        toast.error("Erro ao fazer login!");
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <MyAuctionsContainer>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
            }}
          >
            {auctions?.length == 0
              ? "Nenhum leilão encontrado"
              : "Meus leilões"}
          </Typography>
          {!loading && (
            <AuctionsContainer>
              {auctions?.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </AuctionsContainer>
          )}

          {loading && <Loading />}
        </MyAuctionsContainer>
      </Container>
      <Footer />
    </>
  );
};
