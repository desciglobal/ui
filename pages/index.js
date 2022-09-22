import { getAllEvents } from "../event-data";
import EventList from "../components/events/event-list";
import EventListHeading from "../components/events/event-list-heading";

import Hero from "../components/hero/hero";
import Head from "next/head";

function HomePage(props) {
  const { upcomingEventsAsc, pastEventsDesc } = props;
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
          content="https://desciglobal.vercel.app/images/og-image.png"
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
          content="https://desciglobal.vercel.app/images/og-image.png"
        />
      </Head>

      <Hero headingText="Upcoming Desci Events" />
      <div>
        <EventListHeading
          EventCount={upcomingEventsAsc.length}
          text="Upcoming Events"
        />
        <ul>
          <EventList items={upcomingEventsAsc} />
        </ul>
        <EventListHeading text="Past Events" />
        <ul>
          <EventList items={pastEventsDesc} />
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { upcomingEventsAsc, pastEventsDesc } = await getAllEvents();

  upcomingEventsAsc.forEach((event) => {
    event.date = event.date.toISOString().substring(0, 10);
  });

  pastEventsDesc.forEach((event) => {
    event.date = event.date.toISOString().substring(0, 10);
  });

  if (!pastEventsDesc) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      upcomingEventsAsc,
      pastEventsDesc,
    },
    revalidate: 10,
  };
}
export default HomePage;
