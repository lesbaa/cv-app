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

    this.centerOfGravity = Bodies.circle((this.w / 3) * 2, this.h / 2, 0, {
      mass: 400,
      isStatic: true,
      plugin: {
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
      Container,
      Graphics,
    } = PIXI

    const bodies = Object
      .entries(this.props.skills)
      .filter(([ , { type }]) => type === DEV_SKILLS)
      .map(([key, { points }]) => {
        const mass = points * 10

        const x = Math.random() * this.w
        const y = Math.random() * this.h

        const g = new Graphics()
        g.beginFill(0x000000, 0)
        g.lineStyle(0x333333, 1)
        g.drawCircle(0, 0, 20)
        g.endFill()

        const sprite = new Sprite.fromImage(`/static/img/skill-icons/${key}.svg`)
        sprite.scale.x = 0.01
        sprite.scale.y = 0.01
        // const sprite = new Container()
        // sprite.addChild(g)
        // sprite.addChild(image)

        this.app.stage.addChild(sprite)

        return Bodies.circle(x, y, mass, {
          mass,
          restitution: 1,
          render: {
            sprite,
          },
        })
      })

    const g = new Graphics()
    g.beginFill(0x000000, 0)
    g.lineStyle(0x333333, 1)
    g.drawCircle(30, 30, 2)
    g.endFill()
    this.app.stage.addChild(g)
    debugger
    // const mouse = Mouse.create(this.canvasRef)
    // const mouseConstraint = MouseConstraint.create(this.physicsEngine, {
    //   mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false,
    //     },
    //   },
    // })

    let lastClickedTime // TODO look into a way of doing this without let.
    let lastClickedBody

    // Events.on(mouseConstraint, 'mousedown', ({ source: { body } }) => {
    //   lastClickedTime = performance.now()
    //   lastClickedBody = body
    // })

    // Events.on(mouseConstraint, 'mouseup', ({ mouse: { mousedownPosition } }) => {
    //   try {
    //     if ((performance.now() - lastClickedTime) < 300) {
    //       this.props.showDetailModal({
    //         id: lastClickedBody.render.sprite.key,
    //       })
    //     }
    //   } catch (err) {
    //     //
    //   }
    // })

    World.add(this.physicsEngine.world, [
      this.centerOfGravity,
      // mouseConstraint,
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

    for (let i = 0; i < bodies.length; i += 1) {

      const body = bodies[i]
      body.render.sprite.x = body.position.x
      body.render.sprite.y = body.position.y
    }

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
