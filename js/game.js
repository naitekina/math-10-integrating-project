var canvas_top = null;
var ctx_top = null;
var canvas_bot = null;
var ctx_bot = null;

var frameDrawer = null; // interval

var CMODE = 0; // mode of the game

var textures = {
    defaultBG: null,

    battleBGBase: null,
    battleBGMain: null,
    battleBGFight: null,

    sex: null,
    battleFontName: null,
    battleFontLevel: null,

    battleFoeBox: null,
    battlePlayerBox: null
};

var onLoadedFunction = function() {
    numLoaded++;
};
var numLoaded = 0;
var maxNumLoaded = Object.keys(textures).length;
function loaded() { return numLoaded + "/" + maxNumLoaded; }



function loadTextures() {
    try {
        canvas_top = document.getElementById("game-top");
        ctx_top = canvas_top.getContext("2d");
        ctx_top.save();

        canvas_bot = document.getElementById("game-bot");
        ctx_bot = canvas_bot.getContext("2d");
        ctx_top.save();

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


        textures.sex = new Image();
        textures.sex.onload = onLoadedFunction;
        textures.sex.src = "./img/game/sex.png";

        textures.battleFontName = new Image();
        textures.battleFontName.onload = onLoadedFunction;
        textures.battleFontName.src = "./img/game/font_name.png";

        textures.battleFontLevel = new Image();
        textures.battleFontLevel.onload = onLoadedFunction;
        textures.battleFontLevel.src = "./img/game/font_level.png";


        textures.battleFoeBox = new Image();
        textures.battleFoeBox.onload = onLoadedFunction;
        textures.battleFoeBox.src = "./img/game/battleFoeBox.png";

        textures.battlePlayerBox = new Image();
        textures.battlePlayerBox.onload = onLoadedFunction;
        textures.battlePlayerBox.src = "./img/game/battlePlayerBox.png";
    } catch(error) {
        console.log(error);
    }
}


function drawFrame() {
    try {
        if(numLoaded < maxNumLoaded) return;

        // fill with white
        ctx_top.restore();
        ctx_top.fillStyle = "#ffffff";
        ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);

        ctx_bot.restore();
        ctx_bot.fillStyle = "#ffffff";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);


        drawOpponentInfo();
        drawPlayerInfo();

        drawMessageBar();

        drawBottomBackground();
    } catch(error) {
        console.log(error);
    }
}


function handleClick(e) {
    var x = e.pageX - (canvas_bot.offsetLeft + canvas_bot.clientLeft);
    var y = e.pageY - (canvas_bot.offsetTop + canvas_bot.clientTop) - ((canvas_bot.offsetHeight - (canvas_bot.offsetWidth / 4 * 3)) / 2);

    alert("x:" + x + ", y:" + y + " || width:" + canvas_bot.offsetWidth + ", height:" + canvas_bot.offsetHeight);
}

function drawOpponentInfo() {
    ctx_top.restore();

    // background sprite
    ctx_top.drawImage(textures.battleFoeBox, POSITIONS.battleFoeBox.posL, POSITIONS.battleFoeBox.posT);

    // name
    drawText_Name("Sir Calvin", POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.name.relPosL, POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.name.relPosT);

    // sex
    drawSex(SEX.MALE, POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.sex.relPosL, POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.sex.relPosT);

    // level number
    drawText_Num(100, POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.level.relPosL, POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.level.relPosT);

    // hp bar
    ctx_top.fillStyle = "#00ff00";
    ctx_top.fillRect(POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.hpBar.relPosL, POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.hpBar.relPosT, POSITIONS.battleFoeBox.hpBar.w, POSITIONS.battleFoeBox.hpBar.h);
    // drawHPBarFill();
}

