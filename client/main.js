const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("signin.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle directory selection
ipcMain.handle("select-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result.filePaths[0];
});

// Handle file downloads
ipcMain.handle("download-file", async (_evt, args) => {
  const { url, headers, filename, targetDirectory } = args || {};
  if (!url || !filename) {
    throw new Error("Missing url or filename for download");
  }
  const res = await fetch(url, { headers: headers || {} });
  if (!res.ok) {
    throw new Error(`Download failed with status ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Use target directory if provided, otherwise default to Downloads folder
  const downloadsPath = targetDirectory || app.getPath("downloads");
  const filePath = path.join(downloadsPath, filename);
  
  await fs.promises.writeFile(filePath, buffer);
  return { filePath };
});

