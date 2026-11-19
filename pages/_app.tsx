import { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import createEmotionCache from "@/theme/createEmotionCache";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TasteBoot from "@/components/TasteBoot";
import { assets, site } from "@/lib/siteContent";
import "@/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } =
    props;
  const isHome = router.pathname === "/";

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{site.fullName}</title>
        <meta
          name="description"
          content="A non-profit wellness hub planned for downtown St. Paul — four spaces for care, immersion, training and community."
        />
        <meta
          property="og:title"
          content="3D Wellness Endowment — wellness hub for downtown St. Paul"
        />
        <meta
          property="og:description"
          content="Four planned spaces for care, immersion, training and community in America's first comprehensive Wellness City."
        />
        <meta property="og:image" content={assets.hero} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href={assets.favicon} type="image/svg+xml" />
      </Head>
      <Header />
      <main id="top">
        {isHome ? (
          <Component {...pageProps} />
        ) : (
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        )}
      </main>
      <Footer />
      <nav className="actionbar" aria-label="Quick actions">
        <a className="btn btn--primary" href="/#message">
          Send a message
        </a>
      </nav>
      <TasteBoot />
    </>
  );
}
