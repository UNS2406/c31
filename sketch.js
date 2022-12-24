const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let srEngine;
let srWorld;

var bkgIMG;
var fruit, fruitIMG;
var rope1, rope2, rope3;
var fruit_con1, fruit_con2, fruit_con3;

var cutBtn1, cutBtn2, cutBtn3;
var muteBtn, muteBtnIMG, airBlowBtn, airBlowIMG;

var bunny, bunnyIMG;
var blinkAnimation, sadAnimation, eatAnimation;

function preload() {
  bkgIMG = loadImage("background.png");

  fruitIMG = loadImage("melon.png");

  bunnyIMG = loadImage("Rabbit-01.png");

  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatAnimation = loadAnimation(
    "eat_0.png",
    "eat_1.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
  sadAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blinkAnimation.playing = true;
  eatAnimation.playing = true;
  sadAnimation.playing = true;

  sadAnimation.looping = false;
  eatAnimation.looping = false;
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  srEngine = Engine.create();
  srWorld = srEngine.world;

  ground = new Ground(200, 690, 600, 20);

  cutBtn1 = createImg("cut_btn.png");
  cutBtn1.position(220, 30);
  cutBtn1.size(50, 50);
  cutBtn1.mouseClicked(drop1);

  rope1 = new Rope(7, { x: 245, y: 30 });

  blinkAnimation.frameDelay = 20;
  eatAnimation.frameDelay = 20;
  sadAnimation.frameDelay = 20;

  bunny = createSprite(230, 620, 100, 100);
  bunny.scale = 0.2;
  bunny.addAnimation("blinking", blinkAnimation);
  bunny.addAnimation("eating", eatAnimation);
  bunny.addAnimation("crying", sadAnimation);
  bunny.changeAnimation("blinking");

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope1.body, fruit);

  fruit_con1 = new Link(rope1, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bkgIMG, width / 2, height / 2, 490, 690);

  Engine.update(srEngine);

  ground.show();

  if (fruit != null) {
    image(fruitIMG, fruit.position.x, fruit.position.y, 70, 70);
  }

  rope1.show();


  //function call to check collision netween 2 bodies
  if (checkCollision(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
  }

  if (checkCollision(fruit, ground.body) == true) {
    bunny.changeAnimation("crying");
  }

  drawSprites();
}

function drop1() {
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null;
}

//function definition to check collision netween 2 bodies
function checkCollision(body1, body2) {
  if (body1 != null) {
    var calculatedDist = dist( body1.position.x, body1.position.y, body2.position.x,body2.position.y);
    if (calculatedDist <= 80) {
      World.remove(srEngine.world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
