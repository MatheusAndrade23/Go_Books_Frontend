"use client";

import { AuctionBidsPage } from "../../../../pages/AuctionBids";

export default function AuctionBids({
  params: { id },
}: {
  params: { id: string };
}) {
  return <AuctionBidsPage auctionId={id} />;
}
