async function uploadFileToServer(req, res) {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    res.status(200).send("File uploaded successfully");
  } catch (e) {
    console.error("Error while writing file:", e);
    res.status(500).send("Failed to upload file");
  }
}

export default uploadFileToServer;
