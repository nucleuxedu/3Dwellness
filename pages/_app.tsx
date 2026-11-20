import { AppProps } from "next/app";
import Script from "next/script";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="kit" strategy="afterInteractive">
        {`import("/assets/system.js");import("/assets/motion/motion.js");import("/assets/layout/layout.js");`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
