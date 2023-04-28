import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";
import FlappyBirdScene from "./flappy-bird-scene";
// const pipes = null;

export default class GameScene extends FlappyBirdScene {
    constructor(config) {
        super("GameScene", config);
        this.bird = null;
        this.pipeSystem = null;
        this.score = null;
        this.pauseButon = null;
    }

    preload() {
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
        this.load.image("pause_button", "assets/pause.png");
    }

    create() {
        super.create();
        
        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        // this.bird = this.add.sprite(100, this.config.height / 2, "bird");

        this.pipeSystem = new PipeSystem(this, this.layers.game);
        this.physics.add.collider(this.bird, this.pipeSystem.getGroup(), this.gameOver, null, this);
        
        this.score = new Score(this, 16, 16, this.layers.ui);
        this.pauseButon = this.add.image(this.config.width - 10, 10, "pause_button")
        .setOrigin(1, 0)
        .setInteractive()
        .setScale(3);

        this.pauseButon.on("pointerup", this.pause, this);

        this.pipeSystem.onPipeExited = ()=>{
            this.score.addScore(1);
        }

        this.pipeSystem.start();
    }

    update() {
        this.bird.checkOffBounds(()=>{
            this.gameOver();
        })

        this.pipeSystem.update();
    }

    gameOver(){
        this.pipeSystem.stop();
        this.pauseButon.setVisible(false); 
        this.layers.game.bringToTop(this.bird);

        this.bird.triggerLoseAnimation(()=>{
            this.score.checkHighScore();
            this.scene.restart();
        });
    }

    pause(){
        this.physics.pause();
        this.scene.pause();
    }
}