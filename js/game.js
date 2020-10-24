var canvas_top = null;
var ctx_top = null;
var canvas_bot = null;
var ctx_bot = null;

var frameDrawer = null;

var numLoaded = 0;
var maxNumLoaded = 6;



var CMODE = 0;
const MODE = {
    black: 0,
    default: 1,
    base: 2,
    main: 3,
    fight: 4
}



var onLoadedFunction = function() {
    numLoaded++;
}

var textures = {
    defaultBG: null,

    battleBGBase: null,
    battleBGMain: null,
    battleBGFight: null,

    battleFoeBox: null,
    battlePlayerBox: null
};

function loadTextures() {
    try {
        canvas_top = document.getElementById("game-top");
        ctx_top = canvas_top.getContext("2d");

        canvas_bot = document.getElementById("game-bot");
        ctx_bot = canvas_bot.getContext("2d");

        canvas_bot.addEventListener("click", function(e) {
            handleClick(e);
        });

        textures.defaultBG = new Image();
        textures.defaultBG.onload = onLoadedFunction;
        textures.defaultBG.src = "./img/game/defaultBG.png";

        textures.battleBGBase = new Image();
        textures.battleBGBase.onload = onLoadedFunction;
        textures.battleBGBase.src = "./img/game/battleBGBase.png";

        textures.battleBGFight = new Image();
        textures.battleBGFight.onload = onLoadedFunction;
        textures.battleBGFight.src = "./img/game/battleBGFight.png";

        textures.battleBGMain = new Image();
        textures.battleBGMain.onload = onLoadedFunction;
        textures.battleBGMain.src = "./img/game/battleBGMain.png";

        textures.battleFoeBox = new Image();
        textures.battleFoeBox.onload = onLoadedFunction;
        textures.battleFoeBox.src = "./img/game/battleFoeBoxD_noFade.png";

        textures.battlePlayerBox = new Image();
        textures.battlePlayerBox.onload = onLoadedFunction;
        textures.battlePlayerBox.src = "./img/game/battlePlayerBoxD_noFade.png";
    } catch(error) {
        console.log(error);
    }
}


function drawFrame() {
    try {
        if(numLoaded < maxNumLoaded) return;

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // clear = fill white
        ctx_top.fillStyle = "#ffffff";
        ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);

        ctx_bot.fillStyle = "#ffffff";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);

        drawOpponentInfo();
        drawPlayerInfo();

        drawBottomBackground();
    } catch(error) {
        console.log(error);
    }
}


function handleClick(e) {
    var x = e.pageX - (canvas_bot.offsetLeft + canvas_bot.clientLeft);
    var y = e.pageY - (canvas_bot.offsetTop + canvas_bot.clientTop);

    // alert("x:" + x + ", y:" + y + " || width:" + canvas_bot.offsetWidth + ", height:" + canvas_bot.offsetHeight);
}

function drawOpponentInfo() {
    // background sprite
    ctx_top.drawImage(textures.battleFoeBox, -32, 32);

    // name

    // Lv.

    // level number

    // hp
}

function drawPlayerInfo() {
    // background sprite
    ctx_top.drawImage(textures.battlePlayerBox, canvas_top.width - 260, 192);

    // name

    // Lv.

    // level number

    // hp
}

function drawBottomBackground() {
    if(CMODE == MODE.black) {
        ctx_bot.fillStyle = "#000000";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.default) {
        ctx_bot.drawImage(textures.defaultBG, 0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.base) {
        ctx_bot.drawImage(textures.battleBGBase, 0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.main) {
        ctx_bot.drawImage(textures.battleBGMain, 0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.fight) {
        ctx_bot.drawImage(textures.battleBGFight, 0, 0, canvas_bot.width, canvas_bot.height);
    }
}

function changeMode(m) {
    CMODE = m;
}