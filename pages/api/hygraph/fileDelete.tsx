import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_ASSET_TOKEN;

export default async function comments(req, res) {
  if (req.method === "POST") {
    const { fileId } = req.body;

    console.log(req.body)

    console.log("DELETE REQUEST", req.body);

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
    });

    const mutation = gql`
      mutation DeleteAsset($id: ID!) {
        deleteAsset(where: { id: $id }) {
          id
        }
      }
    `;

    try {
      const result = await graphQLClient.request(mutation, {
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
