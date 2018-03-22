var WIDTH              = 550,
    HEIGHT             = 550,
    TXT_LENGTH         = 54,
    TXT_SIZE           = 40,
    X_MARGIN           = 425,
    Y_MARGIN           = 51,
    X_RANGE            = 74.5,
    Y_RANGE            = 50,
    X_LENGTH           = 6,
    Y_LENGTH           = 9,
    GRID_SIZE          = 50,
    img                = new Image(),
    btn                = document.getElementById("btn"),
    txt                = document.getElementById("txt"),
    canvas             = document.getElementById("canvas"),
    ctx                = canvas.getContext("2d"),
    subCanvas          = document.createElement("canvas"),
    subCtx             = subCanvas.getContext("2d");

subCanvas.width = subCanvas.height = GRID_SIZE;
img.onload = start();
img.src    = "./img.png";

function start() {
  setInterval(render, 100);
}

function render() {
  var str;

  canvas.width  = WIDTH;
  canvas.height = HEIGHT;

  ctx.save();
    ctx.drawImage(img, 0, 0);
  ctx.restore();

  subCtx.save();
    subCtx.fillStyle = "#333";
    subCtx.textBaseline = "middle";
    subCtx.textAlign = "center";
    subCtx.font = TXT_SIZE + "px serif";

    for (var i = 0; i < TXT_LENGTH; ++i) {
      str = txt.innerText[i];

      if (str) {
        subCtx.save();
          subCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
          subCtx.translate(GRID_SIZE / 2, GRID_SIZE / 2);
          setCharacterTransform(subCtx, str);
          subCtx.fillText(str, 0, 0);
        subCtx.restore();
        ctx.drawImage(subCanvas, getX(i), getY(i));
      }
    }
  subCtx.restore();
  btn.href = (canvas.toDataURL("image/png"));
}

function getX(i) {
  return X_MARGIN - X_RANGE * (i / Y_LENGTH | 0);
}

function getY(i) {
  return Y_MARGIN + Y_RANGE * (i % Y_LENGTH);
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