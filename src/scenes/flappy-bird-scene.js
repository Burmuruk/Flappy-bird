export default class FlappyBirdScene extends Phaser.Scene{
    constructor(sceneName, config){
        super(sceneName);
        this.config = config;
        this.layers = {
            background: null,
            game: null,
            ui: null,
        };
    }

    create(){
        //Initilize layers
        this.layers.background = this.add.layer();
        this.layers.game = this.add.layer();
        this.layers.ui = this.add.layer();

        //Instanciate gameobjects
        var sky = this.add.image(0, 0, "sky").setOrigin(0);
        this.layers.background.add(sky);
    }

    showMenu(menu){
        let yPos = menu.firstItemPosition.y;
        menu.item.forEach(item => {
            this.add.text(menu.firstItemPosition.x, yPos, item.label, item.style).setOrigin(menu.origin.x, menu.origin.y);
            yPos += menu.spacing;
        });
    }
}