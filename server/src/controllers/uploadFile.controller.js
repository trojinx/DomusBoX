// this file validates if receiving user exists for the given request. At this point, file is uploaded to server via multer,
// just delete the file, if user does not exists, or password is incorrect.

// This does not stop user from uploading wrong file, but deletes a file, if user does not exist, or password is incorrect,
// to do this check beofre file upload, i need to use multer memory storage which i will do it later

// TODO: think of some standart approach, this is a temp workaround, or maybe not!

import fs from "node:fs/promises";
import eventBus from "../config/eventBus.config.js";
import { fileURLToPath } from "node:url";
import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";
import path from "node:path";
async function verifyUserCredentials(req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    const currentPath = fileURLToPath(import.meta.url);
    const fileName = `${username}_${req.file.originalname}`;
    const fileRemovalPath = path.join(
      `${currentPath}`,
      "../../..",
      "/uploads",
      `${fileName}`
    );
    if (!existingUser) {
      fs.rm(fileRemovalPath);
      return res.status(404).send("User with this username does not exist!");
    } else if (existingUser) {
      const passwordIsCorrect = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );

      if (!passwordIsCorrect) {
        fs.rm(fileRemovalPath);

        return res
          .status(401)
          .send("Password is not correct, please try again");
      } else {
        eventBus.emit("fileUpload");
        return res.status(200).send("File uploaded successfully");
      }
    }
  } catch (e) {
    console.log(e);
  }
}
export default verifyUserCredentials;
