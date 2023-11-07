import Airtable from 'airtable'


const getAirtableClient = () => {
  const airtableBase = process.env.AIRTABLE_BASE
  const AIRTABLE_KEY  = process.env.AIRTABLE_KEY

  if (!airtableBase) {
    throw new Error('No airtable base!')
  }

  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_KEY,
  })

  const base =  Airtable.base(airtableBase)
  return base
}

export default getAirtableClient
