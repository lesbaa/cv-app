/* global window */
import { Vec2D } from 'toxiclibsjs/geom'

export default class Star {
  pos = new Vec2D(0, 0)

  v = new Vec2D(0, 0)

  constructor({
    x = 0,
    y = 0,
    z = 0,
    container,
    vDirection,
    vCenterOfUniverse,
    respawnRadius,
  }) {
    this.pos.set(x, y)
    this.pos.z = z

    this.v.set(vDirection.x * z, vDirection.y * z)

    this.vDirection = vDirection
    this.vCenterOfUniverse = vCenterOfUniverse
    this.respawnRadius = respawnRadius

    import('pixi.js')
      .then(({ Graphics }) => {
        const g = new Graphics()
        g.beginFill(0x333333, 1)
        g.drawStar(0, 0, 4, 5 * z, z, 0)
        g.endFill()
        g.x = x
        g.y = y
        this.g = g
        container.addChild(this.g)
      })
  }

  tick = () => {
    const {
      x,
      y,
    } = this.pos

    this.g.rotation += 0.1

    const isOutOfBounds = this.pos
      .distanceTo(this.vCenterOfUniverse) > this.respawnRadius

    if (isOutOfBounds) {
      this.reset()
      return
    }

    this.g.x = x
    this.g.y = y

    const sceneVelocity = this.vDirection.copy()
    this.v.set(sceneVelocity.x * this.pos.z / 20, sceneVelocity.y * this.pos.z / 20)

    this.pos.set(
      x + this.v.x,
      y + this.v.y
    )
  }

  reset = () => {
    const newPos = new Vec2D(0, 0)
      .add(0, this.respawnRadius - 10)
      .rotate(this.vDirection.heading() + (Math.random() - 0.5) * 2.0 + Math.PI / 2)
      .add(this.vCenterOfUniverse.x, this.vCenterOfUniverse.y)

    this.pos.set(newPos.x, newPos.y)
  }
}
