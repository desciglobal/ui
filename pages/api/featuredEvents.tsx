import { getAllEvents } from "../../services/sort-event-data";

export default async function handler(req, res) {

    const {featuredEvents} = await getAllEvents();
    
    if (req.method !== 'GET') {
      res.status(405).send({ message: 'Only GET requests allowed' })
      return
    }
   
    // console.log("Data from API Handler : " , data)

    const events = featuredEvents.slice(0,3)
    
    res.status(200).json({events});
    return    
  
  }
