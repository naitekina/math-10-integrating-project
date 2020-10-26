var canvas_top = null;
var ctx_top = null;
var canvas_bot = null;
var ctx_bot = null;

var frameDrawer = null; // interval
var frameNum = 0;
var maxFrameNum = 0;
var keepTrackOfFrame = false;
var inTransition = false;

var CMODE = DRAWMODE.LOADING; // mode of the game
var NMODE = DRAWMODE.LOADING;

var textures = {
    defaultBG: null,

    battleBGBase: null,
    battleBGMain: null,
    battleBGFight: null,

    sex: null,
    battleFontAlphanum: null,
    battleFontHp: null,

    battleBG: null,
    battleBase: null,

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
        textures.defaultBG.src = "./img/game/bottom/defaultBG.png";


        textures.battleBGBase = new Image();
        textures.battleBGBase.onload = onLoadedFunction;
        textures.battleBGBase.src = "./img/game/bottom/battleBGBase.png";

        textures.battleBGFight = new Image();
        textures.battleBGFight.onload = onLoadedFunction;
        textures.battleBGFight.src = "./img/game/bottom/battleBGFight.png";

        textures.battleBGMain = new Image();
        textures.battleBGMain.onload = onLoadedFunction;
        textures.battleBGMain.src = "./img/game/bottom/battleBGMain.png";


        textures.sex = new Image();
        textures.sex.onload = onLoadedFunction;
        textures.sex.src = "./img/game/sex.png";

        textures.battleFontAlphanum = new Image();
        textures.battleFontAlphanum.onload = onLoadedFunction;
        textures.battleFontAlphanum.src = "./img/game/font/font_alphanum.png";

        textures.battleFontHp = new Image();
        textures.battleFontHp.onload = onLoadedFunction;
        textures.battleFontHp.src = "./img/game/font/font_hp.png";


        textures.battleBG = new Image();
        textures.battleBG.onload = onLoadedFunction;
        textures.battleBG.src = "./img/game/elite8_bg.png";

        textures.battleBase = new Image();
        textures.battleBase.onload = onLoadedFunction;
        textures.battleBase.src = "./img/game/elite8_base.png";


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


function handleEndTransition() {
    frameNum = 0;
    maxFrameNum = 0;
    keepTrackOfFrame = false;
    inTransition = false;

    console.log("end transition " + CMODE + " " + NMODE);

    if(CMODE == DRAWMODE.LOADING) {
        CMODE = NMODE;
        NMODE = DRAWMODE.STORY_HOOD_TP;
    } else {
        CMODE = NMODE;
    }
}

function drawFrame() {
    try {
        if(keepTrackOfFrame) {
            if(frameNum >= maxFrameNum) handleEndTransition();
            frameNum++;
        }

        // if(numLoaded < maxNumLoaded) return;

        // fill with black
        ctx_top.restore();
        ctx_top.fillStyle = "#000000";
        ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);

        ctx_bot.restore();
        ctx_bot.fillStyle = "#000000";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);

        
        if(CMODE == DRAWMODE.LOADING) {
            ctx_top.restore();
            ctx_top.fillStyle = "#ffffff";
            ctx_top.font = "48px Pixelade";
            ctx_top.textAlign = "center";
            ctx_top.fillText(
                "Loading.....",
                canvas_top.width / 2,
                canvas_top.height / 2 - 24);
            
            ctx_top.restore();
            ctx_top.fillStyle = "#ffffff";
            ctx_top.font = "48px Pixelade";
            ctx_top.textAlign = "center";
            ctx_top.fillText(
                numLoaded + "/" + maxNumLoaded + " (" + (Math.round(numLoaded / maxNumLoaded * 10000) / 100) + "%)",
                canvas_top.width / 2,
                canvas_top.height / 2 + 24);

            if(!inTransition && numLoaded >= maxNumLoaded) {
                frameNum = 1;
                maxFrameNum = 15;
                keepTrackOfFrame = true;
                inTransition = true;

                NMODE = DRAWMODE.BLACK;
            }
            
            if(inTransition) {
                ctx_top.restore();
                ctx_top.fillStyle = "rgba(0, 0, 0, " + transitionValue(0.0, 1.0, frameNum, maxFrameNum) + ")";
                ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);
            }
        } else if(CMODE == DRAWMODE.BLACK) {
            if(!inTransition) {
                frameNum = 1;
                maxFrameNum = 30;
                keepTrackOfFrame = true;
                inTransition = true;
            }
        } else if(CMODE == DRAWMODE.STORY_HOOD_TP) {
            ctx_top.restore();
            ctx_top.fillStyle = "#ffffff";
            ctx_top.font = "48px Pixelade";
            ctx_top.textAlign = "center";
            ctx_top.fillText("insert hooded figure", canvas_top.width / 2, canvas_top.height / 2);

            drawMessageBox("(t) You have been teleported to", "hello world", "center");
        }


        // drawBattleBG();

        // drawOpponentBase();
        // drawOpponentInfo();
        // drawPlayerBase();
        // drawPlayerInfo();

        // drawMessageBox();

        // drawBottomBackground();
    } catch(error) {
        console.log(error);
    }
}


