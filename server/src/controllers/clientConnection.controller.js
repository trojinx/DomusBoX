import eventBus from "../config/eventBus.config.js";

async function keepAliveConnection(req, res) {
  try {
    const username = req.user.username;
    if (!username) {
      return res.status(403).send("Please send JWT token");
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();
    res.write("data: Connected to server, ready to receive notifications\n\n");
    eventBus.on("fileUpload", (newFilePath) => {
      const fileName = newFilePath.split("/")[1];
      const ownerUsername = fileName.split("_")[0];
      if (ownerUsername == username) {
        res.write(`data: new file ready to receive: ${fileName}\n\n`);
      }
    });
  } catch (e) {
    console.log(`error in clientConnection.controller.js: ${e}`);

    return res.status(500).send("Internal server errror");
  }
}
export default keepAliveConnection;
