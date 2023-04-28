import FlappyBirdScene from "./flappy-bird-scene";

export default class MenuScene extends FlappyBirdScene {
    constructor(config){
        super("MenuScene", config);
    }

    preload(){
        this.load.image("sky", "assets/sky.png");
    }

    create(){
        super.create();
        const playButtonCallbacks = {
            
        }
        const mainMenu = {
            item: [
                {label: "Play", style: {fontSize: "32px", fill: "#FFF"}, onClick: this.playButton_OnClick, OnMouseEnter: this.playButton_OnMouseEnter, onMouseExit: this.playButton_OnMouseExit},
                { label: "Score", style: { fontSize: "32px", fill: "#FFF" }, onClick: this.scoreButton_OnClick, OnMouseEnter: this.scoreButton_OnMouseEnter, onMouseExit: this.scoreButton_OnMouseExit }
            ],
            firstItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
        }
        this.showMenu(mainMenu);
    }

    playButton_OnClick(){

    }

    playButton_OnMouseEnter(){

    }

    playButton_OnMouseExit(){

    }

    scoreButton_OnClick(){

    }

    scoreButton_OnMouseEnter(){

    }

    scoreButton_OnMouseExit(){

    }
}