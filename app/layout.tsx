"use client";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Provider } from "./routing/context";
import { Toaster } from "sonner";
import { FootballProvider } from "./routing/football_context";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>layout</title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>
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
