export default class {
    /**
     * ランダムに色を取得する
     */
    GetRandomColor() {
        return "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
    }

    /**
     * ゲームを開始する
     */
    StartGame(engine, Score_Red, Score_Blue) {
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Events = Matter.Events;
        let Query = Matter.Query;

        // 赤のスタートエリアを作成
        let redStartArea = Bodies.circle(80, 320, 120, {

            isSensor: true,
            isStatic: true,
            label: 'start-area-red',
            render: {
                fillStyle: "#FFFFFF"
            }
        });
        World.add(engine.world, redStartArea);
        // 青のスタートエリアを作成
        let blueStartArea = Bodies.circle(1200, 320, 120, {

            isSensor: true,
            isStatic: true,
            label: 'start-area-blue',
            render: {
                fillStyle: "#FFFFFF"
            }
        });
        World.add(engine.world, blueStartArea);

        // 赤のストーンを作成
        let redStone = Bodies.circle(80, 320, 30, {

            isSleeping: true,
            label: 'stone-red',
            render: {
                fillStyle: "#FC6E51"
            }
        });
        World.add(engine.world, redStone);

        // Matter.Body.applyForce(redStone, Matter.Vector.create(0, 0), Matter.Vector.create(0.03, 0.01));

        // 青のストーンを作成
        let blueStone = Bodies.circle(1200, 320, 30, {

            label: 'stone-blue',
            render: {
                fillStyle: "#5D9CEC"
            }
        });
        World.add(engine.world, blueStone);

        // ストーンのストップイベント
        Events.on(redStone, "sleepStart", e => {
            let collisions = Query.collides(redStone, [redStartArea]);
            if (collisions.length == 0) {
                Score_Red.isThrown = true;
                redStone.isSleeping = false;
            }

            this.JudgeWinner(Score_Red, Score_Blue);
        });
        Events.on(blueStone, "sleepStart", e => {
            let collisions = Query.collides(blueStone, [blueStartArea]);
            if (collisions.length == 0) {
                Score_Blue.isThrown = true;
                blueStone.isSleeping = false;
            }

            this.JudgeWinner(Score_Red, Score_Blue);
        });

        // スタートボタンを押せるのは一回だけ
        $('#startButton').prop('disabled', true);
    }

    JudgeWinner(Score_Red, Score_Blue) {
        if (Score_Red.isThrown && Score_Blue.isThrown) {
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
     * カーリングのハウスを生成する
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