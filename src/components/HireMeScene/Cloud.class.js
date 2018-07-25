/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { geom } from 'toxiclibsjs'

const { Vec2D } = geom

const MAX_LIFE = 50

export default class Cloud {
  v = new Vec2D(0, 0)

  attrs = {
    x: 0,
    y: 0,
    rotation: Math.random() - 0.5,
  }

  k = 0

  constructor({
    emitter,
    emitterOffset,
    container,
    x,
    y,
    v,
    floor = window.innerHeight,
    lifespan = Math.random() * MAX_LIFE,
  }) {
    this.emitter = emitter
    this.emitterOffset = emitterOffset
    this.container = container
    this.floor = floor
    this.attrs.x = x || emitter.x + emitterOffset.x + (Math.random() - 0.5) * 50
    this.attrs.y = y || emitter.y + emitterOffset.y + (Math.random() - 0.5) * 50
    this.lifespan = lifespan

    if (v) this.v.set(...v)

    this.initSprite()
  }

  initSprite = async () => {
    const { Sprite } = await import('pixi.js')

    const sprite = new Sprite.fromImage('/static/img/clouds.svg')
    sprite.anchor.set(0.5)

    this.container.addChild(sprite)

    this.sprite = sprite
  }

  reset = () => {
    this.k = 0
    this.lifespan = Math.random() * MAX_LIFE
    this.attrs.x = this.emitter.x + this.emitterOffset.x + (Math.random() - 0.5) * 50
    this.attrs.y = this.emitter.y + this.emitterOffset.y + (Math.random() - 0.5) * 50
    this.v.set(this.emitterOffset.v.x, this.emitterOffset.v.y)
  }

  tick = () => {
    this.k += 0.2

    if (this.k >= this.lifespan) {
      this.reset()
    }

    this.v.jitter(0.01, 0.001)

    this.attrs.x += this.v.x

    if (this.attrs.y < this.floor) this.attrs.y += this.v.y

    this.attrs.rotation = this.attrs.rotation > 0
      ? this.attrs.rotation + 0.05
      : this.attrs.rotation - 0.05

    this.updateSprite()
  }

  updateSprite = () => {
    this.sprite.scale.x = this.k / MAX_LIFE
    this.sprite.scale.y = this.k / MAX_LIFE
    this.sprite.alpha = (1 - (this.k / this.lifespan)) ** 2

    for (const attr in this.attrs) {
      this.sprite[attr] = this.attrs[attr]
    }
  }
}
