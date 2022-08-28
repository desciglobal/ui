import {getAllEvents} from '../dummy-data';
import EventList from '../components/events/event-list';
import EventsSearch from '../components/events/events-search';
import Hero from '../components/hero/hero';
import Head from "next/head";

function HomePage() {
    const allEvents = getAllEvents();

    return <><Head>
        <title>Desci events around the globe</title>
        <meta name="description" content="A list of descentralized science events around the globe. Contribute and share Events"></meta>
    </Head>
    <Hero/>
    <div>
        <ul>
            <EventList items={allEvents}/>
        </ul>
    </div>
    </>
}

export default HomePage;