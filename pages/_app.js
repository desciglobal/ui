import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Desci events around the globe</title>
        <meta
          name="description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="desci.global" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Desci events around the globe" />
        <meta
          property="og:description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        <meta
          property="og:image"
          content="https://www.desci.global/api/og-image"
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="desci.global" />
        <meta property="twitter:url" content="desci.global" />
        <meta name="twitter:title" content="Desci events around the globe" />
        <meta
          name="twitter:description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        <meta
          name="twitter:image"
          content="https://www.desci.global/api/og-image"
        />
      </Head>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6e4M2nVnkLKfm1tjJrvs4WYm9NAm8V9A&libraries=places"
        strategy="beforeInteractive"
      ></Script>
            <div>
        <Toaster />
      </div>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
