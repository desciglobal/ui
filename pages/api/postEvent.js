import { airtablePostEvent } from "../../services/airtable"

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    const event = req.body  
  
    // not needed in NextJS v12+
    const response = await airtablePostEvent(event);
    res.status(200).json({message: 'Mail successfully submitted'});
    return response
    
  
  }
