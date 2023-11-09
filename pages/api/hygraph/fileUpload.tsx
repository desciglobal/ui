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
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const filesArray = Array.isArray(files.files)
          ? files.files
          : [files.files];

        const fileReciepts = await Promise.all(
          filesArray.map(async (file) => {
            try {
              const response = await fetch(`${HYGRAPH_URL}/upload`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${HYGRAPH_TOKEN}`,
                },
                body: form,
              });
              const data = JSON.parse(String(response));
              const { id, name, size } = data.entries[0];
              return { id, name, size };
            } catch (error) {
              return { name: file.originalFilename, error: error.message };
            }
          })
        );
        res.status(200).json({ fileReciepts });
      }
    });
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
