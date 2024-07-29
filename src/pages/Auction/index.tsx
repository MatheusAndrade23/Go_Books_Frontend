/* eslint-disable @next/next/no-img-element */
interface AuctionPageProps {
  id: string;
}

import { Auction } from "@/domain/entities/auction";
import { api } from "@/services/api";

import { useAuth } from "@/hooks/Auth";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { useState, useEffect } from "react";

import { AuctionContainer, InfoContainer, ImageContainer } from "./styles";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Text } from "@/components/Text";
import { Loading } from "@/components/Loading";

import { Container, Button, TextField } from "@mui/material";

const bidFormSchema = zod.object({
  value: zod.number(),
});

export type bidFormData = zod.infer<typeof bidFormSchema>;

export const AuctionPage = ({ id }: AuctionPageProps) => {
  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState<Auction>({} as Auction);

  const { bookImageUrl, bookName, description, bookGenre, slug } = auction;

  const signInForm = useForm<bidFormData>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      value: 0,
    },
  });

  const { register, watch } = useForm();

  const value = watch("value");

  const formRegex = {
    isNumber: /(\b[0-9]+\b)/g.test(value),
  };

  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/auction/${id}`);
        setAuction(response.data.auction);
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
  }, [id]);

  const handleBidAuction = async () => {
    setLoading(true);
    try {
      await api.post(`/auctions/${id}/bids`, {
        amount: parseInt(value),
        status: "pending",
      });
      toast.success("Lance realizado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Erro ao dar um lance!");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeBids = () => {
    window.location.href = `/bids/auction/${id}`;
  };

  return (
    <>
      <Header />
      <Container>
        {loading && <Loading />}
        {!loading && (
          <AuctionContainer>
            <ImageContainer>
              <img src={bookImageUrl} alt={bookName} />
            </ImageContainer>

            <InfoContainer>
              <h2>Leilão do livro: {bookName}</h2>
              <Text
                style={{
                  marginTop: "4rem",
                  fontSize: "1.6rem",
                }}
              >
                Descrição: {description}
              </Text>

              <Text
                style={{
                  fontSize: "1.6rem",
                }}
              >
                Gênero:{" "}
                {bookGenre?.charAt(0).toUpperCase() + bookGenre?.slice(1)}
              </Text>
              {user.role === "buyer" && (
                <>
                  <Text
                    style={{
                      fontSize: "1.4rem",
                      marginTop: "4rem",
                    }}
                  >
                    Oferecer um valor:
                  </Text>
                  <TextField
                    size="medium"
                    placeholder="0.00"
                    variant="filled"
                    focused
                    {...register("value")}
                    color={formRegex.isNumber ? "success" : "warning"}
                  >
                    Valor
                  </TextField>
                  <span
                    style={{
                      cursor: !formRegex.isNumber ? "not-allowed" : "pointer",
                      width: "100%",
                    }}
                  >
                    <Button
                      style={{
                        marginLeft: "2rem",
                        paddingTop: "1.6rem",
                        paddingBottom: "1.6rem",
                        paddingLeft: "2.8rem",
                        paddingRight: "2.8rem",
                      }}
                      onClick={handleBidAuction}
                      disabled={!formRegex.isNumber}
                    >
                      Dar um lance
                    </Button>
                  </span>
                </>
              )}
              {user.role === "seller" && (
                <Button
                  style={{
                    paddingTop: "1.6rem",
                    paddingBottom: "1.6rem",
                    paddingLeft: "2.8rem",
                    paddingRight: "2.8rem",
                  }}
                  onClick={handleSeeBids}
                >
                  Ver Lances
                </Button>
              )}
            </InfoContainer>
          </AuctionContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};
