import LibClass from './module.js';
import ScoreClass from './score.js';
import score from './score.js';

const HOUSE_RADIUS_BIG = window.innerWidth * 0.24;
const HOUSE_RADIUS_MIDDLE = window.innerWidth * 0.125;
const HOUSE_RADIUS_SMALL = window.innerWidth * 0.04;

const MATTER_FIELD_WIDTH = window.innerWidth;
const MATTER_FIELD_HEIGHT = window.innerWidth * 0.9;

let Module = new LibClass();
let Score_Red = new ScoreClass('red', 0);
let Score_Blue = new ScoreClass('blue', 0);

// バインディング用のデータオブジェクト
var data = {
    scoreRed: Score_Red.score,
    scoreBlue: Score_Blue.score
};

(function () {

    // $("#slider").slider({
    //     min: 1,
    //     max: 10,
    //     step: 0.1,
    //     slide: function () {

    //     }
    // });

    // スコアボードにスコア管理用オブジェクトのスコアをバインドする
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

    // Matter内の各オブジェクトのエイリアスを作成する
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
            width: MATTER_FIELD_WIDTH,
            height: MATTER_FIELD_HEIGHT,
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

    /**
     * 加点する。
     * @param {ハウスオブジェクト} house 
     * @param {ストーンオブジェクト} stone 
     */
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

    /**
     * 減点する。
     * @param {ハウスオブジェクト} house 
     * @param {ストーンオブジェクト} stone 
     */
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

    /**
     * 赤のスコアを更新する。
     */
    function UpdateScoreRed() {
        $('#score-board').my("data", {
            scoreRed: Score_Red.score
        });
    }

    /**
     * 青のスコアを更新する。
     */
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
        [HOUSE_RADIUS_BIG, 'big', '#F0FFFF'],
        [HOUSE_RADIUS_MIDDLE, 'middle', '#E0FFFF'],
        [HOUSE_RADIUS_SMALL, 'small', '#AFEEEE']
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