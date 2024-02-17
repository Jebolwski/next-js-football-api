"use client";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Provider } from "./routing/context";
import { Toaster } from "sonner";
import { FootballProvider } from "./routing/football_context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <FootballProvider>
          <Provider>
            <Header />
            <main>{children}</main>
            <Toaster position="bottom-right" richColors />
            <Footer />
          </Provider>
        </FootballProvider>
      </body>
    </html>
  );
}
