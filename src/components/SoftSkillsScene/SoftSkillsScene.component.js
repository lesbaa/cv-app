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
import styles from './SoftSkillsScene.styles'

class DevSkillsScene extends Component {

  componentDidMount = async () => {
    await this.props.fetchSkills({ type: 'SOFT_SKILLS' })
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

    this.sprites = await this.getSprites()

    const bodies = Object
      .entries(this.props.skills)
      .filter(([ , { type }]) => type === 'SOFT_SKILLS')
      .map(([key, { points }]) => {
        const mass = points * 15

        const x = this.w * 0.66
        const y = this.h / 2

        const img = this.sprites[key]
        img.width = mass
        img.height = mass

        const body = Bodies.rectangle(
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
        Body.rotate(body, 2 * Math.random())

        return body

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
    const boundsMargin = this.w * 0.075

    return Body.create({
      isStatic: true,
      parts: [
        Bodies.rectangle(
          this.w / 3 * 2,
          boundsMargin,
          this.h,
          boundsMargin,
          { isStatic: true }
        ),
        Bodies.rectangle(
          this.w / 3 * 2,
          this.h - boundsMargin,
          this.h,
          boundsMargin,
          { isStatic: true }
        ),
  
        Bodies.rectangle(
          (this.w / 2) - boundsMargin,
          this.h / 2,
          boundsMargin,
          this.h,
          { isStatic: true }
        ),
  
        Bodies.rectangle(
          this.w - boundsMargin / 2,
          this.h / 2,
          boundsMargin,
          this.h,
          { isStatic: true }
        ),
      ],
    })
  }

  createBoundsy = () => {
    const boundsMargin = this.w * 0.075
    return Body.create({
      isStatic: true,
      parts: [
        Bodies.rectangle(
          this.w / 2,
          this.h - boundsMargin / 2,
          this.w,
          boundsMargin,
          { isStatic: true }
        ),
        Bodies.rectangle(
          this.w / 2,
          boundsMargin / 2,
          this.w,
          boundsMargin,
          { isStatic: true }
        ),
        Bodies.rectangle(
          (this.w / 2) - boundsMargin,
          this.h / 2,
          boundsMargin,
          this.h,
          { isStatic: true }
        ),
        Bodies.rectangle(
          this.w - boundsMargin / 2,
          this.h / 2,
          boundsMargin,
          this.h,
          { isStatic: true }
        ),
      ],
    })
  
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    const bodies = Composite.allBodies(this.physicsEngine.world)

    for (let i = 0; i < bodies.length; i += 1) {

      const body = bodies[i]
      const sprite = body.render.sprite // eslint-disable-line
      if (sprite.img) {

        this.ctx.beginPath()
        const vertices = bodies[i].vertices // eslint-disable-line

        this.ctx.moveTo(vertices[0].x, vertices[0].y)

        for (let j = 1; j < vertices.length; j += 1) {
          this.ctx.lineTo(vertices[j].x, vertices[j].y)
        }

        this.ctx.lineTo(vertices[0].x, vertices[0].y)
        this.ctx.stroke()

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

    }
    if (this.bounds) Body.rotate(this.bounds, -0.005)
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
