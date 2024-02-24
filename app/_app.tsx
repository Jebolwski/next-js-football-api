import "../styles/globals.css";
import { useContext, useLayoutEffect } from "react";
import type { AppProps } from "next/app";
import Context from "./routing/context";
import { Provider } from "./routing/context";
import { FootballProvider } from "./routing/football_context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Provider adds persistent Global state to the app */}
      <FootballProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </FootballProvider>
    </>
  );
}

export default MyApp;
