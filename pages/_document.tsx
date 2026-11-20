import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en" data-type="service" data-radius="soft" data-buttons="tonal" data-motion="">
      <Head>
        <meta name="site-kind" content="other" />
        <meta name="page-type" content="service" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="A planned wellness center in downtown St. Paul, with four rooms for care, training and meals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3D Wellness Endowment: a wellness center for St. Paul" />
        <meta
          property="og:description"
          content="A planned wellness center in downtown St. Paul, with four rooms for care, training and meals."
        />
        <meta property="og:image" content="/share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root {
  --p-bg: #ffffff; --p-surface: #f7f6f1; --p-ink: #1c244b; --p-muted: #324a6d;
  --p-accent: #b5c94d; --p-accent-ink: #111111; --p-action: #1c244b; --p-action-ink: #ffffff;
  --p-inv-bg: #1c244b; --p-inv-surface: #293257; --p-inv-ink: #ffffff; --p-inv-muted: #a0a5b8;
  --p-inv-accent: #b5c94d; --p-inv-accent-ink: #111111; --p-inv-action: #b5c94d; --p-inv-action-ink: #111111;
  --font-display: "Schibsted Grotesk", system-ui, sans-serif;
  --font-text: "Schibsted Grotesk", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.035em;
  --display-tracking-xl: -0.042em;
  --ly-scale: 0.98;
}`,
          }}
        />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/word-highlight/moment.js" />
        <link rel="modulepreload" href="/assets/moments/picture-develops/moment.js" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);document.documentElement.classList.add('mo-js');setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);",
          }}
        />
      </Head>
      <body>
        {/* service. deal: brand from theme.css (navy, white, lime) because three-stones clashes with those measured colours; type schibsted; hero photo; nav-centre; footer-dark; close-type (no photograph left for close-photo); rhythm space; buttons tonal; client's hexagon mark; moments picture-develops and word-highlight (photo-chapters dropped: commons.jpg is 867px wide and the live stage draws it at 1357). */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
