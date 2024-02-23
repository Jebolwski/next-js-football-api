"use client";
import Image from "next/image";
import React, { useContext, useLayoutEffect, useEffect } from "react";
import Context from "./routing/context";
import { useRouter } from "next/navigation";
import LiveMatches from "./components/live-matches";

export default function Home() {
  const { user, darkMode }: any = useContext(Context);
  const router = useRouter();
  useLayoutEffect(() => {
    if (user == null) {
      router.push("/login");
    }
    if (darkMode == 0) {
      (
        document.querySelector(".luke-th")?.parentNode
          ?.parentNode as HTMLElement
      ).classList.remove("dark");
    } else {
      (
        document.querySelector(".luke-th")?.parentNode
          ?.parentNode as HTMLElement
      ).classList.add("dark");
    }
  }, [darkMode]);

  return (
    <main className="luke-th flex min-h-screen flex-col items-center justify-between">
      <LiveMatches key={1} />
    </main>
  );
}
