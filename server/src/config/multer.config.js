import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const receiverUsername = req.body.username || "anonymous";
    const newFileName = `${receiverUsername}_${file.originalname}`;
    cb(null, newFileName);
  },
});

export default storage;
