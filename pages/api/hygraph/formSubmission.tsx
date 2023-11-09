// pages/api/comments.js

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

// export a default function for API route to work
export default async function comments(req, res) {
  if (req.method == "POST") {
    const { data } = req.body;

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
    });
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
        $eventTimezone: String
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
            eventTimezone: $eventTimezone
          }
        ) {
          id
          eventTitle
        }
      }
    `;

    let result;

    try {
      const result = await graphQLClient.request(query, {
        eventTitle: data.eventTitle,
        eventDescription: data.eventDescription,
        eventLink: data.eventLink,
        eventCountry: data.eventCountry,
        eventCity: data.eventCity,
        fullAddress: data.fullAddress,
        meetupType: data.meetupType,
        eventDate: data.eventDate,
        eventTimezone: data.eventTimezone,
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
