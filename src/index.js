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
const PipeSpawnTime = 3000;
const PipeVelocity = 150;
const MinPipeHeight = 100;
const MinPipePlayerSpace = 150;

let bird = null;
let pipe = null;
var pipes = null;
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

  pipes = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });

  this.physics.add.collider(bird, pipes, gameOver, null, this);

  spawnPipe();

  this.time.addEvent({
    delay: PipeSpawnTime,
    callback: () => {
      spawnPipe();
    },
    loop: true
  });
}

function update(time, delta){
  
}

function flap() {
  bird.body.velocity.y = -FlapVelocity;
}

function spawnPipe(){
  var spawnPosition = Phaser.Math.Between(50, 250);
  var gapSize = Phaser.Math.Between(100, 300);
  var upper = pipes.create(config.width / 2, spawnPosition / 2, "pipe").setOrigin(0, 1);
  var lower = pipes.create(config.width / 2, spawnPosition + gapSize, "pipe").setOrigin(0);
  upper.body.velocity.x = -PipeVelocity;
  lower.body.velocity.x = -PipeVelocity;
}

function gameOver(){
  alert("You lose");
  this.scene.restart();
}

new Phaser.Game(config);