"use client";
import Image from "next/image";
import React, { useContext, useLayoutEffect, useEffect } from "react";
import Context from "./routing/context";
import { useRouter } from "next/navigation";
import Live_matches from "./components/live-matches";

export default function Home() {
  const { handleLogin, user, checkIfAuthenticated }: any = useContext(Context);
  const router = useRouter();
  useLayoutEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-red-500 dark:text-blue-500">messi</p>
      <Live_matches />
    </main>
  );
}
