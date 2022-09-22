import Airtable, { apiKey } from 'airtable';

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



export async function AirtablePostEvent(data) {
    const {title, date, link, image} = data;

    if (!title || !date || !link || !image) {
        console.lgo("missing argument for airtable postEvent")
        return;
    }

    await base('Events').create({
        "fld9XVQSHciA2sYEr": title,
        "fld3sdoUOlAHYcHxN": false,
        "fldpgviLauKF7iVlB": "DUMMY",
        "fldFj7sR6T6qtOzuu": date,
        "fldD5McbngcHUv4iG": link,
        "fldernUoUjIjsbDjX": image
      }, function(err, record) {
        if (err) {
          console.error(err);
          return err;
        }
        //console.log(record.getId());
      });
}
