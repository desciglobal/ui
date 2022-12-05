import { getAirtableEvents } from "../services/airtable";

export async function getAllEvents() {
  const ALL_EVENTS = await getAirtableEvents();
  const DESCI_EVENTS = ALL_EVENTS.filter((event) => event.is_approved);

  let featuredEventsRaw = ALL_EVENTS.filter(
    (event) => event.is_featured && !isInThePast(new Date(event.event_date))
  );

  let upcomingEvents = DESCI_EVENTS.filter(
    (event) => !isInThePast(new Date(event.event_date))
  );

  let pastEvents = DESCI_EVENTS.filter((event) =>
    isInThePast(new Date(event.event_date))
  );

  // sorting featured Events ascending
  let featuredConvertedUpcoming = featuredEventsRaw.map((obj) => {
    return { ...obj, event_date: new Date(obj.event_date) };
  });
  let featuredEvents = featuredConvertedUpcoming.sort(
    (objA, objB) => Number(objA.event_date) - Number(objB.event_date)
  );

  // sorting upcoming Events ascending
  let dateConvertedUpcoming = upcomingEvents.map((obj) => {
    return { ...obj, event_date: new Date(obj.event_date) };
  });
  let upcomingEventsAsc = dateConvertedUpcoming.sort(
    (objA, objB) => Number(objA.event_date) - Number(objB.event_date)
  );

  // sorting past Events descending
  let dateConvertedPast = pastEvents.map((obj) => {
    return { ...obj, event_date: new Date(obj.event_date) };
  });
  let pastEventsDesc = dateConvertedPast.sort(
    (objA, objB) => Number(objB.event_date) - Number(objA.event_date)
  );

  return { upcomingEventsAsc, pastEventsDesc, featuredEvents };
}

function isInThePast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
