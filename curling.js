import LibClass from './module.js';
import ScoreClass from './score.js';
import score from './score.js';

let Module = new LibClass();
let Score_Red = new ScoreClass('red', 0);
let Score_Blue = new ScoreClass('blue', 0);

var data = {
    scoreRed: Score_Red.score,
    scoreBlue: Score_Blue.score
};

(function () {

    $("#slider").slider({
        min: 1,
        max: 10,
        step: 0.1,
        slide: function () {

        }
    });

    $('#score-board').my({
        ui: {
            "#score-red": {
                bind: "scoreRed"
            },
            "#score-blue": {
                bind: "scoreBlue"
            }
        }
    }, data);

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events;

    var engine = Engine.create({
        enableSleeping: true
    });

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1300,
            height: 620,
            background: "#FFFFFF",
            wireframes: false,
            wireframeBackground: "#1e90ff",
            hasBounds: true
        }
    });

    // イベント設定
    // オブジェクト衝突開始イベント
    Events.on(engine, "collisionStart", function (e) {

        let bodyA = e.pairs[0].bodyA;
        let bodyB = e.pairs[0].bodyB;
        if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
            $("#sound_hit").get(0).play();
        }

        if (bodyA.label.split('-')[0] == 'stone') {
            JudgeScoreUp(bodyB, bodyA);
        } else if (bodyB.label.split('-')[0] == 'stone') {
            JudgeScoreUp(bodyA, bodyB);
        }
    });

    function JudgeScoreUp(house, stone) {
        if (house.label == 'big' ||
            house.label == 'middle' ||
            house.label == 'small') {

            if (stone.label.split('-')[1] == 'red') {
                Score_Red.ScoreUp();
                UpdateScoreRed();
            } else {
                Score_Blue.ScoreUp();
                UpdateScoreBlue();
            }
        }
    }

    function JudgeScoreDown(house, stone) {
        if (house.label == 'big' ||
            house.label == 'middle' ||
            house.label == 'small') {

            if (stone.label.split('-')[1] == 'red') {
                Score_Red.ScoreDown();
                UpdateScoreRed();
            } else {
                Score_Blue.ScoreDown();
                UpdateScoreBlue();
            }
        }
    }

    function UpdateScoreRed() {
        $('#score-board').my("data", {
            scoreRed: Score_Red.score
        });
    }

    function UpdateScoreBlue() {
        $('#score-board').my("data", {
            scoreBlue: Score_Blue.score
        });
    }

    // オブジェクト衝突終了イベント
    Events.on(engine, "collisionEnd", function (e) {

        let bodyA = e.pairs[0].bodyA;
        let bodyB = e.pairs[0].bodyB;
        if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
            return;
        }

        if (bodyA.label.split('-')[0] == 'stone') {
            JudgeScoreDown(bodyB, bodyA);
        } else if (bodyB.label.split('-')[0] == 'stone') {
            JudgeScoreDown(bodyA, bodyB);
        }
    });

    // スタートボタン押下イベント
    $("#startButton").on("click", function () {

        $("#sound_startButton").get(0).play();
        Module.StartGame(engine, Score_Red, Score_Blue);
    });

    // オブジェクト作成
    // ハウスを作成する
    [
        [300, 'big', '#F0FFFF'],
        [150, 'middle', '#E0FFFF'],
        [50, 'small', '#AFEEEE']
    ].forEach(set => {
        World.add(engine.world, Module.CreateHouse(set[0], set[1], set[2]));
    });

    // マウス制御の設定を行う
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            angularStiffness: 0,
            render: {
                visible: false
            }
        }
    });

    // ワールド生成
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    World.add(engine.world, [mouseConstraint]);

    // 実行
    Engine.run(engine);
    Render.run(render);
})();