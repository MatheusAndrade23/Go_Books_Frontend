"use client";

import { HomePage } from "../../pages/Home";
import { MyAuctions } from "../../pages/MyAuctions";

import { redirect } from "next/navigation";

import { useAuth } from "@/hooks/Auth";

export default function Home() {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    redirect("/auth/signin");
  }

  if (user.isAuthenticated && user.role === "buyer") {
    return <HomePage />;
  }

  return <MyAuctions />;
}
