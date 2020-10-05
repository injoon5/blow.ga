import * as React from 'react';

class Manifest extends React.Component {
  render() {
    return (
      <>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="blow.ga" />
        <meta name="apple-mobile-web-app-title" content="blow.ga" />
        <meta name="theme-color" content="#007eff" />
        <meta name="msapplication-navbutton-color" content="#007eff" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-starturl" content="/" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://i.ibb.co/PxBkf6t/blokode512.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="512x512"
          href="https://i.ibb.co/PxBkf6t/blokode512.png"
        ></link>
      </>
    );
  }
}

export default Manifest;
