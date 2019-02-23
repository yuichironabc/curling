export default class {
    constructor(teamName, score) {
        this.teamName = teamName;
        this.score = score;
        this.isThrown = false;
    }

    ScoreUp() {
        this.score += 30;
    }

    ScoreDown() {
        this.score -= 30;
    }
}