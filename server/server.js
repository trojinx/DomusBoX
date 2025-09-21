import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import multer from "multer";

import uploadFileToServer from "./src/controllers/uploadFile.controller.js";
import storage from "./src/config/multer.config.js";
const upload = multer({ storage });

dotenv.config();

app.get("/testing", (req, res) => {
  res.status(200).send("testing success");
});

app.post("/fileUpload", upload.single("file"), uploadFileToServer);

app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
