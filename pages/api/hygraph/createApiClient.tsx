import { GraphQLClient, gql } from "graphql-request";


const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_ASSET_TOKEN;

export const graphApiClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
  });

export {gql}