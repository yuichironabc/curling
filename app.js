(function () {

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
        Common = Matter.Common;

    // create an engine
    var engine = Engine.create({
        enableSleeping: true
    });

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            background: "#000080",
            wireframes: false,
            wireframeBackground: "#000080",
            hasBounds: true,
            showAngleIndicator: true
        }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 400, 80, 80, { frictionAir: 0.1 });
    boxA.render.fillStyle = "#FF00FF";
    boxA.force.x = -0.1;
    var boxB = Bodies.rectangle(450, 100, 80, 80, { frictionAir: 0.1 });
    boxB.force.x = 0.1;
    var circleA = Bodies.circle(450, 200, 80, { frictionAir: 0.1 });
    circleA.force.y = 0.1;
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

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

    $("#generateWorm").on("click", function () {
        var group = Body.nextGroup(true);
        var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
        var bridge = Composites.stack(160, 290, 15, 1, 0, 0, function (x, y) {

            var rectangle = Bodies.rectangle(x - 20, y, 53, 20, {
                collisionFilter: { group: group },
                chamfer: 5,
                density: 0.005,
                frictionAir: 0.05,
                render: {
                    fillStyle: randomColor
                },
                force: {
                    x: 0.2,
                    y: 0
                }
            });

            Sleeping.set(rectangle, true);

            Events.on(rectangle, 'sleepStart', function (e) {
                Body.applyForce(
                    rectangle,
                    {
                        x: 0,
                        y: 0
                    },
                    {
                        x: 0.9,
                        y: 0
                    }
                );
            });

            return rectangle;
        });

        Composites.chain(bridge, 0.3, 0, -0.3, 0, {
            stiffness: 1,
            length: 0,
            render: {
                visible: false
            }
        });

        World.add(engine.world, [
            bridge,
            mouseConstraint]);
    });

    var stack = Composites.stack(0, 0, 18, 12, 0, 0, function (x, y) {

        var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
        var rectangle = Bodies.rectangle(x, y, 50, 50, {
            render: {
                fillStyle: randomColor
            }
        });

        Events.on(rectangle, 'sleepStart', function (e) {
            Body.applyForce(
                rectangle,
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 0.9,
                    y: 0
                }
            );
        });

        return rectangle;
    });

    // add all of the bodies to the world
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    // World.add(engine.world, [
    //     stack,
    //     bridge,
    //     boxA,
    //     boxB,
    //     circleA,
    //     ground,
    //     Constraint.create({
    //         pointA: { x: 140, y: 300 },
    //         bodyB: bridge.bodies[0],
    //         pointB: { x: -25, y: 0 },
    //         length: 2,
    //         stiffness: 0.9
    //     }),
    //     Constraint.create({
    //         pointA: { x: 660, y: 300 },
    //         bodyB: bridge.bodies[bridge.bodies.length - 1],
    //         pointB: { x: 25, y: 0 },
    //         length: 2,
    //         stiffness: 0.9
    //     }),
    //     mouseConstraint]);

    World.add(engine.world, [
        // bridge,
        stack,
        mouseConstraint]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

})();