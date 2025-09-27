import path from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads");
console.log(typeof uploadDir);

const watcher = chokidar.watch(`${uploadDir}`, { persistent: true });
// TODO: Trigger event if file is uploaded
export default watcher;
