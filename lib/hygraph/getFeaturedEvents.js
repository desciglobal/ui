// lib/getComment.js
import { client, gql } from "./createClient";

const query = gql`
  query GetFeaturedEvents {
    events(where: { isFeatured: true }, orderBy: eventDate_ASC, first: 4) {
      id
      eventTitle
      isFeatured
      eventDescription
      eventLink
      eventImageFile {
        id
        url
      }
      eventCountry
      eventCity
      fullAddress
      meetupType
      eventDate
      eventTimezone
    }
  }
`;

export default async function getFeaturedEvents() {
  const data = await client.request(query);
  //@ts-ignore
  const { events } = data;
  return events;
}
