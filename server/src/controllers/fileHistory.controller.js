import File from "../schema/fileTransaction.schema.js";
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
export default showFileHistory;
