/* eslint-env browser */

import { geom } from 'toxiclibsjs'

const { Vec2D } = geom

export default class MovingBox {
  pos = {
    x: 0,
    y: 0,
  }

  prevPos = {
    x: 0,
    y: 0,
  }

  startPoint = {
    x: 0,
    y: 0,
  }

  startV = {
    x: 0,
    y: 0,
  }

  v = new Vec2D()

  constructor({
    x,
    y,
    dx = Math.random(),
    dy = Math.random(),
    bounds,
    render = n => n,
    lifeSpan = 100 * Math.random(),
    ctx,
  }) {
    this.v.set(dx, dy)
    this.startPoint = { x, y }
    this.startV = { x: dx, y: dy }
    this.pos = { x, y }
    this.lifeSpan = lifeSpan
    this.life = lifeSpan
    this.render = render
    this.bounds = bounds
    this.ctx = ctx
    this.startTime = Math.random() * 5000
  }

  die = () => this.isDead = true

  update = (t) => {
    if (this.isDead) return
    // if (t < this.startTime) return
    const isOutOfBounds =
      (this.pos.x > window.innerWidth || this.pos.x < 0) ||
      (this.pos.y > window.innerHeight || this.pos.y < 0)

    if (this.life < 0.001 || isOutOfBounds) {
      this.reset()
      return
    }

    this.v.y += this.v.y / this.life
    // this.v.jitter(0.5, 0)
    this.prevPos = { ...this.pos }
    this.pos.x += this.v.x / 2
    this.pos.y += this.v.y / 2
    this.life -= 1
    this.draw()
  }

  draw = () => {
    const r = this.life > 0 ? this.life * 0.15 : 0
    const rOver2 = r / 2
    this.ctx.beginPath()
    this.ctx.fillStyle = '#333333'
    this.ctx.fillRect(this.startPoint.x, this.startPoint.y, 5, 5)
    this.ctx.fillStyle = '#444444'
    this.ctx.fillRect(this.pos.x - rOver2, this.pos.y - rOver2, r, r)
    this.ctx.fill()
  }

  reset = () => {
    this.isDead = false
    this.pos = { ...this.startPoint }
    this.prevPos = { ...this.startPoint }
    this.v.set(this.startV.x, this.startV.y) // TODO this should be sorted
    this.life = this.lifeSpan
  }
}
