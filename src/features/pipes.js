const PIPE_SPAWN_TIME = 1500;
const PIPE_VELOCITY = 300; 

export default class PipeSystem {
    constructor(scene) {
        this.scene = scene;
        this.pipes = scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
    }

    start() {
        this.spawnPipe();

        this.scene.time.addEvent({
            delay: PIPE_SPAWN_TIME,
            callback: () => {
                this.spawnPipe();
            },
            loop: true
        });
    }

    spawnPipe() {
        var spawnPosition = Phaser.Math.Between(50, 250);
        var gapSize = Phaser.Math.Between(100, 300);
        var upper = this.pipes.create(this.scene.config.width, spawnPosition, "pipe").setOrigin(0, 1);
        var lower = this.pipes.create(this.scene.config.width, spawnPosition + gapSize, "pipe").setOrigin(0);
        upper.body.velocity.x = -PIPE_VELOCITY;
        lower.body.velocity.x = -PIPE_VELOCITY;
    }

    getGroup() {
        return this.pipes;
    }
}