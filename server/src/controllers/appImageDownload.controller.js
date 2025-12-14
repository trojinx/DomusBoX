import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
async function appImageDownload(req, res) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const appImagePath = path.join(__dirname, "../../DomuxBox-1.0.0.AppImage");
    res.download(appImagePath);
    // return res.status(200).send("ok");
  } catch (e) {
    console.log(e);

    return res.status(500).send("Internal server error");
  }
}

export default appImageDownload;
