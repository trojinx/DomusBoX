import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function letDownloadFile(req, res) {
  const fileName = req.query.fileName;
  const username = req.user.username;
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const fileUploadPath = path.join(
    currentDirectory,
    "../..",
    "uploads",
    `${fileName}`
  );
  const fileFor = fileName.split("_")[0];

  if (fileFor == username) {
    return res.download(fileUploadPath);
  } else {
    res.status(400).send("you are not authorized to download this file");
  }
}
export default letDownloadFile;
