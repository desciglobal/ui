import { IncomingForm } from "formidable";
import FormData from "form-data";
import fs from "fs";
import fetch from "node-fetch";


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
        return res.status(500).json({ error: "Internal server error" });
      }

      const file = files.file[0];
      const hygraphForm = new FormData();

      const fileStream = fs.createReadStream(file.filepath);
      hygraphForm.append("fileUpload", fileStream, file.originalFilename);

      try {
        const hygraphResponse = await uploadToHygraph(hygraphForm);
        const data = await hygraphResponse.json();
        if (hygraphResponse.ok) {
          console.log(data);
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

async function uploadToHygraph(hygraphForm) {
  const result = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      ...hygraphForm.getHeaders(),
    },
    body: hygraphForm,
  });

  return result;
}