function drawPlayerInfo() {
    ctx_top.restore();

    var posX = canvas_top.width - POSITIONS.battlePlayerBox.posR - textures.battlePlayerBox.width;

    // background sprite
    ctx_top.drawImage(textures.battlePlayerBox, posX, POSITIONS.battlePlayerBox.posT);

    // name
    drawText_Name("Group Four", posX + POSITIONS.battlePlayerBox.name.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.name.relPosT);

    // level number
    drawText_Num(25, posX + POSITIONS.battlePlayerBox.level.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.level.relPosT);

    // hp bar
    ctx_top.fillStyle = "#00ff00";
    ctx_top.fillRect(posX + POSITIONS.battlePlayerBox.hpBar.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpBar.relPosT, POSITIONS.battlePlayerBox.hpBar.w, POSITIONS.battlePlayerBox.hpBar.h);

    // hp num
    drawText_HPNum(100, posX + POSITIONS.battlePlayerBox.hpNum.hp.relPosL_End, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpNum.relPosT);
    drawText_Num(100, posX + POSITIONS.battlePlayerBox.hpNum.total.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpNum.relPosT);

    // exp bar
    ctx_top.fillRect(posX + POSITIONS.battlePlayerBox.expBar.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.expBar.relPosT, POSITIONS.battlePlayerBox.expBar.w, POSITIONS.battlePlayerBox.expBar.h);
}

function drawText_Name(text, x, canvasY) {
    var canvasX = x;

    for(var i = 0; i < text.length; i++) {
        var iX = FONT_NAME_CHARS.indexOf(text[i]);
        var iY = 0;
        
        if(iX >= 26) {
            iX -= 26;
            iY = 1;
        }

        // char is 5x9, with space: 6x10;
        // char is 10x18, with space: 12x20
        if(iX == -1) {
            canvasX += 10;
            continue;
        }

        ctx_top.drawImage(textures.battleFontName, iX * 12, iY * 20, 10, 18, canvasX, canvasY, 10, 18);
        canvasX += 10;
    }
}

function drawText_Num(level, x, canvasY) {
    var text = level.toString();
    var canvasX = x;

    for(var i = 0; i < text.length; i++) {
        var iX = FONT_LEVEL_CHARS.indexOf(text[i]);

        // char is 16x16 with space
        if(iX == -1) continue;

        ctx_top.drawImage(textures.battleFontLevel, iX * 16, 0, 16, 16, canvasX, canvasY, 16, 16);
        canvasX += 16;
    }
}

function drawText_HPNum(hp, x, canvasY) {
    var text = hp.toString();
    
    drawText_Num(hp, x - (text.length * 16), canvasY);
}

function drawSex(s, canvasX, canvasY) {
    // texture is 16x20 with space
    // texture is 14x20
    ctx_top.drawImage(textures.sex, s * 16, 0, 14, 20, canvasX, canvasY, 14, 20);
}

function drawMessageBar() {
    ctx_top.restore();

    // transparent background black
    ctx_top.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx_top.fillRect(0, canvas_top.height - 100, canvas_top.width, 80);

    // transparent border red
    ctx_top.fillStyle = "rgba(127, 0, 0, 0.5)";
    ctx_top.fillRect(0, canvas_top.height - 100 - 2, canvas_top.width, 2);
    ctx_top.fillRect(0, canvas_top.height - 100 + 80, canvas_top.width, 2);

    // text
    ctx_top.font = "32px PixelOperatorBold";
    ctx_top.fillStyle = "#ffffff";
    var message = "What will you do?";
    ctx_top.fillText(message, 16, canvas_top.height - 100 + 32);
}

function drawBottomBackground() {
    ctx_bot.restore();

    if(CMODE == MODE.BLACK) {
        ctx_bot.fillStyle = "#000000";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.DEFAULT) {
        ctx_bot.drawImage(textures.defaultBG, 0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == MODE.BASE) {
        ctx_bot.drawImage(textures.battleBGBase, 0, 0, canvas_bot.width, canvas_bot.height);
        drawTime();
    } else if(CMODE == MODE.MAIN) {
        ctx_bot.drawImage(textures.battleBGMain, 0, 0, canvas_bot.width, canvas_bot.height);
        drawTime();
    } else if(CMODE == MODE.FIGHT) {
        ctx_bot.drawImage(textures.battleBGFight, 0, 0, canvas_bot.width, canvas_bot.height);
        drawTime();
    }
}

function drawTime() {
    var d = new Date();
    var H = d.getHours();
    var M = d.getMinutes();

    ctx_bot.restore();
    
}

function changeMode(m) {
    CMODE = m;
}