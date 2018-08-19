/* eslint-env browser */
import React, { Component } from 'react'
import customShader from '~/shaders/hatch'

import styles from './HelloScene.styles'

let PIXI

class HelloScene extends Component {

  componentDidMount = async () => {
    // this is because PIXI contains polyfills that crash in node
    // TODO wrap this in a try catch
    PIXI = await import('pixi.js')
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)

    this.canvasRef = null

    this.app.ticker.stop()
    this.app.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    })
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  init = async () => {
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight
    this.app = new PIXI.Application({
      view: this.canvasRef,
      width: this.canvasRef.width,
      height: this.canvasRef.height,
      transparent: true,
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
    this.initFilter()
    this.initSprite()
    this.animate()
  }

  initFilter = () => {
    this.filter = new PIXI.Filter('', customShader.fragment, customShader.uniforms)
    this.app.stage.filters = [
      this.filter,
    ]
  }

  initSprite = () => {
    const sprite = new PIXI.Sprite.fromImage('/static/img/hello.png') // eslint-disable-line

    sprite.anchor.set(0.5)

    sprite.x = this.dims.wUnit * 4
    sprite.y = this.dims.hUnit * 3
    sprite.scale.x = 2
    sprite.scale.y = 2
    this.app.stage.addChild(sprite)

    this.sprite = sprite
  }

  animate = (t) => {
    requestAnimationFrame(this.animate)
    this.filter.uniforms.uTime += 0.005
  }

  render = () => (
    <canvas
      className="HelloScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default HelloScene
