import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import multer from "multer";
import letDownloadFile from "./src/controllers/letDownloadFile.controller.js";
import watcher from "./src/config/chokidar.config.js"; // not importing this causes chokidar watcher to not exec, so keep it imported
// import uploadFileToServer from "./src/controllers/uploadFile.controller.js";
import storage from "./src/config/multer.config.js";
import keepAliveConnection from "./src/controllers/clientConnection.controller.js";
import connectDB from "./src/config/db.config.js";
import signUp from "./src/controllers/signupDeskApp.controller.js";
import verifyJWT from "./src/middleware/verifyJWT.middleware.js";
import recordFileDownload from "./src/controllers/recordFileDownload.controller.js";
// import showFileHistory from "./src/controllers/fileHistory.controller.js";
import {
  showProfileInfo,
  showFileHistory,
} from "./src/controllers/myProfile.controller.js";
import signInWithJWT from "./src/controllers/signInWithJWTDeskApp.controller.js";
// import deleteFile from "./src/controllers/deleteFile.controller.js";
import signInWeb from "./src/controllers/signInWeb.controller.js";
import signInDesk from "./src/controllers/signInDeskApp.controller.js";
import respond200 from "./src/controllers/respond200.controller.js";
import appImageDownload from "./src/controllers/appImageDownload.controller.js";

const upload = multer({ storage });

dotenv.config();
connectDB();
// deleteFile();

app.get("/testing", (req, res) => {
  res.status(200).send("testing success");
});

app.post("/record", verifyJWT, recordFileDownload);
app.post("/signUp", signUp);
app.post("/signIn", signInDesk);
app.get("/fileHistory", verifyJWT, showFileHistory);
app.get("/showInfo", verifyJWT, showProfileInfo);
// app.post("/fileUpload", upload.single("file"), uploadFileToServer);

//route for user to upload file to server:
app.post("/fileUpload", signInWeb, upload.single("file"), respond200);

app.get("/download", verifyJWT, letDownloadFile);
app.get("/quickSignIn", verifyJWT, signInWithJWT);
// app.delete("/deleteFile", verifyJWT, deleteFile);

app.get("/notifications", verifyJWT, keepAliveConnection);
app.get("/appImage", appImageDownload);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
