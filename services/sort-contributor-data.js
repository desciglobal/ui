import { getAirtableContributors } from "./airtable";

export async function getContributors() {
  const ALL_CONTRIBUTORS = await getAirtableContributors();
  const ARPPROVED_CONTRIBUTORS = ALL_CONTRIBUTORS.filter((contributor) => contributor.is_approved);


  // sorting contributors  ascending by id
  let sortedContributors = ARPPROVED_CONTRIBUTORS.sort(
    (objA, objB) => Number(objA.id) - Number(objB.id)
  );


  return sortedContributors;
}

