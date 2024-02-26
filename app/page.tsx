import React from "react";
import LiveMatches from "./components/live-matches";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Live Results and Upcoming Matches",
};
export default function Home() {
  return (
    <main className="luke-th flex min-h-screen flex-col items-center justify-between dark:bg-gray-800 bg-gray-50 ">
      <LiveMatches key={1} />
    </main>
  );
}
