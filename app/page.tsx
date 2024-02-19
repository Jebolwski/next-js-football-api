"use client";
import Image from "next/image";
import React, { useContext, useLayoutEffect, useEffect } from "react";
import Context from "./routing/context";
import { useRouter } from "next/navigation";
import LiveMatches from "./components/live-matches";

export default function Home() {
  const { handleLogin, user, checkIfAuthenticated }: any = useContext(Context);
  const router = useRouter();
  useLayoutEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LiveMatches key={1} />
    </main>
  );
}
