import { IncomingForm } from "formidable";
import FormData from "form-data"

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_UPLOAD;
const HYGRAPH_TOKEN = process.env.HYGRAPH_ASSET_TOKEN;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // Handle error
        return res.status(500).json({ error: "Internal server error" });
      }

      // Process the file and upload to Hygraph
      const file = files.file[0]; 
      console.log("FILE", file)
      const hygraphForm = new FormData();
      hygraphForm.append("fileUpload", file);
      try {
        const hygraphResponse = await uploadToHygraph(hygraphForm);
        const data = await hygraphResponse.json();
        if (hygraphResponse.ok) {
          res.status(200).json(data);
        } else {
          res
            .status(hygraphResponse.status)
            .json({ error: data.errors || "Error uploading to Hygraph" });
        }
      } catch (uploadError) {
        res.status(500).json({ error: "Error uploading file to Hygraph" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function uploadToHygraph(hygraphFormData) {
  const result = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      content: "multipart/form-data",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      ...hygraphFormData.getHeaders(),
    },
    body: hygraphFormData,
  });

  console.log("HYGRAPH RESULT", result);

  return result;
}
