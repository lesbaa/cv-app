/* eslint-env browser */
import React, { Component } from 'react'
import {
  Engine,
  World,
  Bodies,
  Composite,
  Mouse,
  Events,
  MouseConstraint,
  Body,
} from 'matter-js'
import { loadImg } from '~/utils/imgHelpers'
import { SOFT_SKILLS } from '~/constants/skillTypes'
import styles from './SoftSkillsScene.styles'

let PIXI

class DevSkillsScene extends Component {
  // TODO refactor some of this out into a higher order component
  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: SOFT_SKILLS })
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

    Events.off(this.mouseConstraint)

    Engine.clear(this.physicsEngine)
    this.canvasRef = null
  }

  getSprites = async () => {
    const sprites = Object
      .keys(this.props.skills)
      .reduce((acc, key) => {
        acc.sprites.push(loadImg(`/static/img/soft-skills/${key}.svg`)) // TODO load correct img
        acc.keys.push(key)
        return acc
      }, {
        sprites: [],
        keys: [],
      })

    const images = await Promise.all(sprites.sprites)

    return sprites.keys.reduce((acc, key, i) => {
      acc[key] = images[i]
      return acc
    }, {})
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  init = async () => {
    const {
      Graphics,
      Application,
      Sprite,
      Container,
    } = PIXI

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

    this.physicsEngine = this.physicsEngine
      ? Engine.clear(this.physicsEngine)
      : Engine.create({ enableSleeping: false })

    this.physicsEngine.world.gravity.y = 0.01

    window.addEventListener('deviceorientation', ({ alpha, beta, gamma }) => {
      this.physicsEngine.world.gravity.x = Math.sin(gamma * Math.PI / 180)
    })

    this.bounds = this.createBounds()

    const bodies = Object
      .entries(this.props.skills)
      .filter(([ , { type }]) => type === SOFT_SKILLS)
      .map(([key, { points }], i) => {
        loadImg(`/static/img/soft-skills/${key}.svg`)
        const mass = points * 15

        const x = this.dims.w * 0.66
        const y = this.dims.h / 2

        const container = new Container()
        container.x = x
        container.y = y

        const sides = ~~(Math.random() * 7) + 3 // eslint-disable-line

        const sprite = new Sprite.fromImage(`/static/img/soft-skills/${key}.svg`)
        const imageScaleAmount = mass / 170

        sprite.transform.scale.x = imageScaleAmount
        sprite.transform.scale.y = imageScaleAmount
        sprite.anchor.set(0.5)

        const body = Bodies.polygon(0, 0, sides, mass, {
          mass,
          restitution: 0.8,
          frictionAir: 0,
          render: {
            sprite: {
              key,
              container,
              sprite,
            },
          },
        })

        const g = new Graphics({ nativeLines: true })
        g.lineStyle(1, 0x333333)
        g.beginFill(0x000000, 0)

        const {
          x: initX,
          y: initY,
        } = body.vertices[0]

        g.moveTo(initX, initY)

        body.vertices.forEach(({ x: vX, y: vY }) => {
          g.lineTo(vX, vY)
        })
        g.lineTo(initX, initY)
        g.endFill()

        container.addChild(g)
        container.addChild(sprite)
        container.key = key
        container.icon = sprite

        this.app.stage.addChild(container)

        Body.setPosition(body, { x, y })

        return body

      })

    const mouse = Mouse.create(this.canvasRef)
    this.mouseConstraint = MouseConstraint.create(this.physicsEngine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
    })

    let lastClickedTime // TODO look into a way of doing this without let.
    let lastClickedBody

    Events.on(this.mouseConstraint, 'mousedown', ({ source: { body } }) => {
      lastClickedTime = performance.now()
      lastClickedBody = body
    })

    Events.on(this.mouseConstraint, 'mouseup', ({ mouse: { mousedownPosition } }) => {
      try {
        if ((performance.now() - lastClickedTime) < 200) {
          this.props.showDetailModal({
            id: lastClickedBody.render.sprite.key,
            skillType: SOFT_SKILLS,
          })
        }
      } catch (err) {
        //
      }
    })

    World.add(this.physicsEngine.world, [
      this.bounds,
      this.mouseConstraint,
      ...bodies,
    ])

    this.animate(0)
  }

  createBounds = () => {
    const boundsMargin = this.dims.w * 0.075

    const bounds = Body.create({
      isStatic: true,
      plugin: { isBounds: true },
      parts: [
        Bodies.rectangle(
          this.dims.w / 3 * 2,
          boundsMargin,
          this.dims.h,
          boundsMargin,
          {
            isStatic: true,
          }
        ),
        Bodies.rectangle(
          this.dims.w / 3 * 2,
          this.dims.h - boundsMargin,
          this.dims.h,
          boundsMargin,
          {
            isStatic: true,
          }
        ),
        Bodies.rectangle(
          (this.dims.w / 2) - boundsMargin,
          this.dims.h / 2,
          boundsMargin,
          this.dims.h,
          {
            isStatic: true,
          }
        ),
        Bodies.rectangle(
          this.dims.w - boundsMargin / 2,
          this.dims.h / 2,
          boundsMargin,
          this.dims.h,
          {
            isStatic: true,
          }
        ),
      ],
    })
    Body.translate(bounds, { x: 0, y: -100 })
    return bounds
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    const bodies = Composite.allBodies(this.physicsEngine.world)
    for (let i = 0; i < bodies.length; i += 1) {
      const body = bodies[i]
      if (body.plugin.isBounds) continue

      if (t < 1000) Body.applyForce(body, { x: 0, y: 0 }, { x: 0.5, y: 0.5 })

      body.render.sprite.container.x = body.position.x
      body.render.sprite.container.y = body.position.y
      body.render.sprite.container.rotation = body.angle
      body.render.sprite.sprite.rotation = -body.angle
    }

    Engine.update(this.physicsEngine)
  }

  render = () => (
    <canvas
      className="SoftSkillsScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

// TODO proptypes / default props tests

export default DevSkillsScene
