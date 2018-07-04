/* eslint-env browser */
import React, { Component } from 'react'
import Matter, {
  Engine,
  World,
  Body,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Constraint,
  Vector,
} from 'matter-js'
import MatterWrap from 'matter-wrap'
import styles from './UpNextScene.styles'

Matter.use(MatterWrap)

class DevSkillsScene extends Component {

  componentDidMount = () => {
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)
    Engine.clear(this.physicsEngine)
    this.ctx = null
    this.canvasRef = null
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
    this.ctx.globalAlpha = 0.5
    this.ctx.fillStyle = '#444'

    this.physicsEngine = this.physicsEngine
      ? Engine.clear(this.physicsEngine)
      : Engine.create()

    this.physicsEngine.world.gravity.scale = 0

    this.addPlatforms()

    this.addBeastie()

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

    let t = 1

    window.addEventListener('click', () => {
      t += 1
      this.beastie.wriggle(t)
    })

    World.add(this.physicsEngine.world, [
      mouseConstraint,
    ])
    this.animate(0)
  }

  addBeastie = (segments = 20, size = 10) => {

    const arr = Array(...Array(segments))

    const bodies = arr.map((el, i) => {
      const isLastSegment = i === arr.length - 1
      const segmentWidth = isLastSegment
        ? size * 4
        : size * 3

      const segmentHeight = isLastSegment
        ? size
        : size / 2

      const segment = Bodies.circle(i * size, 0, size / 2, {})
      const leg = Bodies.rectangle(i * size, 0, segmentHeight, segmentWidth, {})
      return Body.create({
        frictionAir: 0.8,
        friction: 1,
        parts: [
          segment,
          leg,
        ],
      })
    })

    const constraints = arr.map((el, i) => {
      const bodyA = bodies[i]
      const bodyB = bodies[i + 1]
      if (!bodyB) return null

      return Constraint.create({
        bodyA,
        bodyB,
        pointA: {
          x: size / 2,
          y: 0,
        },
        pointB: {
          x: -size / 2,
          y: 0,
        },
        stiffness: 1,
        damping: 0.1,
      })
    }).filter(Boolean)

    const beastie = Composite.create({
      bodies,
      constraints,
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: this.w, y: this.h },
        },
      },
    })

    Composite.translate(beastie, { x: this.w / 2, y: this.h - 50 })

    function wriggle(delta) {
      for (let i = 0; i < this.bodies.length; i += 1) {
        const segment = this.bodies[i]
        const offset = Math.sin(i / 90)
        Body.setAngle(segment, Math.sin(delta + i) / 3)
      }
    }

    beastie.wriggle = wriggle
    this.beastie = beastie

    World.add(
      this.physicsEngine.world,
      beastie,
    )
  }

  addPlatforms = () => {
    const widthUnit = this.w / 4

    const body = Bodies.rectangle(
      this.w / 2,
      this.h - 5,
      this.w,
      10,
      {
        isStatic: true,
      }
    )

    World.add(this.physicsEngine.world, [body])
  }

  addPlatformsy = () => {
    const widthUnit = this.w / 4

    const bodies = Array(...Array(4)).map((el, i, arr) => {

      const indexIsEven = i % 2 === 0

      const x = indexIsEven
        ? widthUnit * 2.5
        : widthUnit * 3.0

      const y = (this.h / arr.length) * (i + 0.5)

      const rotation = indexIsEven
        ? 0.25
        : -0.25

      const body = Bodies.rectangle(
        x,
        y,
        widthUnit * 1.5,
        10,
        {
          isStatic: true,
        }
      )
      Body.rotate(body, rotation)
      return body
    })
    const buffer = Bodies.rectangle(
      this.w / 2 - widthUnit / 4,
      this.h / 2,
      this.h,
      10,
      {
        isStatic: true,
      }
    )

    Body.rotate(buffer, Math.PI / 2)

    World.add(this.physicsEngine.world, [...bodies, buffer])
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)

    const bodies = Composite.allBodies(this.physicsEngine.world)

    for (let i = 0; i < bodies.length; i += 1) {

      const body = bodies[i]

      this.ctx.beginPath()
      const vertices = body.vertices // eslint-disable-line

      this.ctx.moveTo(vertices[0].x, vertices[0].y)

      for (let j = 1; j < vertices.length; j += 1) {
        this.ctx.lineTo(vertices[j].x, vertices[j].y)
      }

      this.ctx.lineTo(vertices[0].x, vertices[0].y)
      this.ctx.stroke()
    }
    this.beastie.wriggle(t / 100)
    Engine.update(this.physicsEngine)
  }

  render = () => (
    <canvas
      className="UpNextScene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default DevSkillsScene
