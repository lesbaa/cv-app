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
} from 'matter-js'
import { getDevSkills } from '~/utils/api'
import { loadImg } from '~/utils/imgHelpers'
import styles from './SoftSkillsScene.styles'

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

    this.bounds = this.createBounds()

    this.skills = await getDevSkills({}) // TODO this should be moved to props / actions

    this.sprites = await this.getSprites()

    const bodies = Object
      .entries(this.skills)
      .map(([key, { points }]) => {
        const mass = points * 15

        const x = Math.random() * (this.w / 2) + this.w / 2
        const y = Math.random() * -2000 - this.h

        const img = this.sprites[key]
        img.width = mass
        img.height = mass

        return Bodies.rectangle(
          x,
          y,
          mass,
          mass,
          {
            restitution: 0.3,
            render: {
              sprite: {
                img,
                key,
              },
            },
          }
        )
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
      this.bounds,
      mouseConstraint,
      ...bodies,
    ])

    this.animate(0)
  }

  createBounds = () => {
    const composite = Composite.create({ isStatic: true })
    const boundsMargin = this.w * 0.075
    const bodies = [
      Bodies.rectangle(
        this.w / 2,
        this.h - (this.h / 4),
        this.w,
        30,
        { isStatic: true }
      ),

      Bodies.rectangle(
        (this.w / 2) - boundsMargin,
        this.h / 3,
        boundsMargin,
        this.h - (this.h / 4),
        { isStatic: true }
      ),

      Bodies.rectangle(
        this.w - boundsMargin / 2,
        this.h / 3,
        boundsMargin,
        this.h - (this.h / 4),
        { isStatic: true }
      ),
    ]
    return Composite.add(composite, bodies)
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    const bodies = Composite.allBodies(this.physicsEngine.world)

    for (let i = 0; i < bodies.length; i += 1) {

      const body = bodies[i]
      const sprite = body.render.sprite // eslint-disable-line
      const mass = body.mass * 0.95

      if (sprite.img) {
        this.ctx.beginPath()
        const vertices = bodies[i].vertices // eslint-disable-line

        this.ctx.moveTo(vertices[0].x, vertices[0].y)

        for (let j = 1; j < vertices.length; j += 1) {
          this.ctx.lineTo(vertices[j].x, vertices[j].y)
        }

        this.ctx.lineTo(vertices[0].x, vertices[0].y)

        this.ctx.translate(body.position.x, body.position.y)
        this.ctx.rotate(body.angle)
        this.ctx.drawImage(
          sprite.img,
          sprite.img.width / -2,
          sprite.img.height / -2.01,
          sprite.img.width,
          sprite.img.height
        )
        this.ctx.rotate(-body.angle)
        this.ctx.translate(-body.position.x, -body.position.y)
      }
      this.ctx.stroke()

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

export default DevSkillsScene
