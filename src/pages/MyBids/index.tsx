import { BidsContainer, MyBidsContainer } from "./styles";

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

export const MyBidsPage = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/bids");
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
  }, []);

  return (
    <>
      <Header />
      <Container>
        <MyBidsContainer>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
            }}
          >
            Lances dados:
          </Typography>
          {!loading && (
            <BidsContainer>
              {bids?.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </BidsContainer>
          )}

          {loading && <Loading />}
        </MyBidsContainer>
      </Container>
      <Footer />
    </>
  );
};
