// for future me that is wondering why tf is this file: records that --> client has downloaded file, and i can delete this file from server
// client itself sends req that it has downloaded the file,

import File from "../schema/fileTransaction.schema.js";
async function recordFileDownload(req, res) {
  try {
    const { fileName } = req.body;
    const username = req.user.username;
    const userID = req.user.id;
    const fileOwner = fileName.split("_")[0];
    const fileType = fileName.split(".")[1]; // keep it for now, later change. can cause issues if filename is like this eg: trojinx.myfile.pdf
    if (fileOwner !== username) {
      return res.status(400).send("You are not authorized to do this action");
    } else if (fileOwner == username) {
      const newFile = new File({
        fileName: fileName,
        fileType: fileType,
        fileOwnerID: userID,
        fileOwnerUsername: username,
      });

      await newFile.save();
      return res.status(200).send("File download recorded successfully");
    }
  } catch (e) {
    console.log(`error in recordFileDownload.controller.js: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export default recordFileDownload;
