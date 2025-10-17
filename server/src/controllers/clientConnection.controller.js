import watcher from "../config/chokidar.config.js";
import { fileURLToPath } from "url";
import path from "path";
import eventBus from "../config/eventBus.config.js";

async function keepAliveConnection(req, res) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();
    res.write("data: Connected to server, ready to receive notifications\n\n");

    // const deviceName = req.query.deviceName;
    eventBus.on("fileUpload", (newFilePath) => {
      console.log(`wow, event watched and received`);
      const fileName = newFilePath.split("/")[1];
      res.write(`data: new file ready to receive: ${fileName}\n\n`);
    });
  } catch (e) {
    console.log(`error in clientConnection.controller.js: ${e}`);
    return res.status(500).send("Internal server errror");
  }
}
export default keepAliveConnection;
