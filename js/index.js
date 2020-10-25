function story(mode) {
    $("#main-screen").fadeOut(500);
}

function startGame() {
    // $("#story").fadeOut(500);

    loadTextures();

    frameDrawer = setInterval(drawFrame, 1000 / 30);
}

function stopGame() {
    clearInterval(frameDrawer);
}

// https://www.reddit.com/r/pokemonzetaomicron/comments/1xbnoi/black_white_texture_pack_updated/
