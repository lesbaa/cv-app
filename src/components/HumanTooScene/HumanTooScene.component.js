/* eslint-env browser */
import React, { Component } from 'react'
import gloopFilter from '~/shaders/profileFilter'
import styles from './HumanTooScene.styles'

let PIXI

class HumanTooScene extends Component {

  filters = []

  sprite = null

  // TODO refactor some of this out into a higher order component
  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.init()
  }

  componentWillUnmount = async () => {
    cancelAnimationFrame(this.frameId)

    this.app.ticker.stop()
    this.app.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    })

    window.removeEventListener('mousemove', this.handleMouseMove)

    this.ctx = null
    this.canvasRef = null
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  init = async () => {
    const { Application } = PIXI

    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight

    this.app = new Application({
      view: this.canvasRef,
      width: this.canvasRef.width,
      height: this.canvasRef.height,
      transparent: true,
      antialias: true,
      forceCanvas: false,
    })

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)

    const w = this.app.screen.width
    const h = this.app.screen.height

    this.dims = {
      w,
      h,
      wUnit: w / 6,
      hUnit: h / 6,
    }

    this.createSprite()
    this.initFilter()

    this.animate(0)
  }

  createSprite = () => {
    const { Sprite } = PIXI

    const sprite = Sprite.fromImage('/static/img/profile_2.svg')
    sprite.anchor.set(0.5)
    sprite.x = this.dims.w * 0.66
    sprite.y = this.dims.h / 2

    this.app.stage.addChild(sprite)
    this.sprite = sprite
  }

  initFilter = () => {
    const { Filter } = PIXI

    this.filters.push(new Filter('', gloopFilter.fragment, gloopFilter.uniforms))
    this.app.stage.filters = this.filters

    window.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = () => {
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].uniforms.uMouseSpeed += 0.03
    }
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].uniforms.uTime += 0.01
      const filterMouseVelocity = this.filters[i].uniforms.uMouseVelocity
      if (filterMouseVelocity && filterMouseVelocity > 0) {
        this.filters[i].uniforms.uMouseSpeed -= 0.01
      }
    }
  }

  render = () => (
    <canvas
      className="HumanTooScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default HumanTooScene
