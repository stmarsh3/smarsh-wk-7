const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const drawConstraint = Matter.Constraint;


const drawBody = Helpers.drawBody;


let engine;


let rect01;
let rect02;

let quad01;

let quad01a;
let quad05;
let quad05a;


let constraint01;


let ground;
let wallleft;
let wallright;


//CODE START
function setup() {
  createCanvas(600, 600);


  // create an engine
  engine = Engine.create();


  // create rect01
  rect01 = Bodies.rectangle(225, 105, 190, 120);


  // create rect02
  rect02 = Bodies.rectangle(200, 100, 184, 100);


  // create quad01 as first half of triangle
  quad01 = Bodies.trapezoid(100, 105, 80, 80, 1);
  // create quad01a as second half of triangle
  quad01a = Bodies.trapezoid(100, 105, 80, 80, 1);

  quad01 = Bodies.fromVertices(0, 0, [
    {x: 100, y: 400},
    {x2: 420, y2: 400},
    {x3: 518, y3: 320},
    {x4: 220, y4: 320},
  ]);

// constraint01 = Constraint.create({
  // bodyA: quad01,
  // pointB: ( x: -150, y: 50 ),
  // bodyB: quad01a,
  // pointB: ( x: -10, y: -20 ),
  // stiffness: 0.04,
  // damping: 0.05,
  // length: 10
  // });

  // World.add(engine.world, [quad01, quad01a, constraint01]);

  World.add(engine.world, [quad01, quad01a]);


  // create quad05 as first half of triangle
  quad05 = Bodies.trapezoid(100, 105, 80, 80, 1);
  // create quad05 as second half of triangle
  quad05a = Bodies.trapezoid(100, 105, 80, 80, 1);


//FOR THE GROUND AND WALLS
  wallleft = Bodies.rectangle(0, 0, 10, 2000, {
    isStatic: true
  });
  wallright = Bodies.rectangle(600, 0, 10, 2000, {
    isStatic: true
  });
  ground = Bodies.rectangle(500, 600, 1000, 10, {
    isStatic: true, angle: Math.PI * 0.06

  });


  // add all of the bodies to the world
  World.add(engine.world, [wallleft, wallright, rect01, quad01, quad01a, quad05, quad05a, ground, rect02]);


  //MOUSE
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);


  // run the engine
  Engine.run(engine);
}


//DRAW IN THE FUNCTIONS
function draw() {
  background(255);


  fill(220);
  drawBody(rect01);

  fill(10);
  drawBody(rect02);

  fill('blue');
  drawBody(quad01);
  drawBody(quad01a);

  fill('red');
  drawBody(quad05);
  drawBody(quad05a);


  fill(255);
  drawBody(wallleft);
  drawBody(wallright);

  fill(0);
  drawBody(ground);
}
