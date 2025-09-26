import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function letDownloadFile(req, res) {
  const fileName = req.query.fileName;
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const fileUploadPath = path.join(
    currentDirectory,
    "../..",
    "uploads",
    `${fileName}`
  );

  return res.download(fileUploadPath);
}
export default letDownloadFile;
