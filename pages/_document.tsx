import { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from "next/document";
import { DocumentHeadTags, DocumentHeadTagsProps, documentGetInitialProps } from "@mui/material-nextjs/v14-pagesRouter";

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Developing a 3D Wellness Hub at St. Paul Downtown — America's first comprehensive Wellness City."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3D Wellness Endowment: Dream. Design. Dignity" />
        <meta
          property="og:description"
          content="Developing a 3D Wellness Hub at St. Paul Downtown — America's first comprehensive Wellness City."
        />
        <meta property="og:image" content="/images/image-1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  return documentGetInitialProps(ctx);
};
