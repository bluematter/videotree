import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../src/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'DM Sans';
                src: url('./fonts/DM_Sans/DMSans-Regular.ttf');
                font-weight: normal;
                font-style: normal;
              }
              @font-face {
                font-family: 'DM Sans';
                src: url('./fonts/DM_Sans/DMSans-Medium.ttf');
                font-weight: 500;
                font-style: normal;
              }
              @font-face {
                font-family: 'DM Sans';
                src: url('./fonts/DM_Sans/DMSans-Bold.ttf');
                font-weight: 600;
                font-style: normal;
              }
              @font-face {
                font-family: 'DM Sans';
                src: url('./fonts/DM_Sans/DMSans-Bold.ttf');
                font-weight: 700;
                font-style: normal;
              }
              @font-face {
                font-family: 'DM Sans';
                src: url('./fonts/DM_Sans/DMSans-Bold.ttf');
                font-weight: 800;
                font-style: normal;
              }
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default App;
