import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
// const pipes = null;

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
        this.bird = null;
        this.pipes = null;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
    }

    create() {
        this.add.image(0, 0, "sky").setOrigin(0);

        this.bird = this.add.sprite(100, this.config.height / 2, "bird");
        this.bird = new Bird(this, 100, this.config.height / 2, "bird");

        this.pipes = new PipeSystem(this);
        this.physics.add.collider(this.bird, this.pipes.getGroup(), this.gameOver, null, this);

        this.pipes.start();
    }

    update() {

    }

    gameOver(){
        alert("You lose");
        this.scene.restart();
    }
}