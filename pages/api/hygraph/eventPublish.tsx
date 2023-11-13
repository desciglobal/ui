import { graphApiClient, gql } from "./createApiClient";


export default async function publishFile(req, res) {
  if (req.method === "POST") {
    const { eventId } = req.body;

    console.log(req.body);

    console.log("PUBLISH REQUEST", req.body);


    const mutation = gql`
      mutation PublishEvent($id: ID!) {
        publishEvent(where: { id: $id }) {
          id
        }
      }
    `;

    try {
      const result = await graphApiClient.request(mutation, {
        id: eventId,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error publishing asset" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
