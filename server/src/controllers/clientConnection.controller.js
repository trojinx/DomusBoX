import eventBus from "../config/eventBus.config.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function keepAliveConnection(req, res) {
  try {
    const username = req.user.username;
    if (!username) {
      return res.status(403).send("Please send JWT token");
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();
    // res.write("data: Connected to server, ready to receive notifications\n\n");

    // when client reconnects...
    const currentFilePath = fileURLToPath(import.meta.url);
    const fileUploadPath = path.join(currentFilePath, "../../../uploads");
    // console.log(fileUploadPath);
    const allFiles = await fs.readdir(fileUploadPath);
    const unsentFiles = [];
    for (let i in allFiles) {
      const file = allFiles[i];
      if (file.startsWith(`${username}_`)) {
        unsentFiles.push(file);
      }
    }
    for (const file of unsentFiles) {
      await res.write(`data: missed file: ${file}\n\n`);
    }

    const newFilePathsArray = eventBus.on("fileUpload", (newFilePath) => {
      const fileName = newFilePath.split("/")[1];
      const ownerUsername = fileName.split("_")[0];
      if (ownerUsername == username) {
        res.write(`data: new file ready to receive: ${fileName}\n\n`);
      }
    });
  } catch (e) {
    console.log(`error in clientConnection.controller.js: ${e}`);

    return res.status(500).send("Internal server errror");
  }
}
export default keepAliveConnection;
