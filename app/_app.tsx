import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "./routing/context";
import { FootballProvider } from "./routing/football_context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FootballProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </FootballProvider>
    </>
  );
}

export default MyApp;
