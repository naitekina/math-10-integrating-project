var canvas_top = null;
var ctx_top = null;
var canvas_bot = null;
var ctx_bot = null;

var frameDrawer = null; // interval
var frameNum = 0;
var maxFrameNum = 0;
var keepTrackOfFrame = false;
var isIdle = false;
var inTransition = false;
var charIndex = 0; // per char, index in array
var lineIndex = 0; // per line

var CMODE = DRAWMODE.BATTLE_DEFAULT; // mode of the game
var NMODE = -1;

var GAME = {
    player: {
        hp: Math.floor(Math.random() * 300),
        exp: Math.random()
    }, opponent: {
        hp: Math.floor(Math.random() * 1000)
    }
}


var textures = {
    introBG: null,
    introBase: null,
    overlayMessageBox: null,

    hoodedFigure: null,

    defaultBG: null,

    battleBGBase: null,
    battleBGMain: null,
    battleBGFight: null,

    battle_players: null,
    battle_sir: null,

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


        textures.introBG = new Image();
        textures.introBG.onload = onLoadedFunction;
        textures.introBG.src = "./img/game/intro_bg_bw.png";

        textures.introBase = new Image();
        textures.introBase.onload = onLoadedFunction;
        textures.introBase.src = "./img/game/intro_base_bw.png";

        textures.overlayMessageBox = new Image();
        textures.overlayMessageBox.onload = onLoadedFunction;
        textures.overlayMessageBox.src = "./img/game/overlay_message.png";


        textures.hoodedFigure = new Image();
        textures.hoodedFigure.onload = onLoadedFunction;
        textures.hoodedFigure.src = "./img/game/people/story_hoodedFigure.png";


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


        textures.battle_players = new Image();
        textures.battle_players.onload = onLoadedFunction;
        textures.battle_players.src = "./img/game/people/battle_players.png";

        textures.battle_sir = new Image();
        textures.battle_sir.onload = onLoadedFunction;
        textures.battle_sir.src = "./img/game/people/battle_sir.png";


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

    if(CMODE == DRAWMODE.LOADING.BASE) {
        CMODE = NMODE; // IDLE
        NMODE = DRAWMODE.LOADING.TRANSITION_FADE;
        setTrackFrame(2.0 * FPS);
    } else if(CMODE == DRAWMODE.LOADING.IDLE) {
        CMODE = NMODE; // TRANSITION_FADE
        NMODE = DRAWMODE.LOADING.IDLE_BLACK;
        setTrackFrame(0.5 * FPS);
    } else if(CMODE == DRAWMODE.LOADING.TRANSITION_FADE) {
        CMODE = NMODE; // IDLE_BLACK
        NMODE = DRAWMODE.STORY_HOOD_TP.BASE;
        setTrackFrame(1.0 * FPS);
    } else if(CMODE == DRAWMODE.LOADING.IDLE_BLACK) {
        CMODE = NMODE; // STORY_HOOD_TP
        NMODE = DRAWMODE.STORY_HOOD_TP.TRANSITION_FADE;
        setTrackFrame(2.0 * FPS);
    } else if(CMODE == DRAWMODE.STORY_HOOD_TP.BASE) {
        CMODE = NMODE; // TRANSITION_FADE
        NMODE = DRAWMODE.STORY_HOOD_TP.IDLE_BLACK;
        setTrackFrame(0.5 * FPS);
    } else if(CMODE == DRAWMODE.STORY_HOOD_TP.TRANSITION_FADE) {
        CMODE = NMODE; // IDLE_BLACK
        NMODE = DRAWMODE.STORY_HOOD_SPOTLIGHT_1.BASE;
        setTrackFrame(1.0 * FPS);
    } else if(CMODE == DRAWMODE.STORY_HOOD_TP.IDLE_BLACK) {
        CMODE = NMODE; // STORY SPOTLIGHT 1
        setTrackFrame(1.0 * FPS);
    } else {
        CMODE = NMODE;
    }
}

