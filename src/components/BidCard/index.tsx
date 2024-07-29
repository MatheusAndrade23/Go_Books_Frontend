import { Bid } from "@/domain/entities/bid";

import { BidCardContainer } from "./styles";

import { api } from "@/services/api";
import { AxiosError } from "axios";

import { toast } from "react-toastify";

import { Text } from "../Text";

interface BidCardProps {
  bid: Bid;
}

import { useAuth } from "@/hooks/Auth";

import { Button } from "@mui/material";

export const BidCard = ({ bid }: BidCardProps) => {
  const { id, amount, status, auctionId } = bid;
  const { user } = useAuth();

  const handleAcceptBid = async () => {
    try {
      await api.patch(`/bids/${id}/accept`);
      toast.success("Lance aceito com sucesso!");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }

      toast.error("Erro ao aceitar o lance!");
    }
  };

  const handleRejectBid = async () => {
    try {
      await api.patch(`/bids/${id}/reject`);
      toast.success("Lance rejeitado com sucesso!");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }

      toast.error("Erro ao rejeitar o lance!");
    }
  };

  return (
    <BidCardContainer status={status}>
      <Text>R${amount}</Text>
      <Text>{getStatus(status)}</Text>
      <Button
        onClick={() => {
          window.location.href = `/auction/${auctionId}`;
        }}
      >
        {user.role == "buyer" ? "Ver livro" : "Ver leilão"}
      </Button>
      {user.role == "seller" && status == "pending" ? (
        <>
          <Button onClick={handleRejectBid}>Rejeitar Lance</Button>
          <Button onClick={handleAcceptBid}>Aceitar Lance</Button>
        </>
      ) : (
        <></>
      )}
    </BidCardContainer>
  );
};

const getStatus = (status: "pending" | "accepted" | "rejected") => {
  switch (status) {
    case "pending":
      return "Pendente";

    case "accepted":
      return "Aceito";

    case "rejected":
      return "Rejeitado";
  }
};
