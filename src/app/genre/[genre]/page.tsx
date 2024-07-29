"use client";

import { GenrePage } from "../../../pages/Genre";
import { redirect } from "next/navigation";

import { useAuth } from "@/hooks/Auth";

export default function Genre({
  params: { genre },
}: {
  params: { genre: string };
}) {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    redirect("/auth/signin");
  }

  if (user.isAuthenticated && user.role === "buyer") {
    return <GenrePage genre={genre} />;
  }

  return <></>;
}
