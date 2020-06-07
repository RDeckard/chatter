import Phaser from "phaser"

import Player      from '../objects/player'
import BombSpawner from '../objects/bomb_spawner'
import ScoreLabel  from '../ui/score_label'

// load images with Webpack
import skyImage      from "../assets/images/sky.png"
import platformImage from "../assets/images/platform.png"
import DudeImage     from "../assets/images/dude.png"
import starImage     from "../assets/images/star.png"
import bombImage     from "../assets/images/bomb.png"

const SKY_KEY    = "sky"
const GROUND_KEY = "ground"
const DUDE_KEY   = "dude"
const STAR_KEY   = "star"
const BOMB_KEY   = "bomb"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super()

    this.player      = undefined
    this.stars       = undefined
    this.bombSpawner = undefined
    this.scoreLabel  = undefined
    this.cursors     = undefined

    this.gameOver = false
  }

  preload() {
    this.load.image(SKY_KEY,    skyImage)
    this.load.image(GROUND_KEY, platformImage)
    this.load.image(STAR_KEY,   starImage)
    this.load.image(BOMB_KEY,   bombImage)

    this.load.spritesheet(DUDE_KEY,
      DudeImage, { frameWidth: 32, frameHeight: 48 }
    )
  }

  create() {
    // Background
    this.add.image(400, 300, SKY_KEY)

    // Static entities
    const platforms = this.createPlatforms()

    // Dynamic entities
    this.player      = new Player(this, DUDE_KEY)
    this.stars       = this.createStars()
    this.bombSpawner = new BombSpawner(this, BOMB_KEY)
    const bombs = this.bombSpawner.group

    // static physics
    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(this.stars,  platforms)
    this.physics.add.collider(bombs,       platforms)

    // dynamic physics
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
    this.physics.add.collider(this.player, bombs, this.hitBomb, null, this)

    // UI
    this.scoreLabel = this.createScoreLabel(16, 16, 0)

    // I/O
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.gameOver) { return }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true)

    this.scoreLabel.add(10)

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true)
      })
    }

    this.bombSpawner.spawn(
      (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
    )
  }

  hitBomb(player, bomb) {
    this.physics.pause()
    player.setTint(0xff0000)
    player.anims.play('turn')

    this.gameOver = true
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

    platforms.create(600, 400, GROUND_KEY)
    platforms.create(50,  250, GROUND_KEY)
    platforms.create(750, 220, GROUND_KEY)

    return platforms
  }

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    return stars
  }

  createScoreLabel(x, y, score) {
    const label = new ScoreLabel(this, x, y, score, { fontSize: '32px', fill: '#000' })

    this.add.existing(label)

    return label
  }
}
