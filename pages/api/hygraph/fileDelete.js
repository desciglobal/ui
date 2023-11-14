import { graphApiClient, gql } from "./createApiClient";


export default async function comments(req, res) {
  if (req.method === "POST") {
    const { fileId } = req.body;

    const mutation = gql`
      mutation DeleteAsset($id: ID!) {
        deleteAsset(where: { id: $id }) {
          id
        }
      }
    `;

    try {
      const result = await graphApiClient.request(mutation, {
        id: fileId,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting asset" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
