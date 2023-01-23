import Airtable, { apiKey } from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_KEY,
});

var base = Airtable.base("app04sUAGh69msJ75");

export async function getAirtableEvents() {
  let recordsArray = [];

  await base("events")
    .select({
      view: "Grid view",
    })
    .eachPage((records, fetchNextPage) => {
      recordsArray = [...recordsArray, ...records];
      fetchNextPage();
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  const events = recordsArray.map(function (event) {
    const rawEvent = event.fields;
    rawEvent.recordId = event.id;
    return rawEvent;
  });
  return events;
}

export async function getAirtableContributors() {
  let recordsArray = [];

  await base("contributors")
    .select({
      view: "view1",
    })
    .eachPage((records, fetchNextPage) => {
      recordsArray = [...recordsArray, ...records];
      fetchNextPage();
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  const contributors = recordsArray.map(function (contributor) {
    const rawContributor = contributor.fields;
    rawContributor.recordId = contributor.id;
    return rawContributor;
  });
  return contributors;
}

export async function airtablePostEvent(data) {
  const {
    event_title,
    contact_email,
    contact_name,
    event_description,
    event_date,
    event_link,
    event_image,
    event_city,
    event_country_code,
    event_address,
    event_timezone,
    event_start_time,
    event_end_time,
    event_end_date,
    event_meetupType,

  } = data;

  // if (!event_title || !event_date || !event_link || !event_image) {
  //   throw new Error("Missing argument for airtable postEvent");
  // }

  try {
    let record = await base("events").create({
      fldzGTmBuSndlvtNq: event_title,
      fldHz7TnLS88YS7p8: contact_email,
      fldQQJA0ULKiuQdh7: contact_name,
      fldmZpy8x02CguMEv: event_description,
      fldzmLf8r3lMtte2R: event_date,
      fld76R6zBWyMGzAVY: event_end_date,
      fldAOGsyKMuE3HVBA: event_link,
      fldbahaLhP0gBnuCR: event_image,
      fldQE6Lw2AkbLCjID: event_city,
      fldKcraoD2j2BgqJx: event_country_code,
      fldZJ8hJMxXEecZRK: event_address,
      fldRogSQE6qzDmUyt: event_timezone,
      fldMgz5SFxM00qXNc: event_start_time,
      fldVXGcr0x25es0jp: event_end_time,
      fldZOtn1FaXX26D4C: event_meetupType,
    });

    return record.getId();
  } catch (err) {
    throw new Error(`Error posting event to Airtable: ${err.message}`);
  }
}

export async function airtablePostEmail(data) {
  const { name, email } = data;

  try {
    let record = await base("Emails").create({
      fldis9mH2C4LhJD6o: name,
      fldw9fd9fccgs0Y69: email,
    });

    return record.getId();
  } catch (err) {
    throw new Error(`Error posting event to Airtable: ${err.message}`);
  }
}
