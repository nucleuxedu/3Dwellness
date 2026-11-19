import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import createEmotionCache from "@/theme/createEmotionCache";
import { MyAppProps } from "./_app";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

/**
 * Plan line 1: service
 * Plan line 2: brand gold #d4af37 on #f7f4ef (design.md); type newsreader; hero split;
 * moments word-highlight + pinned-chapters; nav-mega; footer-visit; close-type; rhythm space;
 * buttons solid; mark initial. Gold fits a civic wellness endowment: ink from the brief, accent from design.md.
 */
export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html
      lang="en"
      data-type="service"
      data-radius="soft"
      data-buttons="solid"
      data-motion=""
    >
      <Head>
        <meta name="site-kind" content="other" />
        <meta name="page-type" content="service" />
        <meta name="theme-color" content="#d4af37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..700&family=Hanken+Grotesk:wght@400..600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root {
  --p-bg: #f7f4ef; --p-surface: #ebe6dc; --p-ink: #050505; --p-muted: #5c574e;
  --p-accent: #d4af37; --p-accent-ink: #050505; --p-action: #050505; --p-action-ink: #f7f4ef;
  --p-inv-bg: #050505; --p-inv-surface: #101010; --p-inv-ink: #f7f4ef; --p-inv-muted: #8f8d8a;
  --p-inv-accent: #d4af37; --p-inv-accent-ink: #050505; --p-inv-action: #d4af37; --p-inv-action-ink: #050505;
  --font-display: "Newsreader", Georgia, serif;
  --font-text: "Hanken Grotesk", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.018em;
  --display-tracking-xl: -0.025em;
  --ly-scale: 1.06;
}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);document.documentElement.classList.add('mo-js');setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);`,
          }}
        />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        {/* deal: hero=split; brand gold; moments=word-highlight,pinned-chapters; nav-mega; footer-visit; close-type; space; solid; initial */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
