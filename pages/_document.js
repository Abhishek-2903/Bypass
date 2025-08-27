// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* put any other global <link> or <meta> tags you need here */}
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
