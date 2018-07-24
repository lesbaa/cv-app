/* eslint-env browser */
import React, { Component } from 'react'
import { geom } from 'toxiclibsjs'
import crossHatchShader from '~/shaders/crossHatch'
import styles from './HireMeScene.styles'
import Cloud from './Cloud.class'

const { Vec2D } = geom

// PIXI can't be imported on the server due to window polyfills
// TODO try using your SSRSwitch component further up the line instead of dynamic importing
// Also look at porting the filters to your own shader code
let PIXI

class HireMeScene extends Component {

  sprites = {}
  filters = []
  clouds = []
  mousePos = new Vec2D(0, 0)
  rocketPos = new Vec2D(0, 0)

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

    this.initSprites()
    this.initFilter()

    this.animate(0)

    // for (let i = 0; i < 150; i++) {
    //   this.clouds.push(new Cloud({
    //     container: this.app.stage,
    //     emitter: this.sprites.rocket,
    //     emitterOffset: {
    //       y: 130,
    //       x: 0,
    //     },
    //   }))
    // }
  }


  initSprites = () => {
    const {
      Filter,
      Container,
    } = PIXI
    const crosshatch = new Filter('', crossHatchShader.fragment, crossHatchShader.uniforms)

    this.filters.push(crosshatch)

    const rocketGroup = new Container()
    rocketGroup.x = this.dims.w * 0.66
    rocketGroup.y = this.dims.h * 0.5

    rocketGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket.svg',
      attributes: {
        filters: [
          crosshatch,
        ],
      },
    }))

    rocketGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket_outline.svg',
    }))
    rocketGroup.v = 0
    this.app.stage.addChild(rocketGroup)
    this.sprites.rocket = rocketGroup

    window.addEventListener('mousemove', ({
      clientX,
      clientY,
    }) => {
      this.mousePos.set(clientX, clientY)
      const {
        x,
        y,
      } = this.sprites.rocket
      this.rocketPos.set(x, y)

      const directionalVector = this.rocketPos
        .sub(this.mousePos)

      this.sprites.rocket.rotation = directionalVector.heading() - Math.PI / 2
    })
  }

  createRocket = () => {

  }

  initFilter = () => {
    // const { Filter } = PIXI
    // // because we can't evaluate window on the server
    // const thickness = {
    //   type: '2v',
    //   value: [0.01, 0.01],
    // }

    // const outline = new Filter('', outlineShader.fragment, { ...outlineShader.uniforms, thickness })

    // this.app.stage.filters = [
    //   outline,
    // ]
  }

  makeSprite = ({
    imageUrl,
    attributes = {},
  }) => {
    const { Sprite } = PIXI
    const sprite = new Sprite.fromImage(imageUrl)

    sprite.anchor.set(0.5)

    Object.entries(attributes).forEach(([attrKey, attrValue]) => {
      sprite[attrKey] = attrValue
    })

    return sprite

  }


  animate = (t) => {
    requestAnimationFrame(this.animate)
    // this.sprites.rocket.v += 0.1
    // this.sprites.rocket.y -= this.sprites.rocket.v
    // for (let i = 0; i < this.clouds.length; i++) {
    //   this.clouds[i].tick()
    // }
  }

  render = () => (
    <canvas
      className="HireMeScene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default HireMeScene