function handleClick(e) {
    var x = e.pageX - (canvas_bot.offsetLeft + canvas_bot.clientLeft);
    var y = e.pageY - (canvas_bot.offsetTop + canvas_bot.clientTop) - ((canvas_bot.offsetHeight - (canvas_bot.offsetWidth / 4 * 3)) / 2);

    // alert("x:" + x + ", y:" + y + " || width:" + canvas_bot.offsetWidth + ", height:" + canvas_bot.offsetHeight);
}


function drawBattleBG() {
    ctx_top.restore();

    ctx_top.drawImage(textures.battleBG, 0, 0, canvas_top.width, canvas_top.height);
}

/*
* BASE
*/
function drawOpponentBase() {
    ctx_top.restore();

    ctx_top.drawImage(
        textures.battleBase,
        canvas_top.width - (textures.battleBase.width * POSITIONS.battleFoeBase.scale) - POSITIONS.battleFoeBase.posR,
        POSITIONS.battleFoeBase.posT,
        textures.battleBase.width * POSITIONS.battleFoeBase.scale,
        textures.battleBase.height * POSITIONS.battleFoeBase.scale);
}

function drawPlayerBase() {
    ctx_top.restore();

    ctx_top.drawImage(
        textures.battleBase,
        POSITIONS.battlePlayerBase.posL,
        canvas_top.height - POSITIONS.battlePlayerBase.posB,
        textures.battleBase.width * POSITIONS.battlePlayerBase.scale,
        textures.battleBase.height * POSITIONS.battlePlayerBase.scale);
}


/*
* INFO
*/
function drawOpponentInfo() {
    ctx_top.restore();

    // background sprite
    ctx_top.drawImage(textures.battleFoeBox, POSITIONS.battleFoeBox.posL, POSITIONS.battleFoeBox.posT);

    // name
    drawText(
        "Sir Calvin",
        POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.name.relPosL, 
        POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.name.relPosT);

    // sex
    drawSex(
        SEX.MALE,
        POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.sex.relPosL,
        POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.sex.relPosT);

    // level number
    drawText(
        "100",
        POSITIONS.battleFoeBox.posL + POSITIONS.battleFoeBox.level.relPosL,
        POSITIONS.battleFoeBox.posT + POSITIONS.battleFoeBox.level.relPosT);

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
    drawText(
        "Group Four",
        posX + POSITIONS.battlePlayerBox.name.relPosL,
        POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.name.relPosT);

    // level number
    drawText(
        "25",
        posX + POSITIONS.battlePlayerBox.level.relPosL,
        POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.level.relPosT);

    // hp bar
    ctx_top.fillStyle = "#00ff00";
    ctx_top.fillRect(posX + POSITIONS.battlePlayerBox.hpBar.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpBar.relPosT, POSITIONS.battlePlayerBox.hpBar.w, POSITIONS.battlePlayerBox.hpBar.h);

    // hp num
    drawText_HPNum(
        100,
        posX + POSITIONS.battlePlayerBox.hpNum.hp.relPosL_End,
        POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpNum.relPosT);
    drawText_HPTotal(
        100,
        posX + POSITIONS.battlePlayerBox.hpNum.total.relPosL,
        POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.hpNum.relPosT);

    // exp bar
    ctx_top.fillRect(posX + POSITIONS.battlePlayerBox.expBar.relPosL, POSITIONS.battlePlayerBox.posT + POSITIONS.battlePlayerBox.expBar.relPosT, POSITIONS.battlePlayerBox.expBar.w, POSITIONS.battlePlayerBox.expBar.h);
}


