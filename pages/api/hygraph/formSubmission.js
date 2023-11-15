import { graphApiClient, gql } from "./createApiClient";


export default async function submitEvent(req, res) {
  if (req.method == "POST") {
    const { data } = req.body;

    const query = gql`
      mutation CreateEvent(
        $eventTitle: String!
        $eventDescription: String!
        $eventLink: String!
        $eventCountry: String!
        $eventCity: String!
        $fullAddress: String!
        $meetupType: MeetupTypeOptions!
        $eventDate: DateTime!
        $eventEndDate: DateTime!
        $eventTimezone: String
        $eventImageFileId: ID 
      ) {
        createEvent(
          data: {
            eventTitle: $eventTitle
            eventDescription: $eventDescription
            eventLink: $eventLink
            eventCountry: $eventCountry
            eventCity: $eventCity
            fullAddress: $fullAddress
            meetupType: $meetupType
            eventDate: $eventDate
            eventEndDate: $eventEndDate
            eventTimezone: $eventTimezone
            eventImageFile: {
              connect: {
                id: $eventImageFileId
              }
            }
          }
        ) {
          id
          eventTitle
          eventImageFile {
            id
            handle
          }
        }
      }
    `;

    let result;

    try {
      const result = await graphApiClient.request(query, {
        eventTitle: data.eventTitle,
        eventDescription: data.eventDescription,
        eventLink: data.eventLink,
        eventCountry: data.eventCountry,
        eventCity: data.eventCity,
        fullAddress: data.fullAddress,
        meetupType: data.meetupType,
        eventDate: data.eventDate,
        eventEndDate: data.eventEndDate,
        eventTimezone: data.eventTimezone,
        eventImageFileId: data.eventImageId,
      });
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
      return;
    }
  } else {
    return res.status(400).json({ message: "Method not allowed.." });
  }
}
