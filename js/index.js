function story(mode) {
    $("#main-screen").fadeOut(500);

    if(mode == 0) { // play as professor
        $("#story-0").css("visibility", "visible");
        $("#story-1").css("visibility", "none")
    } else { // play as students
        $("#story-0").css("visibility", "none");
        $("#story-1").css("visibility", "visible");
    }
}

function startGame() {
    $("#story").fadeOut(500);
}