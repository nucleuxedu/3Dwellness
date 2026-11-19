import { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import createEmotionCache from "@/theme/createEmotionCache";
import "@/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>3D Wellness Endowment — Dream. Design. Dignity.</title>
        <meta
          name="description"
          content="Developing the 3D Wellness Hub — America’s first comprehensive Wellness City, where health, healing, and human flourishing are embedded into urban life."
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
