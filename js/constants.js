const MODE = {
    LOADING: 0,
    BLACK: 1,
    DEFAULT: 2,
    BASE: 3,
    MAIN: 4,
    FIGHT: 5
};

const SEX = {
    MALE: 0,
    FEMALE: 2
};


const FONT_ALPHANUM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const FONT_ALPHANUM_SIZES = [
    10,10,10,10,10, 10,10,10, 6,10, 10,10,10,10,10, 10,10,10,10,10, 10,10,10,10,10, 10,
    10,10,10,10,10, 10,10,10, 6,10, 10, 8,10,10,10, 10,10,10,10,10, 10,10,10,10,10, 10,
    10, 8,10,10,10, 10,10,10,10,10
];
const FONT_LEVEL_CHARS = "0123456789";


const POSITIONS = {
    messageBar: {
        posB_Top: 100,
        height: 88,
        border: {
            height: 2
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