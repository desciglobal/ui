import formidable from "formidable";

const HYGRAPH_URL = process.env.NEXT_PUBLIC_HYGRAPH_UPLOAD;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const fileUpload = req.body;
    console.log("Endpoint hit");
    console.log(fileUpload);
  } else {
    res.status(404).json({ error: "Method not allowed" });
  }
}
