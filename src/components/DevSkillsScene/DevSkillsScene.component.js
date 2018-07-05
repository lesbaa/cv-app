/* eslint-env browser */
import React, { Component } from 'react'
import Matter, {
  Engine,
  World,
  Bodies,
  Composite,
  Mouse,
  Events,
  MouseConstraint,
} from 'matter-js'
import MatterAttractors from 'matter-attractors'
import { DEV_SKILLS } from '~/constants/skillTypes'
import { loadImg } from '~/utils/imgHelpers'
import styles from './DevSkillsScene.styles'

Matter.use(MatterAttractors)

let PIXI

class DevSkillsScene extends Component {
  sprites = {}

  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: DEV_SKILLS })
    await this.init()
  }

  componentWillUnmount = async () => {
    cancelAnimationFrame(this.frameId)
    Engine.clear(this.physicsEngine)
    this.ctx = null
    this.canvasRef = null
  }

  init = async () => {
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight
    this.app = new PIXI.Application({
      view: this.canvasRef,
      width: this.canvasRef.width,
      height: this.canvasRef.height,
      transparent: true,
      antialias: true,
      forceCanvas: true,
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
      : Engine.create({ enableSleeping: true })

    this.physicsEngine.world.gravity.scale = 0

    this.centerOfGravity = Bodies.circle((this.dims.w / 3) * 2, this.dims.h / 2, 0, {
      mass: 400,
      isStatic: true,
      plugin: {
        isCenterOfGravity: true,
        attractors: [
          (bodyA, bodyB) => ({
            x: (bodyA.position.x - bodyB.position.x) * 0.5e-4,
            y: (bodyA.position.y - bodyB.position.y) * 0.5e-4,
          }),
        ],
      },
    })

    const {
      Sprite,
      Graphics,
    } = PIXI

    const g = new Graphics({ nativeLines: true })
    this.graphicsContext = g
    this.app.stage.addChild(g)

    const bodies = Object
      .entries(this.props.skills)
      .filter(([ , { type }]) => type === DEV_SKILLS)
      .map(([key, { points }]) => {
        const mass = points * 10
        const imageScaleAmount = mass / 175
        const x = Math.random() * this.dims.w
        const y = Math.random() * this.dims.h

        const sprite = new Sprite.fromImage(`/static/img/skill-icons/${key}.svg`)
        sprite.transform.scale.x = imageScaleAmount
        sprite.transform.scale.y = imageScaleAmount
        sprite.anchor.set(0.5)
        sprite.addChild(sprite)
        sprite.key = key

        this.app.stage.addChild(sprite)
        this.sprites[key] = sprite
        return Bodies.circle(x, y, mass, {
          mass,
          restitution: 1,
          render: {
            sprite,
          },
        })
      })

    const mouse = Mouse.create(this.canvasRef)
    const mouseConstraint = MouseConstraint.create(this.physicsEngine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

    let lastClickedTime // TODO look into a way of doing this without let.
    let lastClickedBody

    Events.on(mouseConstraint, 'mousedown', ({ source: { body } }) => {
      lastClickedTime = performance.now()
      lastClickedBody = body
    })

    Events.on(mouseConstraint, 'mouseup', ({ mouse: { mousedownPosition } }) => {
      try {
        if ((performance.now() - lastClickedTime) < 300) {
          this.props.showDetailModal({
            id: lastClickedBody.render.sprite.key,
          })
        }
      } catch (err) {
        //
      }
    })

    World.add(this.physicsEngine.world, [
      this.centerOfGravity,
      mouseConstraint,
      ...bodies,
    ])

    this.animate(0)
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    const bodies = Composite.allBodies(this.physicsEngine.world)
    const g = this.graphicsContext
    g.clear()
    g.lineStyle(1, 0x333333)
    g.beginFill(0x000000, 0)

    for (let i = 0; i < bodies.length; i += 1) {
      const body = bodies[i]
      if (body.plugin.isCenterOfGravity) continue
      this.graphicsContext.drawCircle(
        body.position.x,
        body.position.y,
        body.mass,
      )

      body.render.sprite.x = body.position.x
      body.render.sprite.y = body.position.y
    }

    this.graphicsContext.endFill()

    Engine.update(this.physicsEngine)
  }

  render = () => (
    <canvas
      className="DevSkillsScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default DevSkillsScene
