import { Html, Head, Main, NextScript } from "next/document";
import GoogleAnalytics from "@components/GoogleAnalytics";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="insight-app-sec-validation"
          content="f8c06576-42cd-407d-b09a-b2761768f0ae"
        />
        <GoogleAnalytics />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
