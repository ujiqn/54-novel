const {app, BrowserWindow} = require("electron");

app.on("ready", function() {
  let mainWindow = new BrowserWindow({
    width  : 600,
    height : 820
  });

  mainWindow.loadURL("file://" + __dirname + "/../docs/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});