/*
* TEXT
*/
function drawText(text, x, canvasY) {
    var canvasX = x;

    for(var i = 0; i < text.length; i++) {
        var iA = FONT_ALPHANUM_CHARS.indexOf(text[i]);
        var iX = iA;
        var iY = 0;
        
        if(iX >= 26) {
            iX -= 26 * Math.floor(iA / 26);
            iY = Math.floor(iA / 26);
        }

        // char is 5x9, with space: 6x10;
        // char is 10x18, with space: 12x20
        if(iX == -1) {
            canvasX += 10;
            continue;
        }

        ctx_top.drawImage(textures.battleFontAlphanum, iX * 12, iY * 20, 10, 18, canvasX, canvasY, 10, 18);
        canvasX += FONT_ALPHANUM_SIZES[iA];
    }
}

function drawText_HPTotal(level, x, canvasY) {
    var text = level.toString();
    var canvasX = x;

    for(var i = 0; i < text.length; i++) {
        var iX = FONT_LEVEL_CHARS.indexOf(text[i]);

        // char is 16x16 with space
        if(iX == -1) continue;

        ctx_top.drawImage(textures.battleFontHp, iX * 16, 0, 16, 16, canvasX, canvasY, 16, 16);
        canvasX += 16;
    }
}

function drawText_HPNum(hp, x, canvasY) {
    var text = hp.toString();
    
    drawText_HPTotal(hp, x - (text.length * 16), canvasY);
}

function drawSex(s, canvasX, canvasY) {
    // texture is 14x20, 16x20 with space
    ctx_top.drawImage(textures.sex, s * 16, 0, 14, 20, canvasX, canvasY, 14, 20);
}



function drawMessageBox(text1, text2, textAlign = "left") {
    ctx_top.restore();

    // transparent background: black
    ctx_top.fillStyle = "rgba(0, 127, 0, 0.5)";
    ctx_top.fillRect(
        0,
        canvas_top.height - POSITIONS.messageBox.posB_Top,
        canvas_top.width,
        POSITIONS.messageBox.height);

    // transparent border
    if(CMODE == DRAWMODE.BATTLE_DEFAULT) {
        ctx_top.fillStyle = "rgba(127, 0, 0, 0.5)";
        ctx_top.fillRect(
            0,
            canvas_top.height - POSITIONS.messageBox.posB_Top - POSITIONS.messageBox.border.height,
            canvas_top.width,
            POSITIONS.messageBox.border.height);
        ctx_top.fillRect(
            0,
            canvas_top.height - POSITIONS.messageBox.posB_Top + POSITIONS.messageBox.height,
            canvas_top.width,
            POSITIONS.messageBox.border.height);
    }

    // text
    ctx_top.font = "32px PixelOperatorBold";
    ctx_top.fillStyle = "#ffffff";
    ctx_top.textAlign = textAlign;
    // todo
    ctx_top.fillText(
        text1,
        textAlign == "left" ? (POSITIONS.messageBox.text.marginLR) : ((textAlign == "right") ? (canvas_top.width - POSITIONS.messageBox.text.marginLR) : (canvas_top.width / 2)),
        canvas_top.height - POSITIONS.messageBox.posB_Top + (POSITIONS.messageBox.height / 2) - (POSITIONS.messageBox.text.marginMid / 2));
    ctx_top.fillText(
        text2,
        textAlign == "left" ? (POSITIONS.messageBox.text.marginLR) : ((textAlign == "right") ? (canvas_top.width - POSITIONS.messageBox.text.marginLR) : (canvas_top.width / 2)),
        canvas_top.height - POSITIONS.messageBox.posB_Top + (POSITIONS.messageBox.height / 2) + (POSITIONS.messageBox.text.marginMid / 2) + (POSITIONS.messageBox.text.size / 2));
}


function drawBottomBackground() {
    ctx_bot.restore();

    if(CMODE == DRAWMODE.BLACK) {
        ctx_bot.fillStyle = "#000000";
        ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == DRAWMODE.DEFAULT) {
        ctx_bot.drawImage(textures.defaultBG, 0, 0, canvas_bot.width, canvas_bot.height);
    } else if(CMODE == DRAWMODE.BASE) {
        ctx_bot.drawImage(textures.battleBGBase, 0, 0, canvas_bot.width, canvas_bot.height);
        drawTime();
    } else if(CMODE == DRAWMODE.MAIN) {
        ctx_bot.drawImage(textures.battleBGMain, 0, 0, canvas_bot.width, canvas_bot.height);
        drawTime();
    } else if(CMODE == DRAWMODE.FIGHT) {
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