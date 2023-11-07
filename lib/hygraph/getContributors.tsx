// lib/getComment.js
import { client, gql } from "./createClient";


const query = gql`
  query getContributors {
    contributors(first: 100) {
      id
      name
      twitterHandle
      twitterProfileLink
      profilePic {
        id
        url
      }
    }
  }
`;

export default async function getContributors() {
  const data = await client.request(query);
  //@ts-ignore
  const { contributors } = data;
  return contributors;
}
