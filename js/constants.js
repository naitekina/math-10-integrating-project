const MODE = {
    BLACK: 0,
    DEFAULT: 1,
    BASE: 2,
    MAIN: 3,
    FIGHT: 4
};

const SEX = {
    MALE: 0,
    FEMALE: 2
};


const FONT_NAME_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const FONT_LEVEL_CHARS = "0123456789";


const POSITIONS = {
    battleFoeBox: {
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
            relPosT: -2
        }, hpBar: {
            relPosL: 88,
            // relPosR_L: 184,
            relPosT: 18,
            // relPosB_T: 22,
            w: 96,
            h: 4
        }
    }, battlePlayerBox: {
        posR: 0,
        posT: 200,
        name: {
            // 14 base
            relPosL: 24,
            relPosT: -4
        }, level: {
            relPosL: 178,
            relPosT: -2
        }, hpBar: {
            relPosL: 112,
            relPosT: 18,
            w: 96,
            h: 4
        }, hpNum: {
            relPosT: 24, //26-38
            hp: {
                relPosL_End: 160 // minus
            }, total: {
                relPosL: 176 // add
            }
        }, expBar: {
            relPosL: 64,
            relPosT: 46,
            w: 160,
            h: 2
        }
    }
};