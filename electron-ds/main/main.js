const ipcRenderer = require("electron").ipcRenderer;
const WIDTH = 550;
const HEIGHT = 550;
const TXT_LENGTH = 54;
const TXT_SIZE = 40;
const X_MARGIN = 425;
const Y_MARGIN = 51;
const X_RANGE = 74.5;
const Y_RANGE = 50;
const X_LENGTH = 6;
const Y_LENGTH = 9;
const GRID_SIZE = 50;
const CARET_HEIGHT = 5;
const DEMO_TEXT = [
  {time: 69682, value: ""},
  {time: 69538, value: "机"},
  {time: 69400, value: "机の"},
  {time: 69270, value: "机の上"},
  {time: 69136, value: "机の上の"},
  {time: 69004, value: "机の上のキ"},
  {time: 68876, value: "机の上のキー"},
  {time: 68750, value: "机の上のキーボ"},
  {time: 68617, value: "机の上のキーボー"},
  {time: 68486, value: "机の上のキーボード"},
  {time: 68354, value: "机の上のキーボードで"},
  {time: 68226, value: "机の上のキーボードで「"},
  {time: 68097, value: "机の上のキーボードで「5"},
  {time: 67966, value: "机の上のキーボードで「54"},
  {time: 67837, value: "机の上のキーボードで「54字"},
  {time: 67711, value: "机の上のキーボードで「54字の"},
  {time: 67581, value: "机の上のキーボードで「54字の物"},
  {time: 67451, value: "机の上のキーボードで「54字の物語"},
  {time: 67326, value: "机の上のキーボードで「54字の物語づ"},
  {time: 67192, value: "机の上のキーボードで「54字の物語づく"},
  {time: 67060, value: "机の上のキーボードで「54字の物語づくり"},
  {time: 66938, value: "机の上のキーボードで「54字の物語」づくり"},
  {time: 66813, value: "机の上のキーボードで「54字の物語」づくりに"},
  {time: 66691, value: "机の上のキーボードで「54字の物語」づくりに挑"},
  {time: 66566, value: "机の上のキーボードで「54字の物語」づくりに挑戦"},
  {time: 66439, value: "机の上のキーボードで「54字の物語」づくりに挑戦し"},
  {time: 66305, value: "机の上のキーボードで「54字の物語」づくりに挑戦して"},
  {time: 66175, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみ"},
  {time: 66054, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみま"},
  {time: 65926, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみまし"},
  {time: 65794, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょ"},
  {time: 65674, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう"},
  {time: 65546, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。"},
  {time: 65428, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書"},
  {time: 65303, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書け"},
  {time: 65180, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けた"},
  {time: 65055, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたら"},
  {time: 64924, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜ"},
  {time: 64800, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ"},
  {time: 64682, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写"},
  {time: 64552, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真"},
  {time: 64433, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を"},
  {time: 64301, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮"},
  {time: 64177, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮っ"},
  {time: 64059, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮って"},
  {time: 63941, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシ"},
  {time: 63820, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェ"},
  {time: 63697, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェア"},
  {time: 63578, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアし"},
  {time: 63464, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアして"},
  {time: 63350, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてく"},
  {time: 63231, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてくだ"},
  {time: 63111, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてくださ"},
  {time: 62991, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてください。"},
  {time: 27912, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてください。"},
  {time: 27396, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてください。"},
  {time: 27205, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ写真を撮ってシェアしてください"},
  {time: 26983, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてください"},
  {time: 26919, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてくださ"},
  {time: 26855, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてくださ"},
  {time: 26641, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてくだ"},
  {time: 26540, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてくだ"},
  {time: 26383, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてく"},
  {time: 26201, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしてk"},
  {time: 25340, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあして"},
  {time: 25177, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあしt"},
  {time: 24920, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあし"},
  {time: 24786, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあs"},
  {time: 24329, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇあ"},
  {time: 24055, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってしぇ"},
  {time: 23895, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってsy"},
  {time: 23765, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとってs"},
  {time: 23028, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとって"},
  {time: 22878, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとっt"},
  {time: 22698, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをとt"},
  {time: 22520, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをと"},
  {time: 22432, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんをt"},
  {time: 22278, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんを"},
  {time: 22171, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしんw"},
  {time: 21920, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしん"},
  {time: 21764, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃしn"},
  {time: 21574, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃし"},
  {time: 21458, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃs"},
  {time: 21268, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひしゃ"},
  {time: 21124, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひsy"},
  {time: 20995, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひs"},
  {time: 20522, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。書けたらぜひ"},
  {time: 19973, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたらぜひ"},
  {time: 19909, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたらぜひ"},
  {time: 19709, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたらぜ"},
  {time: 19539, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたらz"},
  {time: 18436, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたら"},
  {time: 18288, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけたr"},
  {time: 17974, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけた"},
  {time: 17818, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけた"},
  {time: 17554, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かけ"},
  {time: 17396, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。かk"},
  {time: 17312, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。か"},
  {time: 17147, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。k"},
  {time: 16859, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。"},
  {time: 16168, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう。"},
  {time: 15736, value: "机の上のキーボードで「54字の物語」づくりに挑戦してみましょう"},
  {time: 14904, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみましょう"},
  {time: 14848, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみましょう"},
  {time: 14745, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみましょ"},
  {time: 14640, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみまs"},
  {time: 14465, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみま"},
  {time: 14336, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみm"},
  {time: 14098, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてみ"},
  {time: 13737, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしてm"},
  {time: 13475, value: "机の上のキーボードで「54字の物語」づくりにちょうせんして"},
  {time: 13329, value: "机の上のキーボードで「54字の物語」づくりにちょうせんしt"},
  {time: 13184, value: "机の上のキーボードで「54字の物語」づくりにちょうせんし"},
  {time: 13063, value: "机の上のキーボードで「54字の物語」づくりにちょうせんs"},
  {time: 12788, value: "机の上のキーボードで「54字の物語」づくりにちょうせん"},
  {time: 12662, value: "机の上のキーボードで「54字の物語」づくりにちょうせn"},
  {time: 12525, value: "机の上のキーボードで「54字の物語」づくりにちょうせ"},
  {time: 12422, value: "机の上のキーボードで「54字の物語」づくりにちょうs"},
  {time: 12305, value: "机の上のキーボードで「54字の物語」づくりにちょう"},
  {time: 12254, value: "机の上のキーボードで「54字の物語」づくりにちょう"},
  {time: 12157, value: "机の上のキーボードで「54字の物語」づくりにちょ"},
  {time: 12037, value: "机の上のキーボードで「54字の物語」づくりにt"},
  {time: 11640, value: "机の上のキーボードで「54字の物語」づくりに"},
  {time: 11581, value: "机の上のキーボードで「54字の物語」づくりに"},
  {time: 10327, value: "机の上のキーボードで「54字の物語」づくり"},
  {time: 9827, value: "机の上のキーボードで「54字の物語」づくり"},
  {time: 9399, value: "机の上のキーボードで「54じのものがたり」づくr"},
  {time: 9197, value: "机の上のキーボードで「54じのものがたり」づく"},
  {time: 9019, value: "机の上のキーボードで「54じのものがたり」づk"},
  {time: 8834, value: "机の上のキーボードで「54じのものがたり」づ"},
  {time: 8643, value: "机の上のキーボードで「54じのものがたり」d"},
  {time: 8549, value: "机の上のキーボードで「54じのものがたり」"},
  {time: 8313, value: "机の上のキーボードで「54じのものがたり"},
  {time: 8121, value: "机の上のキーボードで「54じのものがたr"},
  {time: 7971, value: "机の上のキーボードで「54じのものがた"},
  {time: 7809, value: "机の上のキーボードで「54じのものがt"},
  {time: 7461, value: "机の上のキーボードで「54じのものが"},
  {time: 7349, value: "机の上のキーボードで「54じのものが"},
  {time: 7089, value: "机の上のキーボードで「54じのもの"},
  {time: 7033, value: "机の上のキーボードで「54じのもの"},
  {time: 6833, value: "机の上のキーボードで「54じのも"},
  {time: 6755, value: "机の上のキーボードで「54じのも"},
  {time: 6537, value: "机の上のキーボードで「54じの"},
  {time: 6453, value: "机の上のキーボードで「54じn"},
  {time: 6214, value: "机の上のキーボードで「54じ"},
  {time: 6149, value: "机の上のキーボードで「54じ"},
  {time: 5724, value: "机の上のキーボードで「54"},
  {time: 5561, value: "机の上のキーボードで「5"},
  {time: 5003, value: "机の上のキーボードで「"},
  {time: 4019, value: "机の上のキーボードで"},
  {time: 3762, value: "つくえのうえのきーぼーどで"},
  {time: 3576, value: "つくえのうえのきーぼーどd"},
  {time: 3349, value: "つくえのうえのきーぼーど"},
  {time: 3235, value: "つくえのうえのきーぼーd"},
  {time: 3039, value: "つくえのうえのきーぼー"},
  {time: 2732, value: "つくえのうえのきーぼ"},
  {time: 2555, value: "つくえのうえのきーb"},
  {time: 2353, value: "つくえのうえのきー"},
  {time: 2161, value: "つくえのうえのき"},
  {time: 1957, value: "つくえのうえのk"},
  {time: 1601, value: "つくえのうえの"},
  {time: 1511, value: "つくえのうえの"},
  {time: 1294, value: "つくえのうえ"},
  {time: 1080, value: "つくえのう"},
  {time: 848, value: "つくえの"},
  {time: 744, value: "つくえn"},
  {time: 632, value: "つくえ"},
  {time: 432, value: "つく"},
  {time: 254, value: "つk"},
  {time: 53, value: "つ"},
  {time: 1, value: "つ"},
  {time: 0, value: ""}
];
const MARGIN = 40;
const DEMO_TEXT_LENGTH = DEMO_TEXT.length;
const img = new Image();
const wrapper = document.getElementById("wrapper");
const debug = document.getElementById("debug");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const subCanvas = document.createElement("canvas");
const subCtx = subCanvas.getContext("2d");
let innerText = "";
let x = -5;
let y = -73;
let zoom = 1.46;
let timer = null;
let isDemo = false;
let demoStartTime = null;

ipcRenderer.on("msg", (evt, arg) => {
  innerText = arg;
  isDemo = !innerText;
  if (isDemo) {
    demoStartTime = Date.now();
  }
});

subCanvas.width = subCanvas.height = GRID_SIZE * zoom;
wrapper.style.transform = `translate(${x}px, ${y}px)`;
img.onload = start();
img.src    = "./img.png";

document.addEventListener("keyup", (evt) => {
  if (isDevelop()) {
    switch (evt.key) {
      case "ArrowUp":
        zoom +=  0.01;
        break;
      case "ArrowDown":
        zoom -=  0.01;
        break;
      case "h":
        x -= 1;
        break;
      case "j":
        y += 1;
        break;
      case "k":
        y -= 1;
        break;
      case "l":
        x += 1;
        break;
    }
    debug.style.display = "block";
    debug.innerHTML = `<p>zoom:${zoom}</p><p>translate(${x}px, ${y}px);</p>`
  } else {
    debug.style.display = "none";
  }
});

function start() {
  setInterval(render, 100);
}

function render() {
  const txt = isDemo ? (DEMO_TEXT[getCount()].value || "") : innerText;
  const innerTextLength = txt.length;
  let str;

  canvas.width  = WIDTH * zoom;
  canvas.height = HEIGHT * zoom;

  ctx.save();
    ctx.fillStyle = "#fff";
    ctx.fillRect(MARGIN * zoom, MARGIN * zoom, canvas.width - MARGIN * zoom * 2, canvas.height - MARGIN * zoom * 2);
  ctx.restore();

  if (isDevelop()) {
    subCanvas.width = subCanvas.height = GRID_SIZE * zoom;
    ctx.save();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    wrapper.style.transform = `translate(${x}px, ${y}px)`;
  }

  subCtx.save();
    subCtx.fillStyle = "#333";
    subCtx.textBaseline = "middle";
    subCtx.textAlign = "center";
    subCtx.font = TXT_SIZE * zoom + "px serif";

    for (let i = 0; i < TXT_LENGTH; ++i) {
      str = txt[i];

      if (str) {
        subCtx.save();
          subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);
          subCtx.fillStyle = "#000";
          subCtx.translate(GRID_SIZE / 2 * zoom, GRID_SIZE / 2 * zoom);
          setCharacterTransform(subCtx, str);
          subCtx.fillText(str, 0, 0);
        subCtx.restore();

        ctx.drawImage(subCanvas, getX(i), getY(i));
      }
    }
  subCtx.restore();
}

function getX(i) {
  return (X_MARGIN - X_RANGE * (i / Y_LENGTH | 0)) * zoom;
}

function getY(i) {
  return (Y_MARGIN + Y_RANGE * (i % Y_LENGTH)) * zoom;
}

function setCharacterTransform(ctx, c) {
  var em  = TXT_SIZE,
      deg = Math.PI / 180;

  switch (true) {
    case -1 < "。、．，".indexOf(c):
      ctx.translate(0.7 * em, -0.6 * em);
      return;
    case -1 < "「」『』（）()＜＞<>〈〉【】［］《》｛｝".indexOf(c):
      ctx.rotate(90 * deg);
      return;
    case -1 < "“".indexOf(c):
      ctx.translate(0.4 * em, 0.1 * em);
      ctx.rotate(180 * deg);
      return;
    case -1 < "”".indexOf(c):
      ctx.translate(-0.35 * em, -0.1 * em);
      ctx.scale(-1, 1);
      return;
    case -1 < "〝".indexOf(c):
      ctx.translate(0.6 * em, 0.6 * em);
      ctx.scale(-1, 1);
      return;
    case -1 < "〟".indexOf(c):
      ctx.translate(-0.6 * em, -0.65 * em);
      ctx.scale(-1, 1);
      return;
    case -1 < "ー".indexOf(c):
      ctx.scale(-1, 1);
      ctx.rotate(91.5 * deg);
      return;
    case -1 < "—…―〜".indexOf(c):
      ctx.rotate(90 * deg);
      return;
    case -1 < "：；｜".indexOf(c):
      ctx.rotate(90 * deg);
      return;
    case -1 < "'".indexOf(c):
      ctx.rotate(90 * deg);
      return;
    case -1 < "ぁぃぅぇぉゃゅょっァゥォュョッ".indexOf(c):
      ctx.translate(0.1 * em, -0.1 * em);
      return;
    case -1 < "ャ".indexOf(c):
      ctx.translate(0.12 * em, -0.1 * em);
      return;
    case -1 < "ィ".indexOf(c):
      ctx.translate(0.2 * em, -0.1 * em);
      return;
    case -1 < "ェ".indexOf(c):
      ctx.translate(0.1 * em, -0.15 * em);
      return;
    case -1 < ".,-".indexOf(c):
      ctx.rotate(90 * deg);
      return;
    case /[A-Za-z]/.test(c):
      ctx.rotate(90 * deg);
      return;
    case -1 < "Ｑ".indexOf(c):
      ctx.translate(0, -0.1 * em);
      return;
    case -1 < "Ｊａｃｅｊｍｎｏｒｓｔｕｖｗｘｚ".indexOf(c):
      ctx.translate(0, -0.15 * em);
      return;
    case -1 < "ｇｐｑｙ".indexOf(c):
      ctx.translate(0, -0.25 * em);
      return;
  }
}

function isDevelop() {
  return innerText === "develop";
}

function getCount() {
  const BLANK_TIME = 5000;
  const diff = Date.now() - demoStartTime;
  let i = null;

  DEMO_TEXT.forEach((val, index) => {
    if (diff < (val.time + BLANK_TIME) / 2) {
      i = index;

      return i;
    }

    if ((DEMO_TEXT[0].time + BLANK_TIME) / 2 < diff) {
      demoStartTime = Date.now();
    }
  });

  return i;
}