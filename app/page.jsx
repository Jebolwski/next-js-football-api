"use client";
import React, { useLayoutEffect, useContext } from "react";
import LiveMatches from "./components/live-matches";
import { Metadata } from "next";
import Context from "./routing/context";
import { useRouter } from "next/navigation";

export default function Home() {
  //const { handleLogin, user, loginWithGoogle } = useContext(Context);
  //const router = useRouter();
  // useLayoutEffect(() => {
  //   if (user == null) {
  //     router.push("/login");
  //   }
  // }, [user]);
  return (
    <main className="luke-th flex min-h-screen flex-col items-center justify-between dark:bg-gray-800 bg-gray-50 ">
      <LiveMatches key={1} />
    </main>
  );
}
