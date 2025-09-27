import watcher from "../config/chokidar.config.js";
import { fileURLToPath } from "url";
import path from "path";

async function keepAliveConnection(req, res) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();
    res.write("Connected to server, ready to receive notifications");

    const deviceName = req.query.deviceName;
    // now the device is connected, think of how and what to send an event if there is a file for him

    // const thisFileLocation = fileURLToPath(import.meta.url);
    // const thisFileDirectory = path.dirname(`${thisFileLocation}`);
    // const uploadFolder = path.join(
    //   thisFileDirectory,
    //   "../..",
    //   "/uploads",
    //   `${deviceName}`
    // );
    // let fileExists;
    // const trimmedName = uploadFolder.split("_")[0];
    // console.log(trimmedName);
    // if (trimmedName.includes(deviceName)) {
    //   fileExists = true;
    // }

    // if (fileExists) {
    //   res.write();
    // }
  } catch (e) {
    console.log(`error in clientConnection.controller.js: ${e}`);
    return res.status(500).send("Internal server errror");
  }
}
export default keepAliveConnection;
