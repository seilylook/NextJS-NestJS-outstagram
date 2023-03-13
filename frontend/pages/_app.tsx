import wrapper from "@/store/configureStore";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>outstagram</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
