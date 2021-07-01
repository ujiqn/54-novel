import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class Layout extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>54字の物語ジェネレーター #54字の文学賞</title>
          <script
            dangerouslySetInnerHTML={{__html: `
              if (location.hostname !== '54.ujiqn.com') {
                location.replace('https://54.ujiqn.com');
              }
            `}}
          />
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" />
          <meta name="description" content="54字ぴったりの物語をつくりましょう。" />
          <meta name="keywords" content="54字の物語,#54字の文学賞,氏田雄介" />
          <meta name="author" content="氏田雄介" />
          <meta name="generator" content="microCMS" />
          <meta property="og:title" content="54字の物語ジェネレーター #54字の物語" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://54.ujiqn.com" />
          <meta property="og:image" content="https://54.ujiqn.com/ogp.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="54字の物語ジェネレーター #54字の物語" />
          <meta property="og:description" content="54字ぴったりの物語をつくりましょう。" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="54字の物語ジェネレーター #54字の物語" />
          <meta name="twitter:description" content="54字ぴったりの物語をつくりましょう。" />
          <meta name="twitter:image:src" content="https://54.ujiqn.com/ogp.png" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="canonical" href="https://54.ujiqn.com" />
          <link rel="shortcut icon" href="https://54.ujiqn.com/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" rel="stylesheet" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-VS860CVJFF"></script>
          <script
            dangerouslySetInnerHTML={{__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-VS860CVJFF');
            `}}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}