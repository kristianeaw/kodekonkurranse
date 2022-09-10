import { AppProps } from "next/app";
import "@/styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <>
      <Head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', '${gaId}');`,
              }}
            />
          </>
        )}
        <title>Tromsø strikkefestival</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
