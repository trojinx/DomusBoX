// apparently you can't emit an event from 1 module and hear it in another module, even though both events are in same node process, LOL
import eventBus from "./eventBus.config.js";
import path from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads");

const watcher = chokidar.watch(`${uploadDir}`, { persistent: true });

watcher.on("add", (newFilePath) => {
  console.log(newFilePath);

  const fileNameOnly = newFilePath.split("uploads")[1];
  console.log(fileNameOnly);

  eventBus.emit("fileUpload", fileNameOnly);
});

export default watcher;
