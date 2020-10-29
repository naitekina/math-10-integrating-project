function setRandomIcon() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = './img/icon/item' + (264 + Math.floor(Math.random() * 24)) + '.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}

function story(mode) {
    $("#main-screen").fadeOut(500);
}

function startGame() {
    // $("#story").fadeOut(500);

    loadTextures();

    frameNum = 0;
    frameDrawer = setInterval(drawFrame, 1000 / FPS);
}

function stopGame() {
    clearInterval(frameDrawer);
}

// https://www.reddit.com/r/pokemonzetaomicron/comments/1xbnoi/black_white_texture_pack_updated/


function transitionValue(start, end, frame = frameNum, maxFrames = maxFrameNum) {
    return start + (frame / maxFrames) * (end - start);
}