function setTrackFrame(max, next = null) {
    frameNum = 1;
    maxFrameNum = max;
    keepTrackOfFrame = true;
    if(next != null)
        NMODE = next;
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


        var BASEMODE = Math.floor(CMODE);
        
        if(BASEMODE == DRAWMODE.LOADING.BASE) {
            if(CMODE != DRAWMODE.LOADING.IDLE_BLACK) {
                // loading... text
                ctx_top.restore();
                ctx_top.fillStyle = "#ffffff";
                ctx_top.font = "48px Pixelade";
                ctx_top.textAlign = "center";
                ctx_top.fillText(
                    "Loading.....",
                    canvas_top.width / 2,
                    canvas_top.height / 2 - 24);
                
                // number and percentage
                ctx_top.restore();
                ctx_top.fillStyle = "#ffffff";
                ctx_top.font = "48px Pixelade";
                ctx_top.textAlign = "center";
                ctx_top.fillText(
                    numLoaded + "/" + maxNumLoaded + " (" + (Math.round(numLoaded / maxNumLoaded * 10000) / 100) + "%)",
                    canvas_top.width / 2,
                    canvas_top.height / 2 + 24);
            }

            if(CMODE == DRAWMODE.LOADING.BASE && numLoaded >= maxNumLoaded) {
                setTrackFrame(1.0 * FPS);

                CMODE = DRAWMODE.LOADING.IDLE;
                NMODE = DRAWMODE.LOADING.TRANSITION_FADE;
            }
            
            if(CMODE == DRAWMODE.LOADING.TRANSITION_FADE) {
                ctx_top.restore();
                ctx_top.fillStyle = "rgba(0,0,0," + transitionValue(0.0, 1.0, frameNum, maxFrameNum) + ")";
                ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);
            }
        } else if(BASEMODE == DRAWMODE.STORY_HOOD_TP.BASE) {
            ctx_top.restore();

            if(CMODE != DRAWMODE.STORY_HOOD_TP.IDLE_BLACK) {
                // hooded figure
                ctx_top.fillStyle = "#ffffff";
                ctx_top.font = "48px Pixelade";
                ctx_top.textAlign = "center";
                ctx_top.fillText("insert hooded figure", canvas_top.width / 2, canvas_top.height / 2);
                
                // circular gradient
                var cgrad = ctx_top.createRadialGradient(canvas_top.width / 2, canvas_top.height / 5 * 3, 32, canvas_top.width / 2, canvas_top.height / 5 * 3, canvas_top.width / 2);
                cgrad.addColorStop(0, "rgba(0,0,0,0.0)");
                cgrad.addColorStop(1, "rgba(0,0,0,1.0)");
                
                ctx_top.fillStyle = cgrad;
                ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);

                // message box
                drawOverlayMessageBox("text 1", "text 2", "center", "#ffffff", "rgba(127,127,127,0.5)");
            }

            if(CMODE == DRAWMODE.STORY_HOOD_TP.TRANSITION_FADE) {
                ctx_top.restore();
                ctx_top.fillStyle = "rgba(0,0,0," + transitionValue(0.0, 1.0, frameNum, maxFrameNum) + ")";
                ctx_top.fillRect(0, 0, canvas_top.width, canvas_top.height);
            }
        } else if(BASEMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.BASE || BASEMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_2.BASE) {
            ctx_top.restore();
            ctx_top.fillStyle = "#ffffff";
            ctx_top.fillRect(0,0,canvas_top.width,canvas_top.height);

            // bg
            ctx_top.drawImage(textures.introBG, 0, 0, canvas_top.width, canvas_top.height);

            // base
            ctx_top.drawImage(
                textures.introBase,
                (canvas_top.width / 2) - (textures.introBase.width / 2),
                POSITIONS.story.hood_tp.base.posT);

            // hooded figure
            ctx_top.drawImage(
                textures.hoodedFigure,
                (canvas_top.width / 2) - (textures.hoodedFigure.width / 2),
                POSITIONS.story.hood_tp.figure.posT);

            // bottom screen
            ctx_bot.restore();
            ctx_bot.fillStyle = "#6a6a6a";
            ctx_bot.fillRect(0, 0, canvas_bot.width, canvas_bot.height);

            // press anywhere
            if(CMODE != DRAWMODE.STORY_HOOD_SPOTLIGHT_1.BASE || CMODE != DRAWMODE.STORY_HOOD_SPOTLIGHT_2.BASE) {
                drawText_anywhere();

                // ctx_bot.restore();
                // ctx_bot.fillStyle = "#ffffff";
                // ctx_bot.font = "32px PixelOperatorBold";
                // ctx_bot.textAlign = "center";
                // ctx_bot.fillText("Press anywhere here to continue.", canvas_bot.width / 2, canvas_bot.height / 2);
            }


            if(!keepTrackOfFrame && CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.BASE)
                setTrackFrame(2.0 * FPS, DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE1);

            // overlay message
            if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE1)
                drawOverlayMessageBox("text1", "text2");
            else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE2)
                drawOverlayMessageBox("text3", "text4");
            
            else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE1)
                drawOverlayMessageBox("text1", "text2");
            else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE2)
                drawOverlayMessageBox("text3", "text4");
        } else if(BASEMODE == DRAWMODE.STORY_FEATURE.BASE) {
            // figure
            drawText_dev("insert sir calvin");

            // bottom screen

            // press anywhere
            drawText_anywhere();

            // overlay mesage
            if(CMODE == DRAWMODE.STORY_FEATURE.BASE)
                drawFightMessageBox("Calvin Sia", "text2", "center", "white", "rgba(255,255,255,0.3)");
            else if(CMODE == DRAWMODE.STORY_FEATURE.LINE1)
                drawFightMessageBox("text1", "text2", "left", "white", "rgba(255,255,255,0.3)");
            else if(CMODE == DRAWMODE.STORY_FEATURE.LINE2)
                drawFightMessageBox("text3", "text4", "left", "white", "rgba(255,255,255,0.3)");
        } else if(CMODE == DRAWMODE.STORY_HUDDLE) {
            // figure
            drawText_dev("insert huddle");
            
            // press anywhere
            drawText_anywhere();
            
            // overlay message
            drawFightMessageBox("text1", "text2", "center", "white", "rgba(255,255,255,0.3)");
        } else if(CMODE == DRAWMODE.STORY_CRASH) {
            // figure
            drawText_dev("insert crash");

            // press anywhere
            drawText_anywhere();

            // overlay message
            drawFightMessageBox("text1", "text2", "center", "white", "rgba(255,255,255,0.3)")
        } else if(CMODE == DRAWMODE.STORY_APPEAR) {
            // figure
            drawText_dev("insert appear");

            // press anywhere
            drawText_anywhere();

            // overlay message
            drawFightMessageBox("text1", "text2", "center", "white", "rgba(255,255,255,0.3)")
        } else if(CMODE == DRAWMODE.BATTLE_VS) {
            // dev
            drawText_dev("dev todo");
        } else if(BASEMODE >= DRAWMODE.BATTLE_DEFAULT && BASEMODE <= DRAWMODE.BATTLE_FOCUS_FOE) {
            // background
            ctx_top.restore();
            ctx_top.drawImage(textures.battleBG, 0, 0, canvas_top.width, canvas_top.height);

            // opponent
            drawOpponentBase();
            // opponent info
            drawOpponentInfo();

            // player
            drawPlayerBase();
            // player info
            drawPlayerInfo();


            // bottom screen
            ctx_bot.restore();
            if(CMODE == DRAWMODE.BATTLE_DEFAULT)
                ctx_bot.drawImage(textures.battleBGBase, 0, 0, canvas_bot.width, canvas_bot.height);
            else if(CMODE == DRAWMODE.BATTLE_MAIN)
                ctx_bot.drawImage(textures.battleBGMain, 0, 0, canvas_bot.width, canvas_bot.height);
            else if(CMODE == DRAWMODE.BATTLE_FIGHT)
                ctx_bot.drawImage(textures.battleBGFight, 0, 0, canvas_bot.width, canvas_bot.height);
            
            // time
            drawTime();
        }

        // drawMessageBox();

        // drawBottomBackground();
    } catch(error) {
        console.log(error);
    }
}


