/**
 * モジュールクラス
 */
export default class {
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
        let World = Matter.World;

        // スタートエリアを作成
        let redStartArea = this.CreateStartArea(80, 320, 120, 'start-area-red');
        let blueStartArea = this.CreateStartArea(1200, 320, 120, 'start-area-blue');

        // ストーンを作成
        let redStone = this.CreateStone(80, 320, 30, 'stone-red', '#FC6E51');
        let blueStone = this.CreateStone(1200, 320, 30, 'stone-blue', '#5D9CEC');

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
        if (Score_Red.isThrown && Score_Blue.isThrown && $('#message-red').text() == '') {
            if (Score_Red.score > Score_Blue.score) {
                $('#message-red').text('RED WINNER').css('color', '#FC6E51');
            } else if (Score_Red.score < Score_Blue.score) {
                $('#message-blue').text('BLUE WINNER').css('color', '#5D9CEC');
            } else {
                $('#message-red').text('DRAW').css('color', '#26C281');
                $('#message-blue').text('DRAW').css('color', '#26C281');
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

        let Bodies = Matter.Bodies;
        return Bodies.circle(window.innerWidth / 2, $('canvas').prop('height') / 2, radius, {

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