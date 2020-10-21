function story(mode) {
    $("#main-screen").fadeOut(500);

    if(mode == 0) { // play as professor
        $("#story-0").css("display", "visible");
        $("#story-1").css("display", "none");
    } else { // play as students
        $("#story-0").css("display", "none");
        $("#story-1").css("display", "visible");
    }
}

function startGame() {
    $("#story").fadeOut(500);
}