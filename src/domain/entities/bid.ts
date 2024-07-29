export interface Bid {
  id: string;
  amount: number;
  status: "pending" | "rejected" | "accepted";
  auctionId: string;
}
