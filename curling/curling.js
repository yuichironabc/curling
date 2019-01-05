(function () {
    function GetRandomColor() {
        return "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
    }

    function GenerateArrow() {

        // $.get('./right.svg').done(function (data) {
        //     var vertexSets = [],
        //         color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        //     $(data).find('path').each(function (i, path) {
        //         var points = Svg.pathToVertices(path, 30);
        //         vertexSets.push(Vertices.scale(points, 0.4, 0.4));
        //     });

        //     World.add(engine.world, Bodies.fromVertices(100 + 150, 200 + 50, vertexSets, {
        //         render: {
        //             fillStyle: GetRandomColor()
        //             // strokeStyle: color,
        //             // lineWidth: 1
        //         }
        //     }));
        // });

        World.add(engine.world, Bodies.circle(80, 320, 30, {

            label: 'stone-red',
            render: {
                fillStyle: GetRandomColor()
            }
        }));

        World.add(engine.world, Bodies.circle(1200, 320, 30, {

            label: 'stone-blue',
            render: {
                fillStyle: GetRandomColor()
            }
        }));
    }

    function CreateDartsTarget() {

        var targetCount = 0;
        return Composites.stack(980, 0, 1, 5, 0, 0, function (x, y) {

            var targetLabel = "";
            var targetColor = "";
            targetCount++;
            switch (targetCount) {
                case 1:
                case 5:
                    targetLabel = "low-point";
                    targetColor = "#ffff00";
                    break;

                case 2:
                case 4:
                    targetLabel = "middle-point";
                    targetColor = "#ffa500";
                    break;

                case 3:
                    targetLabel = "high-point";
                    targetColor = "#ff0000";
                    break;

                default:
                    break;
            }

            return Bodies.rectangle(x, y, 20, 124, {
                isStatic: true,
                label: targetLabel,
                render: {
                    fillStyle: targetColor
                }
            });
        });
    }

    function CreateHouse(radius, label) {

        return Bodies.circle(650, 310, radius, {

            isSensor: true,
            isStatic: true,
            label: label,
            render: {
                fillStyle: GetRandomColor()
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
    // オブジェクト衝突時
    Events.on(engine, "collisionStart", function (e) {

        let bodyA = e.pairs[0].bodyA;
        let bodyB = e.pairs[0].bodyB;
        if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
            $("#sound_hit").get(0).play();
        } else if (bodyA.label.split('-')[0] == 'stone') {

        } else if (bodyB.label.split('-')[0] == 'stone') {

        }
    })

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

    // ダーツ矢生成ボタン押下時
    $("#generateArrow").on("click", function () {

        $("#sound_generateArrow").get(0).play();
        GenerateArrow();
    });

    // オブジェクト作成
    // var dartsTarget = CreateDartsTarget();
    [
        [300, 'big'],
        [150, 'middle'],
        [50, 'small']
    ].forEach(set => {
        // var house = CreateHouse(radius);
        World.add(engine.world, CreateHouse(set[0], set[1]));
    });

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

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

})();