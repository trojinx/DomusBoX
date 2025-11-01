const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  downloadFile: (url, headers, filename) =>
    ipcRenderer.invoke("download-file", { url, headers, filename }),
});


