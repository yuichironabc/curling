(function () {
    function GetRandomColor() {
        return "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
    }

    function CreateApplication() {

        World.add(engine.world, Bodies.rectangle(300, 100, 124, 20, {
            render: {
                fillStyle: GetRandomColor()
            }
        }));

        World.add(engine.world, Bodies.rectangle(300, 200, 124, 20, {
            render: {
                fillStyle: GetRandomColor()
            }
        }));
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
            width: 500,
            height: 620,
            background: "#000000",
            wireframes: false,
            wireframeBackground: "#1e90ff",
            hasBounds: true
        }
    });

    // イベント設定
    // オブジェクト衝突時
    // Events.on(engine, "collisionStart", function (e) {

    //     let bodyA = e.pairs[0].bodyA;
    //     let bodyB = e.pairs[0].bodyB;
    //     if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
    //         $("#sound_hit").get(0).play();
    //     } else if (bodyA.label.split('-')[0] == 'stone') {

    //     } else if (bodyB.label.split('-')[0] == 'stone') {

    //     }
    // })

    // Events.on(engine, "collisionEnd", function (e) {

    //     let bodyA = e.pairs[0].bodyA;
    //     let bodyB = e.pairs[0].bodyB;
    //     if (bodyA.label.split('-')[0] == 'stone' && bodyB.label.split('-')[0] == 'stone') {
    //         return;
    //     } else if (bodyA.label.split('-')[0] == 'stone') {

    //         if (bodyA.label == 'stone-red') {

    //         } else if (bodyA.label == 'stone-blue') {

    //         }
    //     } else if (bodyB.label.split('-')[0] == 'stone') {

    //     }
    // })

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

    CreateApplication();

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

})();