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
import { getDevSkills } from '~/utils/api'
import { loadImg } from '~/utils/imgHelpers'
import styles from './DevSkillsScene.styles'

Matter.use(MatterAttractors)

class DevSkillsScene extends Component {

  componentDidMount = async () => {
    await this.init()
  }

  componentWillUnmount = async () => {
    cancelAnimationFrame(this.frameId)
    Engine.clear(this.physicsEngine)
    this.ctx = null
    this.canvasRef = null
  }

  getSprites = async () => {
    const sprites = Object
      .keys(this.skills)
      .reduce((acc, key) => {
        acc.sprites.push(loadImg(`/static/img/skill-icons/${key}.svg`)) // TODO load correct img
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
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight

    this.w = window.innerWidth
    this.h = window.innerHeight

    this.ctx = this.canvasRef.getContext('2d')
    this.ctx.lineWidth = 1
    this.ctx.globalAlpha = 1
    this.ctx.strokeStyle = '#333'

    this.physicsEngine = this.physicsEngine
      ? Engine.clear(this.physicsEngine)
      : Engine.create({ enableSleeping: true })

    this.physicsEngine.world.gravity.scale = 0

    this.centerOfGravity = Bodies.circle((this.w / 3) * 2, this.h / 2, 0, {
      mass: 400,
      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 0.5e-4,
              y: (bodyA.position.y - bodyB.position.y) * 0.5e-4,
            }
          },
        ],
      },
    })

    this.skills = await getDevSkills({}) // TODO this should be moved to props / actions

    this.sprites = await this.getSprites()

    const bodies = Object
      .entries(this.skills)
      .map(([key, { points }]) => {
        const mass = points * 10

        const x = Math.random() * this.w
        const y = Math.random() * this.h

        const img = this.sprites[key]
        img.width = mass
        img.height = mass

        return Bodies.circle(x, y, mass, {
          mass,
          restitution: 1,
          render: {
            sprite: {
              img,
              key,
            },
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
          this.props.showSkillDetailModal({
            skillId: lastClickedBody.render.sprite.key,
            x: mousedownPosition.x,
            y: mousedownPosition.y,
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

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    const bodies = Composite.allBodies(this.physicsEngine.world)

    for (let i = 0; i < bodies.length; i += 1) {

      const body = bodies[i]
      const sprite = body.render.sprite // eslint-disable-line
      const mass = body.mass * 0.95
      this.ctx.translate(body.position.x, body.position.y)
      if (sprite.img) {
        this.ctx.beginPath()
        this.ctx.ellipse(0, 0, mass, mass, 0, 0, Math.PI * 2, false)
        this.ctx.stroke()
        this.ctx.drawImage(
          sprite.img,
          sprite.img.width / -2,
          sprite.img.height / -2.01,
          sprite.img.width,
          sprite.img.height
        )
      }
      this.ctx.translate(-body.position.x, -body.position.y)

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
