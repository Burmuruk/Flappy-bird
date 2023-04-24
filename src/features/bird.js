const FLAP_VELOCITY = 300;
const OFFBOUND_THRESHOLD = 100;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.immovable = true;
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);
        this.blocked = false;
        // this.body.setCollideWorldBounds(true);
    }

    checkOffBounds(callback){
        if (this.getBounds().top >= 0 - OFFBOUND_THRESHOLD && this.getBounds().bottom <= this.scene.config.height + OFFBOUND_THRESHOLD){
            return;
        }

        callback();
    }

    flap() {
        if (this.blocked) return;

        this.body.velocity.y = -FLAP_VELOCITY;
        this.body.velocity.x = 0;
    }

    triggerLoseAnimation(endCallback){
        this.setTint(0xFF0000); 
        this.flap();
        this.blocked = true;

        const loseTimer = this.scene.time.addEvent({
            delay: 2,
            callback: ()=> {
                this.checkLoseAnimation(loseTimer, endCallback);
            },
            loop: true
        });
    }

    checkLoseAnimation(timer, endCallback){
        if (this.getBounds().top > this.scene.config.height) {
            timer.remove();
            endCallback();
        }
    }
}