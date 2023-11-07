import getAirtableClient from "./getClient";

export async function airtablePostEvent(data) {

    const base = getAirtableClient()
    
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
