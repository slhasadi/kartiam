"use client";
import { Inter } from "next/font/google";
import Script from "../../node_modules/next/script";
import "./globals.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/navigation";
import "swiper/css";
import "../../public/assets/css/fontawesome.css";
import StoreProvider from "../../redux/StoreProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <head>
        <title>پرشین استار</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          content="text/html; charset=utf-8"
          http-equiv="Content-Type"
        ></meta>
        <link rel="manifest" href="/manifest.json" />
        <Script
          src="/assets/js/jquery.min-v3.js"
          id="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          strategy="beforeInteractive"
        ></Script>
        {/* <Script
          src=""
          id="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          strategy="beforeInteractive"
        ></Script> */}
        <Script
          src="/assets/js/aos.js"
          id="aos-library"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.nice-select.min.js"
          id="fwererlllll"
        ></Script>
        <Script src="/assets/js/owl.carousel.min.js" id="rrrrttlglgl"></Script>
        <Script src="/assets/js/custom.js" id="gkrpllttt"></Script>
      </head>
      <StoreProvider>
        <body>
          {children}
          <ProgressBar
            height="5px"
            color="#f29f05"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </body>
      </StoreProvider>
    </html>
  );
}
