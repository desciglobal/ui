// lib/getComment.js
import { client, gql } from "./createClient";


const currentDate = new Date();
const isoString = currentDate.toISOString();

const query = gql`query GetFutureEvents {
  events(where: { eventDate_gte: "${isoString}" }, orderBy: eventDate_ASC) {
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
  eventEndDate
  eventTimezone
  }
}`;


export default async function getFutureEvents() {
    const data = await client.request(query)
    //@ts-ignore
    const {events} = data
    return events;

}

