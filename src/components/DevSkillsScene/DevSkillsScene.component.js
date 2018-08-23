/* eslint-env browser */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import { loadImg } from '~/utils/imgHelpers'
import { DEV_SKILLS } from '~/constants/skillTypes'
import styles from './DevSkillsScene.styles'

Matter.use(MatterAttractors)

let PIXI

class DevSkillsScene extends Component {
  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: DEV_SKILLS })

    await Promise.all(Object
      .entries(this.props.skills)
      .filter(([ , { type }]) => type === DEV_SKILLS)
      .map(([key]) => loadImg(`/static/img/skill-icons/${key}.svg`))
    )

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

  init = async () => {
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight
    this.app = new PIXI.Application({
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
      Container,
    } = PIXI

    const bodies = Object
      .entries(this.props.skills)
      .filter(([, { type }]) => type === DEV_SKILLS)
      .map(([key, { points }], i) => {
        loadImg(`/static/img/skill-icons/${key}.svg`)
        const mass = points * 10
        const imageScaleAmount = mass / 170

        const heightModifier = (i % 2 === 0) ? -1 : 1

        const x = Math.random() * this.dims.w
        const y = Math.random() * this.dims.h + (heightModifier * this.dims.h)

        const sprite = new Sprite.fromImage(`/static/img/skill-icons/${key}.svg`)
        sprite.transform.scale.x = imageScaleAmount
        sprite.transform.scale.y = imageScaleAmount
        sprite.anchor.set(0.5)
        sprite.addChild(sprite)

        const g = new Graphics({ nativeLines: true })
        g.lineStyle(1, 0x333333)
        g.beginFill(0x000000, 0)
        g.drawCircle(
          0,
          0,
          mass * 0.99,
        )
        g.endFill()

        const container = new Container()
        container.x = x
        container.y = y
        container.addChild(g)
        container.addChild(sprite)
        container.key = key

        this.app.stage.addChild(container)

        return Bodies.circle(x, y, mass, {
          mass,
          restitution: 1,
          render: {
            sprite: container,
          },
        })
      })

    const mouse = Mouse.create(this.canvasRef)
    this.mouseConstraint = MouseConstraint.create(this.physicsEngine, {
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

    Events.on(this.mouseConstraint, 'mousedown', ({ source: { body } }) => {
      lastClickedTime = performance.now()
      lastClickedBody = body
    })

    Events.on(this.mouseConstraint, 'mouseup', ({ mouse: { mousedownPosition } }) => {
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
      this.mouseConstraint,
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
      if (body.plugin.isCenterOfGravity) continue

      body.render.sprite.x = body.position.x
      body.render.sprite.y = body.position.y
    }

    Engine.update(this.physicsEngine)
  }

  render = () => {
    const canvasClassName = [
      'DevSkillsScene',
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

DevSkillsScene.propTypes = {
  skills: PropTypes.array,
  showDetailModal: PropTypes.func,
  fetchSkills: PropTypes.func,
}

DevSkillsScene.defaultProps = {
  skills: [],
  showDetailModal: () => console.log('DevSkillsScene: no "showDetailModal" action passed'),
  fetchSkills: () => console.log('DevSkillsScene: no "fetchSkills" action passed'),
}

export default DevSkillsScene
