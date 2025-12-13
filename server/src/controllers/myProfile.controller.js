import User from "../schema/user.schema.js";
import File from "../schema/fileTransaction.schema.js";
async function showProfileInfo(req, res) {
  try {
    const id = req.user.id;
    const existingUser = await User.findById(id).select(
      "-hashedPassword -updatedAt"
    );
    if (!existingUser) {
      return res.status(404).send("No such user exists");
    } else {
      return res.status(200).json({ existingUser });
    }
  } catch (e) {
    console.log(`error in myProfile controller: ${e}`);
    return res.status(500).send("Internal server error");
  }
}

async function showFileHistory(req, res) {
  try {
    const userID = req.user.id;
    const foundFiles = await File.find({ fileOwnerID: userID });
    if (foundFiles.length == 0) {
      return res.status(404).send("No previous files");
    } else if (foundFiles.length >= 1) {
      return res.status(200).json({ foundFiles: foundFiles });
    }
  } catch (e) {
    console.log(`error in fileHistory.controller.js: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export { showProfileInfo, showFileHistory };
