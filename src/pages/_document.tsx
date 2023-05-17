import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Toncoin Tracker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Toncoin Tracker" />
        <meta name="description" content="Simple PWA that plots toncoin historical data" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon-32x32.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://toncoin-tracker.vercel.app/" />
        <meta name="twitter:title" content="Toncoin Tracker" />
        <meta name="twitter:description" content="Simple PWA that plots toncoin historical data" />
        <meta
          name="twitter:image"
          content="https://toncoin-tracker.vercel.app/icon-192x192.png"
        />
        <meta name="twitter:creator" content="@imamdev_" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Toncoin Tracker" />
        <meta property="og:description" content="Simple PWA that plots toncoin historical data" />
        <meta property="og:site_name" content="Toncoin Tracker" />
        <meta property="og:url" content="https://toncoin-tracker.vercel.app/" />
        <meta
          property="og:image"
          content="https://toncoin-tracker.vercel.app/icon-192x192.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
