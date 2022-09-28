import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <meta name="viewport" content="width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@1,300&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
