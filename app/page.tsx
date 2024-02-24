"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LiveMatches from "./components/live-matches";

export default function Home() {
  const router = useRouter();

  return (
    <main className="luke-th flex min-h-screen flex-col items-center justify-between dark:bg-gray-800 bg-white">
      <LiveMatches key={1} />
    </main>
  );
}
