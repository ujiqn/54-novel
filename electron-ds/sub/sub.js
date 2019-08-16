const ipcRenderer = require("electron").ipcRenderer;
const txt = document.getElementById("txt");

let json = [];
let startTime = 0;

let timer = null;

document.addEventListener("keyup", () => {
  try {
    clearInterval(timer);
    timer = setTimeout(() => {
      txt.value = "";
      ipcRenderer.send("msg", txt.value);
    }, 1000 * 60 * 60);
    txt.focus();
    ipcRenderer.send("msg", txt.value.replace(/\n/g, ""));
  } catch (err) {
    console.error(err);
  }

  // if (!startTime) {
  //   startTime = Date.now();
  // }

  // json.push({
  //   time: Date.now() - startTime,
  //   value: txt.value
  // });

  // console.log(json);
}, 100);

setTimeout(() => {
  ipcRenderer.send("msg", txt.value.replace(/\n/g, ""));
}, 1000);