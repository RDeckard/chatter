import Phaser from 'phaser'

export default class BombSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bombKey) {
    this.bombKey = bombKey

    this._group = scene.physics.add.group()
  }

  get group() {
    return this._group
  }

  spawn(x) {
    const bomb = this.group.create(x, 16, this.bombKey)
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)

    return bomb
  }
}
