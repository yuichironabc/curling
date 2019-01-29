(function () {
    /**
     * ランダムに色を取得する
     */
    function GetRandomColor() {
        return "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
    }

    /**
     * ゲームを開始する
     */
    function StartGame() {

        World.add(engine.world, Bodies.circle(80, 320, 30, {

            label: 'stone-red',
            render: {
                fillStyle: "#FC6E51"
            }
        }));

        World.add(engine.world, Bodies.circle(1200, 320, 30, {

            label: 'stone-blue',
            render: {
                fillStyle: "#5D9CEC"
            }
        }));
    }

    // function CreateDartsTarget() {

    //     var targetCount = 0;
    //     return Composites.stack(980, 0, 1, 5, 0, 0, function (x, y) {

    //         var targetLabel = "";
    //         var targetColor = "";
    //         targetCount++;
    //         switch (targetCount) {
    //             case 1:
    //             case 5:
    //                 targetLabel = "low-point";
    //                 targetColor = "#ffff00";
    //                 break;

    //             case 2:
    //             case 4:
    //                 targetLabel = "middle-point";
    //                 targetColor = "#ffa500";
    //                 break;

    //             case 3:
    //                 targetLabel = "high-point";
    //                 targetColor = "#ff0000";
    //                 break;

    //             default:
    //                 break;
    //         }

    //         return Bodies.rectangle(x, y, 20, 124, {
    //             isStatic: true,
    //             label: targetLabel,
    //             render: {
    //                 fillStyle: targetColor
    //             }
    //         });
    //     });
    // }

    /**
     * カーリングのハウスを生成する
     * @param {ハウスの半径} radius 
     * @param {ハウスに付ける内部的な名称} label 
     */
    function CreateHouse(radius, label, color) {

        return Bodies.circle(650, 310, radius, {

            isSensor: true,
            isStatic: true,
            label: label,
            render: {
                fillStyle: color
            }
        });
    }

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Constraint = Matter.Constraint,
        Composites = Matter.Composites,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Events = Matter.Events,
        Sleeping = Matter.Sleeping,
        Svg = Matter.Svg,
        Vertices = Matter.Vertices,
        Common = Matter.Common;

    var engine = Engine.create();

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1300,
            height: 620,
            background: "#000000",
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
        } else if (bodyA.label.split('-')[0] == 'stone') {

        } else if (bodyB.label.split('-')[0] == 'stone') {

        }
    });

    // オブジェクト衝突終了イベント
    Events.on(engine, "collisionEnd", function (e) {

        let bodyA = e.pairs[0].bodyA;
        let bodyB = e.pairs[0].bodyB;
        if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
            return;
        } else if (bodyA.label.split('-')[0] == 'stone') {

            if (bodyA.label == 'stone-red') {

            } else if (bodyA.label == 'stone-blue') {

            }
        } else if (bodyB.label.split('-')[0] == 'stone') {

        }
    })

    // スタートボタン押下イベント
    $("#startButton").on("click", function () {

        $("#sound_startButton").get(0).play();
        StartGame();
    });

    // オブジェクト作成
    // var dartsTarget = CreateDartsTarget();

    // ハウスを作成する
    [
        [300, 'big', '#EEEEEE'],
        [150, 'middle', '#ABB7B7'],
        [50, 'small', '#6C7A89']
    ].forEach(set => {
        // var house = CreateHouse(radius);
        World.add(engine.world, CreateHouse(set[0], set[1], set[2]));
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

    Engine.run(engine);
    Render.run(render);
})();