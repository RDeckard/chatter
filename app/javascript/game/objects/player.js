import Phaser from 'phaser'

export default class player {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, playerKey) {
    const player = scene.physics.add.sprite(100, 450, playerKey)
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    scene.anims.create({
      key:       'left',
      frames:    scene.anims.generateFrameNumbers(playerKey, { start: 0, end: 3 }),
      frameRate: 10,
      repeat:    -1
    })

    scene.anims.create({
      key:       'turn',
      frames:    [{ key: playerKey, frame: 4 }],
      frameRate: 20
    })

    scene.anims.create({
      key:       'right',
      frames:    scene.anims.generateFrameNumbers(playerKey, { start: 5, end: 8 }),
      frameRate: 10,
      repeat:    -1
    })

    return player
  }
}
