/**
 * 定数定義クラス
 */
export default class {
    /**
     * Matter領域の横幅
     */
    static get MATTER_FIELD_WIDTH() {
        return window.innerWidth;
    }

    /**
     * Matter領域の縦幅
     */
    static get MATTER_FIELD_HEIGHT() {
        return window.innerHeight * 0.9;
    }

    /**
     * ハウス大の半径
     */
    static get HOUSE_RADIUS_BIG() {
        return this.MATTER_FIELD_HEIGHT * 0.45;
    }

    /**
     * ハウス中の半径
     */
    static get HOUSE_RADIUS_MIDDLE() {
        return this.MATTER_FIELD_HEIGHT * 0.25;
    }

    /**
     * ハウス小の半径
     */
    static get HOUSE_RADIUS_SMALL() {
        return this.MATTER_FIELD_HEIGHT * 0.08;
    }

    /**
     * 赤ストーンのX位置
     */
    static get STONE_X_RED() {
        return 80;
    }

    /**
     * 青ストーンのX位置
     */
    static get STONE_X_BLUE() {
        return window.innerWidth - 80;
    }

    /**
     * ストーンのY位置
     */
    static get STONE_Y() {
        return this.MATTER_FIELD_HEIGHT / 2;
    }

    /**
     * スタートエリアの半径
     */
    static get START_AREA_RADIUS() {
        return 120;
    }

    /**
     * ストーンの半径
     */
    static get STONE_RADIUS() {
        return this.HOUSE_RADIUS_SMALL * 0.6;
    }

    /**
     * 赤ストーンの色
     */
    static get STONE_COLOR_RED() {
        return '#FC6E51';
    }

    /**
     * 青ストーンの色
     */
    static get STONE_COLOR_BLUE() {
        return '#5D9CEC';
    }

    /**
     * ドローメッセージの色
     */
    static get DRAW_COLOR() {
        return '#26C281';
    }
}