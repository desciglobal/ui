import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <>
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
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4IefstneiNw1cA3bTrhIXFti9IYfVP8A&libraries=places"></script>
      </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
