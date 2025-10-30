import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import multer from "multer";
import letDownloadFile from "./src/controllers/letDownloadFile.controller.js";
import watcher from "./src/config/chokidar.config.js"; // not importing this causes chokidar watcher to not exec, so keep it imported
import uploadFileToServer from "./src/controllers/uploadFile.controller.js";
import storage from "./src/config/multer.config.js";
import keepAliveConnection from "./src/controllers/clientConnection.controller.js";
import connectDB from "./src/config/db.config.js";
import signUp from "./src/controllers/signup.controller.js";
import signIn from "./src/controllers/signIn.controller.js";
import verifyJWT from "./src/middleware/verifyJWT.middleware.js";
import recordFileDownload from "./src/controllers/recordFileDownload.controller.js";
import showFileHistory from "./src/controllers/fileHistory.controller.js";
import showProfileInfo from "./src/controllers/myProfile.controller.js";
const upload = multer({ storage });

dotenv.config();
connectDB();

app.get("/testing", (req, res) => {
  res.status(200).send("testing success");
});

app.post("/record", verifyJWT, recordFileDownload);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.get("/fileHistory", verifyJWT, showFileHistory);
app.get("/showInfo", verifyJWT, showProfileInfo);
app.post("/fileUpload", upload.single("file"), uploadFileToServer);

app.get("/download", verifyJWT, letDownloadFile);

app.get("/notifications", keepAliveConnection);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
