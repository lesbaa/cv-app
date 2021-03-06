/* eslint-env browser */
import React, { Component } from 'react'
import { geom } from 'toxiclibsjs'
import crossHatchShader from '~/shaders/crossHatch'
import shoogleShader from '~/shaders/shoogle'
import withPixi from '~/HOCs/withPixi'
import styles from './HireMeScene.styles'
import Star from './Star.class'

const { Vec2D } = geom

const STAR_RESPAWN_RADIUS = 800

class HireMeScene extends Component {

  sprites = {}
  filters = []
  starfield = []

  mousePos = new Vec2D(0, 0)
  rocketPos = new Vec2D(0, 0)
  sceneVelocity = new Vec2D(0, 100)

  // TODO refactor some of this out into a higher order component
  componentDidMount = async () => {
    await this.init()
  }

  componentWillUnmount = async () => {
    cancelAnimationFrame(this.frameId)

    window.removeEventListener('mousemove', this.handleMousMove)

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
    const { Application } = this.props.PIXI

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
    this.initStarfield()
    this.animate(0)
  }


  initRocket = () => {
    const {
      Filter,
      Container,
    } = this.props.PIXI

    const crosshatch = new Filter('', crossHatchShader.fragment, crossHatchShader.uniforms)
    this.filters.push(crosshatch)

    const shoogle = new Filter('', shoogleShader.fragment, shoogleShader.uniforms)
    this.filters.push(shoogle)

    this.rocketPos.set(this.dims.w * 0.66, this.dims.h * 0.5)

    const rocketGroup = new Container()
    rocketGroup.x = this.rocketPos.x
    rocketGroup.y = this.rocketPos.y

    const exhaustGroup = new Container()
    exhaustGroup.y = 82.5
    exhaustGroup.pivot = new this.props.PIXI.Point(0, -82.5)

    this.exhaustGroup = exhaustGroup

    exhaustGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket_trail.svg',
      attributes: {
        filters: [
          shoogle,
          crosshatch,
        ],
      },
    }))

    exhaustGroup.addChild(this.makeSprite({
      imageUrl: '/static/img/rocket_trail_outline.svg',
      attributes: {
        filters: [
          shoogle,
        ],
      },
    }))

    rocketGroup.addChild(exhaustGroup)

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

    window.addEventListener('mousemove', this.handleMousMove)
    this.handleMousMove({
      clientX: window.innerWidth / 2,
      clientY: 0,
    })
  }

  handleMousMove = ({
    clientX,
    clientY,
  }) => {
    this.mousePos.set(clientX, clientY)
    const {
      x,
      y,
    } = this.sprites.rocket
    this.rocketPos.set(x, y)

    const newVelocity = this.rocketPos
      .sub(this.mousePos)

    this.sceneVelocity.set(newVelocity.x, newVelocity.y)
    this.exhaustGroup.scale.y = (200 + this.sceneVelocity.magnitude()) / window.innerHeight
    this.sprites.rocket.rotation = this.sceneVelocity.heading() - Math.PI / 2
  }

  initStarfield = () => {
    while (this.starfield.length < 30) {
      const x = Math.random() * this.dims.w
      const y = Math.random() * this.dims.h
      const z = Math.random() + 0.4
      if (new Vec2D(x, y).distanceTo(this.rocketPos) < STAR_RESPAWN_RADIUS) {
        this.starfield.push(new Star({
          x,
          y,
          z,
          vDirection: this.sceneVelocity,
          container: this.app.stage,
          vCenterOfUniverse: this.rocketPos,
          respawnRadius: STAR_RESPAWN_RADIUS,
        }))
      }
    }
  }

  makeSprite = ({
    imageUrl,
    attributes = {},
  }) => {
    const { Sprite } = this.props.PIXI
    const sprite = new Sprite.fromImage(imageUrl) // eslint-disable-line

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

    for (let i = 0; i < this.starfield.length; i++) {
      this.starfield[i].tick()
    }
  }

  render = () => {
    const canvasClassName = [
      'HireMeScene',
      'anim-scene',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <canvas
        className={canvasClassName}
        ref={this.setCanvasRef}
      >
        <style jsx>{styles}</style>
      </canvas>
    )
  }

}

export default withPixi(HireMeScene)
