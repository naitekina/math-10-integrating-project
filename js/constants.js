const FPS = 30;

const DRAWMODE = {
    LOADING: 0,
    BLACK: 1,

    STORY_HOOD_TP: 10,
    STORY_HOOD_FADE: 11,
    STORY_HOOD_SPOTLIGHT_1: 12,
    STORY_FEATURE: 13,
    STORY_HOOD_SPOTLIGHT_2: 14,
    STORY_HUDDLE: 15,
    STORY_CRASH: 16,
    STORY_APPEAR: 17,

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

const HPBARCOLOR = [
    ["#ffffff", "#b5b5b5"],
    ["#00ff4a", "#00bd21"],
    ["#eaff00", "#adbd00"],
    ["#ff0000", "#bd0000"]
];