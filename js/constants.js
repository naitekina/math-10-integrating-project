const FPS = 30;

const DRAWMODE = {
    LOADING: {
        BASE: 0,
        IDLE: 0.1,
        TRANSITION_FADE: 0.2,
        IDLE_BLACK: 0.3,
    },

    STORY_HOOD_TP: {
        BASE: 10,
        TRANSITION_FADE: 10.1,
        IDLE_BLACK: 10.2
    },
    STORY_HOOD_SPOTLIGHT_1: {
        BASE: 11,
        LINE1: 11.1,
        LINE2: 11.2
    },
    STORY_FEATURE: {
        BASE: 12,
        LINE1: 12.1,
        LINE2: 12.2
    },
    STORY_HOOD_SPOTLIGHT_2: {
        BASE: 13,
        LINE1: 13.1,
        LINE2: 13.2
    },
    STORY_HUDDLE: 14,
    STORY_CRASH: 15,
    STORY_APPEAR: 16,

    BATTLE_VS: 20,
    BATTLE_DEFAULT: 21,
    BATTLE_MAIN: 22,
    BATTLE_FIGHT: 23,
    BATTLE_QUESTION: 24,
    BATTLE_FOCUS_PLAYER: 25,
    BATTLE_FOCUS_FOE: 26,

    POST_EPILOGUE: 30,
    POST_CREDITS: 31,
    POST_FINAL: 32
};

const SCRIPT = {
    STORY_HOOD_SPOTLIGHT_1: [
        "text1",
        "text2",
        "text3",
        "text4"
    ], STORY_FEATURE: [
        "text1",
        "text2",
        "text3",
        "text4"
    ]
};


const FONT_ALPHANUM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const FONT_ALPHANUM_SIZES = [
    10,10,10,10,10, 10,10,10, 6,10, 10,10,10,10,10, 10,10,10,10,10, 10,10,10,10,10, 10,
    10,10,10,10,10, 10,10,10, 6,10, 10, 8,10,10,10, 10,10,10,10,10, 10,10,10,10,10, 10,
    10, 8,10,10,10, 10,10,10,10,10
];
const FONT_LEVEL_CHARS = "0123456789";

const SEX = {
    MALE: 0,
    FEMALE: 2
};


const POSITIONS = {
    story: {
        hood_tp: {
            base: {
                posT: 224
            }, figure: {
                posT: 128
            }
        }
    }, overlayMessageBox: {
        text: {
            marginLR: 32,
            relPosT1: -4,
            relPosT2: 24
        }
    }, fightMessageBox: {
        posB_Top: 100,
        height: 88,
        border: {
            height: 2
        }, text: {
            marginLR: 16,
            relPosT1: -8,
            relPosT2: 24
        }
    }, battleFoeBox: {
        posL: 0,
        posT: 56,
        name: {
            relPosL: 24,
            relPosT: -4
        }, sex: {
            relPosL: 152,
            relPosT: -6
        }, level: {
            relPosL: 186,
            relPosT: -4
        }, hpBar: {
            relPosL: 88,
            // relPosR_L: 184,
            relPosT: 18,
            // relPosB_T: 22,
            w: 96,
            h: 4
        }
    }, battleFoeBase: {
        posR: -16,
        posT: 72,
        scale: 0.5
    }, battlePlayerBox: {
        posR: 0,
        posT: 200,
        name: {
            relPosL: 24,
            relPosT: -4
        }, level: {
            relPosL: 178,
            relPosT: -4
        }, hpBar: {
            relPosL: 112,
            relPosT: 18,
            w: 96,
            h: 4
        }, hpNum: {
            relPosT: 24,
            hp: {
                relPosL_End: 160
            }, total: {
                relPosL: 176
            }
        }, expBar: {
            relPosL: 64,
            relPosT: 46,
            w: 160,
            h: 2
        }
    }, battlePlayerBase: {
        posL: -104,
        posB: 224,
        scale: 1.25
    }
};

const GAMEDATA = {
    PLAYER: {
        NAME: "Group Four",
        LEVEL: 25,
        HPMAX: 300
    }, OPPONENT: {
        NAME: "Sir Calvin",
        LEVEL: 100,
        HPMAX: 1000
    }
};

const HPBARCOLOR = [
    ["#ffffff", "#b5b5b5"],
    ["#00ff4a", "#00bd21"],
    ["#eaff00", "#adbd00"],
    ["#ff0000", "#bd0000"]
];