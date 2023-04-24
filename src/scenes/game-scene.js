import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";
// const pipes = null;

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
        this.bird = null;
        this.pipeSystem = null;
        this.score = null;
        this.layers = {
            background: null,
            game: null,
            ui: null,
        };
        this.pauseButon = null;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
        this.load.image("pause_button", "assets/pause.png");
    }

    create() {
        //Initilize layers
        this.layers.background = this.add.layer();
        this.layers.game = this.add.layer();
        this.layers.ui = this.add.layer();

        //Instanciate gameobjects
        var sky = this.add.image(0, 0, "sky").setOrigin(0);
        this.layers.background.add(sky);
        
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