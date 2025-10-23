import app from "./src/config/express.config.js";
import dotenv from "dotenv";
import multer from "multer";
import letDownloadFile from "./src/controllers/letDownloadFile.controller.js";

import uploadFileToServer from "./src/controllers/uploadFile.controller.js";
import storage from "./src/config/multer.config.js";
import keepAliveConnection from "./src/controllers/clientConnection.controller.js";
import connectDB from "./src/config/db.config.js";
import signUp from "./src/controllers/signup.controller.js";
import signIn from "./src/controllers/signIn.controller.js";
import verifyJWT from "./src/middleware/verifyJWT.middleware.js";
const upload = multer({ storage });

dotenv.config();
connectDB();

app.get("/testing", (req, res) => {
  res.status(200).send("testing success");
});

app.post("/signUp", signUp);
app.post("/signIn", signIn);

app.post("/fileUpload", upload.single("file"), uploadFileToServer);

app.get("/download", verifyJWT, letDownloadFile);

app.get("/notifications", keepAliveConnection);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server started on port: ${process.env.PORT}`);
});

// PORT=3500
// MONGO_URI="mongodb+srv://shaaradjarandikar_db_user:eNm2iuFazAIQmMOy@domuxbox.evby794.mongodb.net/?retryWrites=true&w=majority&appName=domuxbox"
// JWT_SECRET="SDHFSUFHDJHFVGfsdkfskfdjsk123123DUVHDU"
