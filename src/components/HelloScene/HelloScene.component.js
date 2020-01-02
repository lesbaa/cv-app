/* eslint-env browser */
import React, { Component } from 'react'
import customShader from '~/shaders/hatch'
import withPixi from '~/HOCs/withPixi'
import styles from './HelloScene.styles'

class HelloScene extends Component {

  componentDidMount = async () => {
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
    debugger
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight

    // this is in here due to an error on Firefox / Linux
    // see here https://github.com/pixijs/pixi.js/issues/4478
    this.props.PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(this.props.PIXI.settings.SPRITE_MAX_TEXTURES , 16)

    this.app = new this.props.PIXI.Application({
      view: this.canvasRef,
      width: this.canvasRef.width,
      height: this.canvasRef.height,
      transparent: true,
    })
    debugger

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    debugger

    const w = this.app.screen.width
    const h = this.app.screen.height

    this.dims = {
      w,
      h,
      wUnit: w / 6,
      hUnit: h / 6,
    }
    debugger

    this.initFilter()
    debugger

    this.initSprite()
    debugger

    this.animate()
  }

  initFilter = () => {
    this.filter = new this.props.PIXI.Filter('', customShader.fragment, customShader.uniforms)
    this.app.stage.filters = [
      this.filter,
    ]
  }

  initSprite = () => {
    const sprite = new this.props.PIXI.Sprite.fromImage('/static/img/hello.png') // eslint-disable-line

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
      className="HelloScene anim-scene fade-in"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default withPixi(HelloScene)
