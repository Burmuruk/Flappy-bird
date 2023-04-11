const FLAP_VELOCITY = 300;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.input.keyboard.on("keydown-SPACE", this.flap, this);
    }

    flap() {
        this.bird.body.velocity.y = -FLAP_VELOCITY;
    }
}