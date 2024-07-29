"use client";

import { AuctionPage } from "../../../pages/Auction";
import { redirect } from "next/navigation";

import { useAuth } from "@/hooks/Auth";

export default function Auction({
  params: { id },
}: {
  params: { id: string };
}) {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    redirect("/auth/signIn");
  }

  return <AuctionPage id={id} />;
}
