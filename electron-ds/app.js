const electron = require("electron");
const { app, ipcMain, BrowserWindow } = require("electron");
const DELAY = 1000;

app.on("ready", function() {
  setTimeout(() => {
    const electronScreen = electron.screen;
    const displays = electronScreen.getAllDisplays();
    let externalDisplay;

    displays.forEach((display) => {
      if (display.bounds.x !== 0 || display.bounds.y !== 0) {
        externalDisplay = display;
      }
    });

    const mainWindow = new BrowserWindow({
      width  : 800,
      height : 800,
      x: externalDisplay ? externalDisplay.bounds.x : null,
      y: externalDisplay ? externalDisplay.bounds.y : null,
      webPreferences: {
        nodeIntegration: true
      },
      fullscreen: !!externalDisplay,
      frame: !externalDisplay,
      kiosk: !!externalDisplay
    });

    ipcMain.on("msg", (evt, arg) => {
      if (mainWindow) {
        mainWindow.webContents.send('msg', arg);
      }

      if (arg === "exit" || arg === "えぃt") {
        app.quit();
      }
    });

    mainWindow.on("closed", () => {
      app.quit();
    });

    mainWindow.loadURL("file://" + __dirname + "/main/index.html");

    setTimeout(() => {
      const subWindow = new BrowserWindow({
        width  : 800,
        height : 800,
        webPreferences: {
          nodeIntegration: true,
        },
        fullscreen: !!externalDisplay,
        frame: !externalDisplay,
        kiosk: !!externalDisplay
      });

      subWindow.on("closed", () => {
        app.quit();
      });

      subWindow.loadURL("file://" + __dirname + "/sub/index.html");
    }, DELAY);
  }, DELAY);
});