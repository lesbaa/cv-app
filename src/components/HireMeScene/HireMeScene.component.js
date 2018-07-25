/* eslint-env browser */
import React, { Component } from 'react'
import { geom } from 'toxiclibsjs'
import crossHatchShader from '~/shaders/crossHatch'
import shoogleShader from '~/shaders/shoogle'
import styles from './HireMeScene.styles'

const { Vec2D } = geom

// PIXI can't be imported on the server due to window polyfills
// TODO try using your SSRSwitch component further up the line instead of dynamic importing
// Also look at porting the filters to your own shader code
let PIXI

class HireMeScene extends Component {

  sprites = {}
  filters = []
  starfield = []

  mousePos = new Vec2D(0, 0)
  rocketPos = new Vec2D(0, 0)
  sceneVelocity = new Vec2D(0, 0)

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

    this.initRocket()
    this.initFilter()

    this.animate(0)
  }


  initRocket = () => {
    const {
      Filter,
      Container,
    } = PIXI

    const crosshatch = new Filter('', crossHatchShader.fragment, crossHatchShader.uniforms)
    this.filters.push(crosshatch)

    const shoogle = new Filter('', shoogleShader.fragment, shoogleShader.uniforms)
    this.filters.push(shoogle)

    const rocketGroup = new Container()
    rocketGroup.x = this.dims.w * 0.66
    rocketGroup.y = this.dims.h * 0.5

    rocketGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket_trail.svg',
      attributes: {
        y: 165,
        filters: [
          shoogle,
          crosshatch,
        ],
      },
    }))

    rocketGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket_trail_outline.svg',
      attributes: {
        y: 165,
        filters: [
          shoogle,
        ],
      },
    }))

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

      this.sceneVelocity = this.rocketPos
        .sub(this.mousePos)

      this.sprites.rocket.rotation = this.sceneVelocity.heading() - Math.PI / 2
    })
  }

  initStarfield = () => {
    const { Graphics } = PIXI
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.dims.w
      const y = Math.random() * this.dims.h
      const z = Math.random() * 5

      const g = new Graphics()
      g.beginFill(0x333333, 0)
      g.drawCircle(0, 0, z)
      g.endFill()

      this.starfield.push({
        x,
        y,
        z,
        g,
      })
    }
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
    for (let i = 0; i < this.filters.length; i++) {
      if (this.filters[i].uniforms.uTime !== undefined) this.filters[i].uniforms.uTime += 0.1
    }
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
