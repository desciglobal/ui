// lib/getComment.js
import { client, gql } from "./createClient";


const query = gql`
query getLocalGroups () {
  localGroups (first: 50) {
    id
    name
    link
    location {
      latitude 
      longitude
    }
  }
}
`;

export default async function getLocalGroups() {
  const data = await client.request(query);
  //@ts-ignore
  const { localGroups } = data;
  return localGroups;
}
