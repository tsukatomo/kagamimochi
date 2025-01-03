/*
  kagamimochi
  main.js
*/

// get elements in document
// canvas - background layer
const backgLay = document.getElementById("backg_lay");
const backgCtx = backgLay.getContext("2d");
// canvas - character layer
const charaLay = document.getElementById("chara_lay");
const charaCtx = charaLay.getContext("2d");
// canvas - UI layer
const useriLay = document.getElementById("useri_lay");
const useriCtx = useriLay.getContext("2d");
// canvas - transition layer
const transLay = document.getElementById("trans_lay");
const transCtx = transLay.getContext("2d");

// canvas - button
// canvas - transition layer
const btnLay = document.getElementById("btn");
const btnCtx = btnLay.getContext("2d");

let imageSmoothing = (ctx, isEnabled) => {
  ctx.imageSmoothingEnabled = isEnabled;
  ctx.mozImageSmoothingEnabled = isEnabled;
  ctx.webkitImageSmoothingEnabled = isEnabled;
  ctx.msImageSmoothingEnabled = isEnabled;
}

// get image 
let imgSanpou = [new Image(), new Image()];
imgSanpou[0].src = "./img/sanpou.png";
let imgMochiBottom = [new Image(), new Image()];
imgMochiBottom[0].src = "./img/mochiBottom.png";
let imgMochiTop = [new Image(), new Image()];
imgMochiTop[0].src = "./img/mochiTop.png";
let imgDaidai = [new Image(), new Image()];
imgDaidai[0].src = "./img/daidai.png";

// image - button
let buttonImage = new Image();
buttonImage.src = "./img/button.png";

// shaow of images
const shadowList = [
  imgSanpou,
  imgMochiBottom,
  imgMochiTop,
  imgDaidai
];

// create shadow image
let createShadowURL = function (originalImg) {
  // create new canvas
  const workCanvas = document.createElement('canvas');
  const workCtx = workCanvas.getContext("2d");
  workCanvas.width = originalImg.width;
  workCanvas.height = originalImg.height;
  workCtx.drawImage(originalImg, 0, 0);
  const sImageData = workCtx.getImageData(0, 0, workCanvas.width, workCanvas.height);
  const data = sImageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue; // ignore transparent cell
    data[i] = 0; // red = 0
    data[i + 1] = 0; // green = 0
    data[i + 2] = 0; // blue = 0
    data[i + 3] = 0x40;
    //console.log("黒");
  }
  // reset work canvas and draw shadow data
  workCtx.clearRect(0, 0, workCanvas.width, workCanvas.height);
  workCtx.putImageData(sImageData, 0, 0);
  return workCanvas.toDataURL();
};

// fonts in canvas
const textSize = 22;
const fontFamily = '"筑紫A丸ゴシック","游ゴシック体",system-ui';
const textColor = "rgba(255, 255, 255, 1.0)";

let drawText = (text, size, color, stroke, x, y, ctx) => {
  let fillStyleTmp = ctx.fillStyle;
  ctx.font = size + "px " + fontFamily;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.fillStyle = fillStyleTmp;
};

let drawTextCenter = (text, size, color, stroke, y, canvas, ctx) => {
  ctx.font = size + "px " + fontFamily;
  let displaySize = ctx.measureText(text);
  drawText(text, size, color, stroke, Math.floor((canvas.width - displaySize.width) / 2), y, ctx);
};


