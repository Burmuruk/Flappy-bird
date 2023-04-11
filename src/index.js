import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 500},
      debug: true
    }
  },
  scene: {
    preload: preload,
    create,
    update
  }
}

const FlapVelocity = 310;
const PipeSpawnTime = 7000;
const PipeVelocity = 4;
const MinPipeHeight = 100;
const MinPipePlayerSpace = 150;

let bird = null;
let pipe = null;
let pipeTimeCount = 0;

function preload(){
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create (){
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.add.sprite(100, config.height / 2, "bird");
  this.physics.add.existing(bird);

  this.input.keyboard.on("keydown-SPACE", flap);
}

function update(time, delta){
  pipeTimeCount += delta * PipeVelocity     ;

  if (pipeTimeCount >= PipeSpawnTime){
    spawnPipes(this)
    pipeTimeCount = 0;
  }
}

function flap() {
  bird.body.velocity.y = -FlapVelocity;
}

function spawnPipes(game){
  let yPosition = Math.random() * (GetAvailablePipeArea() - MinPipePlayerSpace) - 200;

  let pivot1 = {x: 0, y: 0};
  let pivot2 = {x: 0, y: 0};

  spawnPipe(game, yPosition, pivot1);
  spawnPipe(game, yPosition + MinPipePlayerSpace + 500, pivot2);
}

function spawnPipe(game, yPosition, pivot){
  pipe = game.add.sprite(config.width + 50, yPosition, "pipe");
  game.physics.add.existing(pipe);
  
  // pipe.setOrigin(pivot.x, pivot.y);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true;
  pipe.body.velocity.x = -180;

  // game.physics.add.overlap(bird, pipe, onPipeHit(), null, game);
}

function GetAvailablePipeArea(){
  return config.height - (MinPipeHeight * 2) + MinPipeHeight;
}

function onPipeHit(){
  alert("Perdiste");
}

new Phaser.Game(config);