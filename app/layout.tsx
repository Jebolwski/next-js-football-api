"use client";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Provider } from "./routing/context";
import { Toaster } from "sonner";
import { FootballProvider } from "./routing/football_context";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FootballProvider>
        <Provider>
          <body className="bg-gray-100 dark:bg-gray-800 root">
            <main>
              <Header />
              {children}
              <Toaster position="bottom-right" richColors />
              <Footer />
            </main>
          </body>
        </Provider>
      </FootballProvider>
    </html>
  );
}
