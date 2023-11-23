import getFeaturedEvents from "../../../lib/hygraph/getFeaturedEvents";

export default async function comments(req, res) {
  if (req.method === "GET") {
    try {
      const featuredEvents = await getFeaturedEvents();
      return res.status(200).json(featuredEvents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching Events" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
