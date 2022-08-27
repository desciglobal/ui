import {getAllEvents} from '../dummy-data';
import EventList from '../components/events/event-list';
import EventsSearch from '../components/events/events-search';

function HomePage() {
    const allEvents = getAllEvents();

    return <div>
        <ul>
            <EventList items={allEvents}/>
        </ul>
    </div>
}

export default HomePage;