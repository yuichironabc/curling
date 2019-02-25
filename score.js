/**
 * スコア管理用クラス
 */
export default class {
    constructor(teamName, score) {
        this.teamName = teamName;
        this.score = score;
        this.isThrown = false;
    }

    /**
     * 加点する。
     */
    ScoreUp() {
        this.score += 30;
    }

    /**
     * 減点する。
     */
    ScoreDown() {
        this.score -= 30;
    }
}