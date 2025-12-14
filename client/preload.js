const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  downloadFile: (url, headers, filename, targetDirectory) =>
    ipcRenderer.invoke("download-file", { url, headers, filename, targetDirectory }),
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
});


