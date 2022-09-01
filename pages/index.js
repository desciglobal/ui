import {getAllEvents} from '../event-data';
import EventList from '../components/events/event-list';
import EventListHeading from '../components/events/event-list-heading';

import Hero from '../components/hero/hero';
import Head from "next/head";


function HomePage() {
  const {upcomingEventsAsc, pastEventsAsc} = getAllEvents();

  return (
    <>
      <Head>

        <title>Desci events around the globe</title>
        <meta name="description" content="A list of descentralized science events around the globe. Contribute and share Events" />
        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content="desci.global"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Desci events around the globe" />
        <meta property="og:description" content="A list of descentralized science events around the globe. Contribute and share Events" />
        <meta
          property="og:image"
          content="../public/images/og-image.png"
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="https://desciglobal.vercel.app/images/og-image.png" />
      </Head>

      <Hero/>
      <div>
        <EventListHeading
          EventCount={upcomingEventsAsc.length}
          text="Upcoming Events"
        />
        <ul>
          <EventList items={upcomingEventsAsc}/>
        </ul>
        <EventListHeading text="Past Events"/>
        <ul>
          <EventList items={pastEventsAsc}/>
        </ul>
      </div>
    </>
  );
}

export default HomePage;
