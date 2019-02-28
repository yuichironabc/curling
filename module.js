/**
 * モジュールクラス
 */
export default class {

    constructor() {
        this.STONE_COLOR_RED = '#FC6E51';
        this.STONE_COLOR_BLUE = '#5D9CEC';
        this.DRAW_COLOR = '#26C281';

        // this.HOUSE_X = window.innerWidth / 2;
        // this.HOUSE_Y = $('canvas').prop('height') / 2;
    }
    /**
     * ランダムに色を取得する
     */
    GetRandomColor() {
        return "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
    }

    /**
     * ゲームを開始する。
     * @param {Matterのエンジン} engine 
     * @param {赤のスコア} Score_Red 
     * @param {青のスコア} Score_Blue 
     */
    StartGame(engine, Score_Red, Score_Blue) {

        const STONE_X_RED = 80;
        const STONE_X_BLUE = window.innerWidth - 80;
        const STONE_Y = window.innerHeight * 0.9 / 2;

        const START_AREA_RADIUS = 120;
        const STONE_RADIUS = 30;

        let World = Matter.World;

        // スタートエリアを作成
        let redStartArea = this.CreateStartArea(STONE_X_RED, STONE_Y, START_AREA_RADIUS, 'start-area-red');
        let blueStartArea = this.CreateStartArea(STONE_X_BLUE, STONE_Y, START_AREA_RADIUS, 'start-area-blue');

        // ストーンを作成
        let redStone = this.CreateStone(STONE_X_RED, STONE_Y, STONE_RADIUS, 'stone-red', this.STONE_COLOR_RED);
        let blueStone = this.CreateStone(STONE_X_BLUE, STONE_Y, STONE_RADIUS, 'stone-blue', this.STONE_COLOR_BLUE);

        // Matter.Body.applyForce(redStone, Matter.Vector.create(0, 0), Matter.Vector.create(0.03, 0.01));

        World.add(engine.world, [redStartArea, blueStartArea, redStone, blueStone]);

        // ストーンのスリープ開始イベントを設定
        this.SetSleepStartEvent(redStone, redStartArea, Score_Red, Score_Red, Score_Blue);
        this.SetSleepStartEvent(blueStone, blueStartArea, Score_Blue, Score_Red, Score_Blue);

        // スタートボタンを押せるのは一回だけ
        $('#startButton').prop('disabled', true);
    }

    /**
     * ストーンのスリープ開始イベントを設定する。
     * @param {イベントを設定するストーン} stone 
     * @param {ストーンに対応するスタートエリア} startArea 
     * @param {ストーンに対応するスコアオブジェクト} score 
     * @param {赤のスコアオブジェクト} score_Red
     * @param {青のスコアオブジェクト} score_Blue
     score_Red
     */
    SetSleepStartEvent(stone, startArea, score, score_Red, score_Blue) {
        Matter.Events.on(stone, "sleepStart", e => {
            let collisions = Matter.Query.collides(stone, [startArea]);
            if (collisions.length == 0) {
                score.isThrown = true;
                stone.isSleeping = false;
            }

            this.JudgeWinner(score_Red, score_Blue);
        });
    }

    /**
     * 勝敗を判定する。
     * @param {赤のスコアオブジェクト} Score_Red 
     * @param {青のスコアオブジェクト} Score_Blue 
     */
    JudgeWinner(Score_Red, Score_Blue) {
        if (Score_Red.isThrown && Score_Blue.isThrown && $('#message-red').text() == '' && $('#message-blue').text() == '') {
            if (Score_Red.score > Score_Blue.score) {
                $('#message-red').text('RED WINNER').css('color', this.STONE_COLOR_RED);
            } else if (Score_Red.score < Score_Blue.score) {
                $('#message-blue').text('BLUE WINNER').css('color', this.STONE_COLOR_BLUE);
            } else {
                $('#message-red').text('DRAW').css('color', this.DRAW_COLOR);
                $('#message-blue').text('DRAW').css('color', this.DRAW_COLOR);
            }
        }
    }

    /**
     * スタートエリア用の円を生成する。
     * @param {X位置} x 
     * @param {Y位置} y 
     * @param {半径} radius 
     * @param {ラベル} label 
     */
    CreateStartArea(x, y, radius, label) {
        return Matter.Bodies.circle(x, y, radius, {

            isSensor: true,
            isStatic: true,
            label: label,
            render: {
                fillStyle: "#FFFFFF"
            }
        });
    }

    /**
     * ストーンを生成する。
     * @param {X位置} x 
     * @param {Y位置} y 
     * @param {半径} radius 
     * @param {ラベル} label 
     * @param {色} color 
     */
    CreateStone(x, y, radius, label, color) {
        return Matter.Bodies.circle(x, y, radius, {

            isSleeping: true,
            label: label,
            render: {
                fillStyle: color
            }
        });
    }

    /**
     * カーリングのハウスを生成する。
     * @param {ハウスの半径} radius 
     * @param {ハウスに付ける内部的な名称} label 
     */
    CreateHouse(radius, label, color) {

        let x = window.innerWidth / 2;
        let y = $('canvas').prop('height') / 2;
        return Matter.Bodies.circle(x, y, radius, {

            isSleeping: false,
            isSensor: true,
            isStatic: true,
            label: label,
            render: {
                fillStyle: color
            }
        });
    }
}