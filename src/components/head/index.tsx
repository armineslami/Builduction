import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      <title>Builduction</title>
      <meta name="application-name" content="Builduction" />
      <meta
        name="description"
        content="An application for building constructors to calculate each project cost and profit."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/images/favicon.ico" />

      {/* PWA manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Apple devices home screen icons */}
      <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/touch-icon-ipad-152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/touch-icon-iphone-retina-180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/images/touch-icon-ipad-retina-167.png"
      />
    </NextHead>
  );
};

export default Head;
