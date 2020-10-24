var canvas = null;
var ctx = null;

var frameDrawer = null;

var numLoaded = 0;
var maxNumLoaded = 2;

var onLoadedFunction = function() {
    numLoaded++;
}

var textures = {
    battleFoeBox: null,
    battlePlayerBox: null
};

function loadTextures() {
    try {
        canvas = document.getElementById("game-top");
        ctx = canvas.getContext("2d");

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
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawOpponentInfo();
        drawPlayerInfo();
    } catch(error) {
        console.log(error);
    }
}

function drawOpponentInfo() {
    // background sprite
    ctx.drawImage(textures.battleFoeBox, -32, 32);

    // name

    // Lv.

    // level number

    // hp
}

function drawPlayerInfo() {
    // background sprite
    ctx.drawImage(textures.battlePlayerBox, canvas.width - 260, 192);

    // name

    // Lv.

    // level number

    // hp
}