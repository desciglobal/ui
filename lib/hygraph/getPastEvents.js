// lib/getComment.js
import { client, gql } from "./createClient";


const currentDate = new Date();
const isoString = currentDate.toISOString();

const query = gql`query GetPastEvents {
  events(
    where: { eventEndDate_lte: "${isoString}" }, 
    orderBy: eventDate_DESC,
    first: 100
  ) {
    id
    eventTitle
    isFeatured
    eventDescription
    eventLink
    eventImageFile {
      id
    }
    eventCountry
    eventCity
    fullAddress
    meetupType
    eventDate
    eventTimezone
  }
}`;


export default async function getPastEvents() {
  const data = await client.request(query);
  //@ts-ignore
  const { events } = data;
  return events;
}
