import { airtablePostEmail } from "../../services/airtable"

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    const data = req.body  
    // console.log("Data from API Handler : " , data)
    const response = await airtablePostEmail(data);
    console.log("response Airtable: ", response)
    res.status(200).json({message: 'Mail successfully submitted'});
    return response
    
  
  }