// get key event
// variables
let keyInput = [];
let keyPressed = [];
let keyPressedPrevious = [];
let keyInterval = 0;
let buttonPressed;
// pressed key
window.onkeydown = function (e) {
  //if (isAcceptKeyInput === false) return;
  if (e.defaultPrevented) return false;
  // read pressed key
  if (e.code === "ArrowUp" || e.code === "KeyK") {
    if (keyInput.indexOf("u") == -1) keyInput.push("u");
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ") {
    if (keyInput.indexOf("d") == -1) keyInput.push("d");
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH") {
    if (keyInput.indexOf("l") == -1) keyInput.push("l");
  }
  if (e.code === "ArrowRight" || e.code === "KeyL") {
    if (keyInput.indexOf("r") == -1) keyInput.push("r");
  }
  if (e.code === "KeyZ" || e.code === "Enter") {
    if (keyInput.indexOf("z") == -1) keyInput.push("z");
  }
  if (e.code === "KeyX") {
    if (keyInput.indexOf("x") == -1) keyInput.push("x");
  }
  if (e.code === "KeyA") {
    if (keyInput.indexOf("a") == -1) keyInput.push("a");
  }
  if (e.code === "KeyS") {
    if (keyInput.indexOf("s") == -1) keyInput.push("s");
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// released key
window.onkeyup = function (e) {
  //if (isAcceptKeyInput === false) return;
  if (e.defaultPrevented) return false;
  // read released key
  let idx;
  if (e.code === "ArrowUp" || e.code === "KeyK") {
    idx = keyInput.indexOf("u");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowDown" || e.code === "KeyJ") {
    idx = keyInput.indexOf("d");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowLeft" || e.code === "KeyH") {
    idx = keyInput.indexOf("l");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "ArrowRight" || e.code === "KeyL") {
    idx = keyInput.indexOf("r");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyZ" || e.code === "Enter") {
    idx = keyInput.indexOf("z");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyX") {
    idx = keyInput.indexOf("x");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyA") {
    idx = keyInput.indexOf("a");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  if (e.code === "KeyS") {
    idx = keyInput.indexOf("s");
    if (idx != -1) keyInput.splice(idx, 1);
  }
  // prevent default key input
  if (!e.metaKey && !e.shiftKey && !e.ctrlKey){
    e.preventDefault();
  }
};

// get touch event
let buttonList = {
  "u": { x:  24, y: 24 },
  "d": { x:  24, y: 72 },
  "l": { x:   0, y: 48 },
  "r": { x:  48, y: 48 },
  "z": { x: 136, y: 48 },
  "x": { x: 112, y: 72 },
  "a": { x:  88, y: 48 },
  "s": { x: 112, y: 24 }
};

let pushButton = function(evt) {
  evt.preventDefault();
  //console.log("touch start!");
  // タッチ位置リストの取得
  const touches = evt.changedTouches;
  // btnLayの位置情報を取得
  const btnLayRect = evt.target.getBoundingClientRect();
  for (let i = 0; i < touches.length; i++) {
    //console.log("client:", touches[i].clientX, touches[i].clientY);
    //console.log("page:", touches[i].pageX, touches[i].pageY);
    //console.log("screen:", touches[i].screenX, touches[i].screenY);
    // ブラウザ上のbtnLayにおけるタッチ座標を求める
    const viewX = touches[i].clientX - btnLayRect.left;
    const viewY = touches[i].clientY - btnLayRect.top;
    // 実物とブラウザ上のbtnLayのサイズ比率を求める
    const ratioX = btnLay.width / btnLay.clientWidth;
    const ratioY = btnLay.height / btnLay.clientHeight;
    // ブラウザ上のタッチ座標を実物のbtnLay上の座標に変換
    const canvX = Math.floor(viewX * ratioX);
    const canvY = Math.floor(viewY * ratioY);
    //console.log("canvas:", canvX, canvY);
    // タッチ位置にあるボタンを取得
    buttonPressed = "";
    const buttonKeys = Object.keys(buttonList);
    for (let i = 0; i < buttonKeys.length; i++) {
      if (canvX < buttonList[buttonKeys[i]].x || buttonList[buttonKeys[i]].x + 24 < canvX) continue;
      if (canvY < buttonList[buttonKeys[i]].y || buttonList[buttonKeys[i]].y + 24 < canvY) continue;
      buttonPressed = buttonKeys[i];
      break;
    }
    //console.log("pressed:", buttonPressed);
    if (buttonPressed === "") return;
    // 入力リストにボタンを追加
    if (keyInput.indexOf(buttonPressed) == -1) keyInput.push(buttonPressed);
  }
};

let releaseButton = function(evt) {
  // 入力リストからボタンを削除
  idx = keyInput.indexOf(buttonPressed);
  if (idx != -1) keyInput.splice(idx, 1);
};

let cancelButton = function(evt) {
  // 入力リストからボタンを削除
  idx = keyInput.indexOf(buttonPressed);
  if (idx != -1) keyInput.splice(idx, 1);
};

btnLay.addEventListener("touchstart", pushButton, false);
btnLay.addEventListener("touchend", releaseButton, false);
btnLay.addEventListener("touchcancel", cancelButton, false);

// ボタンが押下されているか調べる
let isKeyPressed = function (key) {
  if (!acceptKeyInput) return false;
  return (keyPressed.indexOf(key) != -1);
};

// たった今ボタンが押されたかどうか調べる
let isKeyPressedNow = function(key) {
  if (!acceptKeyInput) return false;
  return (keyPressed.indexOf(key) != -1 && keyPressedPrevious.indexOf(key) === -1);
};

// get key function (with interval)
let isKeyPressedInterval = function(key) {
  if (keyInterval > 0) return false;
  if (keyPressed.indexOf(key) != -1) {
    // reset key interval
    keyInterval = 20;
    return true;
  };
  return false;
};

// share to twitter（now:X）
let tweet = function () {
  // reset key inputs
  keyInput.length = 0;
  // create tweet message
  let tweetmes;
  tweetmes = "西暦" + accuracy + "年の到来を鏡餅で祝福した！\n";
  tweetmes += "&url=https://tsukatomo.github.io/kagamimochi";
  tweetmes += "&hashtags=かがみもち重ね";
  const url = "https://twitter.com/intent/tweet?text=" + tweetmes;
  window.open(url, '_blank');
  //window.location.href = url; // ポップアップしない場合
};

// scene
let scene;
let sceneOverLay;
let initFlag, overLayInitFlag;
let nowLoading;
let sceneAfterTrans;
let transAnimeCount = 0;
const transAnimeCountInit = 30;
const nokogiri = 32;

let setScene = (nextscene) => {
  scene = nextscene;
  initFlag = true;
  nowLoading = true;
};

let setOverlayScene = (nextscene) => {
  sceneOverLay = nextscene;
  overLayInitFlag = true;
};

let setTransition = (nextscene) => {
  sceneAfterTrans = nextscene;
  setOverlayScene("transin");
}

//---------
// Sprites
//---------
// sprite class
class Sprite {
  constructor(id, x, y, w, h, img, anime) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // image and animation data
    this.img = img;
    this.anime = anime;
    this.direction = "right";
    this.anitype = "default";
    this.anicount = 0;
    // falseのとき、表示されない
    this.isVisible = true;
    // speed
    this.dx = 0;
    this.dy = 0;
    // other parameter
    this.param = [];
  };

  // === animation ===
  startAnime(anitype) {
    this.anitype = anitype;
    this.anicount = 0;
  };

  changeAnime(new_anitype) {
    if (new_anitype === this.anitype) return;
    this.anitype = new_anitype;
    this.anicount = 0;
    //console.log("change to:" + new_anitype);
  };

  updateAnime() {
    this.anicount++;
  };

  isEndAnime() {
    if (this.anime === null) return false;
    return (!this.anime[this.anitype].repeat && this.anicount > this.anime[this.anitype].dulation * this.anime[this.anitype].frames)
  };

  frameNumber() {
    if (this.anime === null) return false;
    let frameCount = Math.floor(this.anicount / this.anime[this.anitype].dulation);
    if (this.anime[this.anitype].repeat) {
      return frameCount % this.anime[this.anitype].frames;
    }
    return frameCount < this.anime[this.anitype].frames ? frameCount : this.anime[this.anitype].frames - 1;
  };

  drawAnime(ctx, drawX, drawY) {
    if (this.img === null) return;
    ctx.drawImage(this.img[0], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  drawShadow(ctx, drawX, drawY) {
    if (this.img === null) return;
    ctx.drawImage(this.img[1], this.w * this.anime[this.anitype].img[this.frameNumber()], 0, this.w, this.h, drawX, drawY, this.w, this.h);
  };

  // === parameter ===
  setParam(idx, value) {
    while (this.param.length <= idx) {
      this.param.push(0);
    }
    this.param[idx] = value;
  };

  getParam(idx) {
    if (this.param.length <= idx) return null;
    return this.param[idx];
  };

  isParamEmpty() {
    return this.param.length === 0;
  };

  incParam(idx) {
    if (this.param.length <= idx) return null;
    this.setParam(idx, this.getParam(idx) + 1);
    return this.param[idx];
  };

  decParam(idx) {
    if (this.param.length <= idx) return null;
    this.setParam(idx, this.getParam(idx) - 1);
    return this.param[idx];
  };

};

const defaultAnime = {"default": { frames: 1, dulation: 8, img: [0], repeat: true }};

// create sprite
let sanpou = new Sprite("sanpou", 192, 360, 256, 256, imgSanpou, defaultAnime);
let mochiBottom = new Sprite("mochib", -9999, -9999, 256, 96, imgMochiBottom, defaultAnime);
let mochiTop = new Sprite("mochit", -9999, -9999, 256, 96, imgMochiTop, defaultAnime);
let daidai = new Sprite("daidai", -9999, -360, 256, 96, imgDaidai, defaultAnime);

// game variables
let gameScene = "countdown";
let score = 0;
let scoreDisplayX = 0;
let scoreDisplayY = 0;
let scoreDisplayAlpha = 1.0;
let accuracy = 0;
let accuracyDisplay = 0;
let accuracyDisplayY = 64;
let accuracyDisplaySize = 24;
let counter = 180;
let isGameEnd = false;

// get random integer (min ≤ r ≤ max)
let randInt = function (min, max) {
  let minInt = Math.ceil(min);
  let maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

//------------
// game scene
//------------

let sceneList = {
  // title
  "title": {
    "init": async () => {
      // drawing
      backgCtx.fillStyle = "#993300";
      backgCtx.fillRect(0, 0, backgLay.width, backgLay.height);
      // set transition animation
      setOverlayScene("transout");
      return 0;
    },
    "update": () => {
      // draw text
      drawTextCenter("かがみもち重ね", 32, "black", "#333333", 98, useriLay, useriCtx);
      drawTextCenter("かがみもち重ね", 32, "#ffffcc", "#333333", 96, useriLay, useriCtx);
      drawTextCenter("Zキーでスタート", 32, "black", "#333333", 322, useriLay, useriCtx);     
      drawTextCenter("Zキーでスタート", 32, "#ffffcc", "#333333", 320, useriLay, useriCtx);     
      if (sceneOverLay != "none") return;
      // press z key
      if (isKeyPressedNow("z")) {
        // start game
        setTransition("game");
      }
    }
  },
  // game
  "game" : {
    "init": async () => {
      // drawing
      backgCtx.fillStyle = "#993300";
      backgCtx.fillRect(0, 0, backgLay.width, backgLay.height);
      // reset variables
      sanpou.setParam(0, 0);
      sanpou.x = 192;
      sanpou.y = 400;
      mochiBottom.setParam(0, 0);
      mochiBottom.setParam(1, 0);
      mochiBottom.x = randInt(0, 640 - mochiBottom.w)
      mochiBottom.y = -300;
      mochiTop.setParam(0, 0);
      mochiTop.setParam(1, 0);
      mochiTop.x = randInt(0, 640 - mochiTop.w)
      mochiTop.y = -600;
      daidai.setParam(0, 0);
      daidai.setParam(1, 0);
      daidai.x = randInt(0, 640 - daidai.w)
      daidai.y = -900;
      counter = 180;
      accuracy = 0;
      accuracyDisplay = 0;
      accuracyDisplayY = 64;
      accuracyDisplaySize = 24;
      gameScene = "countdown";
      isGameEnd = false;
      // set transition animation
      setOverlayScene("transout");
      return 0;
    },
    "update": () => {
      if (gameScene === "countdown") {
        counter;
        drawTextCenter(Math.ceil(counter / 60), 48, "#black", "#333333", 212, useriLay, useriCtx);
        drawTextCenter(Math.ceil(counter / 60), 48, "#ffffcc", "#333333", 210, useriLay, useriCtx);
        if (--counter <= 0) {
          gameScene = "fall";
        }
      }
      else if (gameScene === "fall") {
        if (accuracyDisplay === accuracy && isGameEnd === true) {
          counter = 60;
          gameScene = "result";
        }
      }
      else if (gameScene === "result") {
        accuracyDisplayY = 64 + ((200 - 64) / 60) * (60 - counter);
        accuracyDisplaySize = 24 + ((64 - 24) / 60) * (60 - counter);
        if (--counter <= 0) {
          gameScene = "menu";
        }
      }
      else if (gameScene === "menu"){
        drawTextCenter("HAPPY NEW YEAR!!", 60, "#ffffcc", "#333333", 96, useriLay, useriCtx);
        drawTextCenter("[z] リトライ    [x] Xにポスト", 32, "#ffffcc", "#333333", 360, useriLay, useriCtx);
        if (isKeyPressedNow("z")) {
          setTransition("game");
        }
        else if (isKeyPressedNow("x")) {
          tweet();
        }
      }
      // move sanpou
      if (isKeyPressed("l")) {
        sanpou.dx -= 0.125;
      }
      else if (isKeyPressed("r")) {
        sanpou.dx += 0.125;
      }
      else if (sanpou.dx < 0){
        sanpou.dx += 0.125;
        if (sanpou.dx > 0) sanpou.dx = 0
      }
      else{
        sanpou.dx -= 0.125;
        if (sanpou.dx < 0) sanpou.dx = 0
      }
      if (sanpou.dx < -4) sanpou.dx = -4;
      if (sanpou.dx > 4) sanpou.dx = 4;
      sanpou.x += sanpou.dx;
      // move mochi(bottom)
      if (mochiBottom.getParam(1) === 0) {
        if (gameScene === "fall") mochiBottom.y += 2;
        if (mochiBottom.y > sanpou.y - mochiBottom.h) {
          mochiBottom.y = sanpou.y - mochiBottom.h;
          mochiBottom.setParam(1, 1);
          mochiBottom.setParam(0, (mochiBottom.x - sanpou.x));
          score = (10 - Math.floor(Math.abs(mochiBottom.getParam(0) / 25.6))) * 1000;
          if (score < 0) score = 0;
          accuracy += score;
          scoreDisplayAlpha = 1.0;
          scoreDisplayX = mochiBottom.x + 64;
          scoreDisplayY = mochiBottom.y + 64;
        }
      }
      else {
        mochiBottom.x = sanpou.x + mochiBottom.getParam(0);
      }
      // move mochi(top)
      if (mochiTop.getParam(1) === 0) {
        if (gameScene === "fall") mochiTop.y += 2;
        if (mochiTop.y > mochiBottom.y - mochiTop.h) {
          mochiTop.y = mochiBottom.y - mochiTop.h;
          mochiTop.setParam(1, 1);
          mochiTop.setParam(0, (mochiTop.x - mochiBottom.x));
          score = (10 - Math.floor(Math.abs(mochiTop.getParam(0) / 19.2))) * 100;
          if (score < 0) score = 0;
          accuracy += score;
          scoreDisplayAlpha = 1.0;
          scoreDisplayX = mochiTop.x + 64;
          scoreDisplayY = mochiTop.y + 64;
        }
      }
      else {
        mochiTop.x = mochiBottom.x + mochiTop.getParam(0);
      }
      // move daidai
      if (daidai.getParam(1) === 0) {
        if (gameScene === "fall") daidai.y += 2;
        if (daidai.y > mochiTop.y - daidai.h) {
          daidai.y = mochiTop.y - daidai.h;
          daidai.setParam(1, 1)
          daidai.setParam(0, (daidai.x - mochiTop.x));
          score = (100 - Math.floor(Math.abs(daidai.getParam(0) / 1))) * 1;
          if (score < 0) score = 0;
          accuracy += score;
          isGameEnd = true;
          scoreDisplayAlpha = 1.0;
          scoreDisplayX = daidai.x + 64;
          scoreDisplayY = daidai.y + 64;
        }
      }
      else {
        daidai.x = mochiTop.x + daidai.getParam(0);
      }
      // display score
      if (accuracyDisplay <= accuracy - 1000) accuracyDisplay += 500;
      else if (accuracyDisplay <= accuracy - 100) accuracyDisplay += 50;
      else if (accuracyDisplay < accuracy) accuracyDisplay += 1;
      if (accuracyDisplay > accuracy) accuracyDisplay = accuracy;
      drawTextCenter(accuracyDisplay + " 年", accuracyDisplaySize, "#99ffcc", "#333333", accuracyDisplayY, useriLay, useriCtx);
      let scoreDisplayFillStyle = "rgba(255, 255, 204, " + scoreDisplayAlpha + ")";
      let scoreDisplayStrokeStyle = "rgba(33, 33, 33, " + scoreDisplayAlpha + ")";
      scoreDisplayAlpha -= 0.02;
      scoreDisplayY -= 1;
      drawText("+" + score + " 年", 24, scoreDisplayFillStyle, scoreDisplayStrokeStyle, scoreDisplayX, scoreDisplayY, useriCtx);
      sanpou.drawShadow(charaCtx, sanpou.x + 4, sanpou.y + 4);
      mochiBottom.drawShadow(charaCtx, mochiBottom.x + 4, mochiBottom.y + 4);
      mochiTop.drawShadow(charaCtx, mochiTop.x + 4, mochiTop.y + 4);
      daidai.drawShadow(charaCtx, daidai.x + 4, daidai.y + 4);
      sanpou.drawAnime(charaCtx, sanpou.x, sanpou.y);
      mochiBottom.drawAnime(charaCtx, mochiBottom.x, mochiBottom.y);
      mochiTop.drawAnime(charaCtx, mochiTop.x, mochiTop.y);
      daidai.drawAnime(charaCtx, daidai.x, daidai.y);
      /*
      charaCtx.fillStyle = "green";
      charaCtx.fillRect(sanpou.x, sanpou.y, sanpou.w, sanpou.h);
      charaCtx.fillStyle = "white";
      charaCtx.fillRect(mochiBottom.x, mochiBottom.y, mochiBottom.w, mochiBottom.h);
      charaCtx.fillStyle = "white";
      charaCtx.fillRect(mochiTop.x, mochiTop.y, mochiTop.w, mochiTop.h);
      charaCtx.fillStyle = "orange";
      charaCtx.fillRect(daidai.x, daidai.y, daidai.w, daidai.h);
      */
    }
  }
};

//=======================//
//  Over Lay Scene List  //
//=======================//
let sceneOverLayList = {

  // sub scene: transin（トランジション開始）
  "transin": {
    init: () => {
      acceptKeyInput = false;
      transAnimeCount = transAnimeCountInit;
      return 0;
    },
    update: () => {
      transCtx.fillStyle = "#0d080d"; // black
      transCtx.beginPath();
      transCtx.moveTo(0, 0);
      for (let i = 0; i <= nokogiri; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) + 16 * (i % 2), i * (transLay.height / nokogiri));
      }
      transCtx.lineTo(0, transLay.height);
      transCtx.closePath();
      transCtx.fill();
      //transCtx.globalAlpha = 1.0;
      //transCtx.fillRect(640 * (transAnimeCount / transAnimeCountInit), 0, 640, 480);
      //transCtx.globalAlpha = 1.0 - (transAnimeCount / transAnimeCountInit);
      //transCtx.fillRect(0, 0, 640, 480);
      if (transAnimeCount-- === 0) {
        // change scene
        setScene(sceneAfterTrans);
      }
    }
  },

  // sub scene: transout（トランジション終了）
  "transout": {
    init: () => {
      acceptKeyInput = true;
      transAnimeCount = transAnimeCountInit;
      return 0;
    },
    update: () => {
      // update
      transCtx.fillStyle = "#0d080d"; // black
      transCtx.beginPath();
      transCtx.moveTo(transLay.width, 0);
      for (let i = 0; i <= nokogiri; i++) {
        transCtx.lineTo(transLay.width * ((transAnimeCountInit - transAnimeCount) / transAnimeCountInit) - 16 * (i % 2), i * (transLay.height / nokogiri));
      }
      transCtx.lineTo(transLay.width, transLay.height);
      transCtx.closePath();
      transCtx.fill();
      //transCtx.globalAlpha = transAnimeCount / transAnimeCountInit;
      //transCtx.fillRect(0, 0, 640 * (transAnimeCount / transAnimeCountInit), 480);
      if (transAnimeCount-- === 0) {
        // finish transition
        setOverlayScene("none");
      }
    }
  },

  // none（何もしない，でもこの処理は必要）
  "none": {
    init: () => {
      return 0;
    },
    update: () => { }
  }

};

//=====================//
//                     //
//  G A M E   L O O P  //
//                     //
//=====================//

let gameLoop = async () => {
  // reset canvas
  charaCtx.clearRect(0, 0, 640, 480);
  useriCtx.clearRect(0, 0, 640, 480);
  transCtx.clearRect(0, 0, 640, 480);
  // get key input
  keyPressedPrevious = keyPressed.slice(); // storage previous key input
  keyPressed = keyInput.slice();
  // in game
  // scene (over lay)
  if (overLayInitFlag) {
    overLayInitFlag = false;
    sceneOverLayList[sceneOverLay]["init"]();
  }
  sceneOverLayList[sceneOverLay]["update"]();
  // scene
  if (initFlag) {
    backgCtx.clearRect(0, 0, 640, 480);
    initFlag = false;
    nowLoading = await sceneList[scene]["init"]();
  }
  if (!nowLoading) {
    sceneList[scene]["update"]();
  }
  window.requestAnimationFrame(gameLoop);
};

//-----------------//
// Onload function //
//-----------------//
window.onload = () => {
  scene = "title";
  sceneOverLay = "none";
  initFlag = true;
  overLayInitFlag = true;
  nowLoading = true;
  // smoothing disabled
  imageSmoothing(backgCtx, false);
  imageSmoothing(charaCtx, false);
  imageSmoothing(useriCtx, true);
  imageSmoothing(transCtx, true);
  // create shadow sprite
  Object.keys(shadowList).forEach((key) => {
    shadowList[key][1].src = createShadowURL(shadowList[key][0]);
  });
  // draw button
  btnCtx.drawImage(buttonImage, 0, 0);
  // start game loop
  window.requestAnimationFrame(gameLoop);
  //setInterval(gameLoop, 1000 / 60); // 60fps
};
