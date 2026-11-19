import { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";
import createEmotionCache from "@/theme/createEmotionCache";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>3D Wellness Endowment: Dream. Design. Dignity</title>
        <meta
          name="description"
          content="Developing a 3D Wellness Hub at St. Paul Downtown — America's first comprehensive Wellness City."
        />
        <link rel="icon" href="/assets/images/image-32.svg" type="image/svg+xml" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
