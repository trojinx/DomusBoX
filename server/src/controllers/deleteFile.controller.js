//TODO this;
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import eventBus from "../config/eventBus.config.js";
import path from "node:path";

async function deleteFile() {
  try {
    eventBus.on("deleteFile", (fileName) => {
      const currentFilename = fileURLToPath(import.meta.url);
      const uploadFilesDir = path.join(currentFilename, "../../uploads");
      const deleteFilePath = path.join(uploadFilesDir, `/${fileName}`);
      console.log(deleteFilePath);
      fs.rm(deleteFilePath);
      console.log(`deleted file: ${deleteFilePath}`);
    });
  } catch (e) {
    console.log(`error in deleteFile.controller.js:${e}`);
  }
}

export default deleteFile;
