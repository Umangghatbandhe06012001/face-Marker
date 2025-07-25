import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-[#0000] w-[100%] h-[100%]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
