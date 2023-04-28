import Phaser from "phaser";
import GameScene from "./scenes/game-scene";
import MenuScene from "./scenes/menu-scene";

const SHARED_CONFIG = {
  width: 800,
  height: 600,
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 500},
      debug: true
    }
  },
  scene: [
    new MenuScene(SHARED_CONFIG), 
    new GameScene(SHARED_CONFIG)
  ]
}

new Phaser.Game(config);