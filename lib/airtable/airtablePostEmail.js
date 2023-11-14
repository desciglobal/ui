import getAirtableClient from "./getClient";

export async function airtablePostEmail(data) {

    const base = getAirtableClient()
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