function handleClick(e) {
    var x = e.pageX - (canvas_bot.offsetLeft + canvas_bot.clientLeft);
    var y = e.pageY - (canvas_bot.offsetTop + canvas_bot.clientTop) - ((canvas_bot.offsetHeight - (canvas_bot.offsetWidth / 4 * 3)) / 2);

    if(x < 0 || x > canvas_bot.offsetWidth || y < 0 || y > canvas_bot.offsetWidth / 4 * 3) return;

    if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE1)
        CMODE = DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE2;
    else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_1.LINE2)
        CMODE = DRAWMODE.STORY_FEATURE.BASE;
    else if(CMODE == DRAWMODE.STORY_FEATURE.BASE)
        CMODE = DRAWMODE.STORY_FEATURE.LINE1;
    else if(CMODE == DRAWMODE.STORY_FEATURE.LINE1)
        CMODE = DRAWMODE.STORY_FEATURE.LINE2;
    else if(CMODE == DRAWMODE.STORY_FEATURE.LINE2)
        CMODE = DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE1;
    else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE1)
        CMODE = DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE2;
    else if(CMODE == DRAWMODE.STORY_HOOD_SPOTLIGHT_2.LINE2)
        CMODE = DRAWMODE.STORY_HUDDLE;
    else if(CMODE == DRAWMODE.STORY_HUDDLE)
        CMODE = DRAWMODE.STORY_CRASH;
    else if(CMODE == DRAWMODE.STORY_CRASH)
        CMODE = DRAWMODE.STORY_APPEAR;
    else if(CMODE == DRAWMODE.STORY_APPEAR)
        CMODE = DRAWMODE.BATTLE_VS;
}


function changeMode(m) {
    CMODE = m;
}