// lib/getComment.js
import { GraphQLClient, gql } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT);

export  {gql};