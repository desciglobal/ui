import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_KEY,
});
var base = Airtable.base("app04sUAGh69msJ75");


export async function getAirtableEvents() {
    let recordsArray = [];

    await base('Events').select({
        view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
        recordsArray = [...recordsArray, ...records];
        fetchNextPage();
    })
        .catch(error => { console.error(error); return false; })
        const events = recordsArray.map(function(event){
        const rawEvent = event.fields;
        rawEvent.recordId = event.id
        return rawEvent;
    });
    return events;
}


