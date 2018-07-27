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
  }) {
    this.pos.set(x, y)
    this.pos.z = z

    this.v.set(vDirection.x * z, vDirection.y * z)

    this.vDirection = vDirection
    this.vCenterOfUniverse = vCenterOfUniverse

    import('pixi.js')
      .then(({ Graphics }) => {
        const g = new Graphics()
        g.beginFill(0x333333, 1)
        g.drawCircle(0, 0, 1)
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

    const isOutOfBounds = this.pos
      .distanceTo(this.vCenterOfUniverse) > 500

    if (isOutOfBounds) this.reset()

    this.g.x = x
    this.g.y = y

    const sceneVelocity = this.vDirection.normalize()
    this.v.set(sceneVelocity.x * this.pos.z * 3, sceneVelocity.y * this.pos.z * 3)

    this.pos.set(
      x + this.v.x,
      y + this.v.y
    )
  }

  reset = () => {
    this.pos = this.vCenterOfUniverse
      .add(0, 499)
      .rotate(Math.random() * Math.PI * 2)

  }
}
