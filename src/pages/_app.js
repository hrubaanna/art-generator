import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default App;
