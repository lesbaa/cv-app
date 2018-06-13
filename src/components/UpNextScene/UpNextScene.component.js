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

    this.addPlatforms()

    Array(...Array(10)).forEach(this.addCar)

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
      mouseConstraint,
    ])
    this.animate(0)
  }

  addCar = (e, i, arr) => {

    const circle = Bodies.circle(
      this.w * 0.8,
      (this.h / arr.length) * (i + 1),
      30,
      {
        plugin: {
          wrap: {
            min: { x: 0, y: 0 },
            max: { x: this.w, y: this.h },
          },
        },
        mass: 100,
      }
    )

    World.add(
      this.physicsEngine.world,
      circle,
    )
  }

  addPlatforms = () => {
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

    // const constraints = Composite.allConstraints(this.physicsEngine.world)

    // for (let i = 0; i < constraints.length; i += 1) {

    //   const constraint = constraints[i]
    //   const { bodyA, bodyB, pointA, pointB } = constraint

    //   const start = Vector.add(bodyA.position, pointA)
    //   this.ctx.beginPath()
    //   this.ctx.moveTo(start.x, start.y)

    //   const end = Vector.add(bodyB.position, pointB)
    //   this.ctx.lineTo(end.x, end.y)

    //   this.ctx.stroke()
    // }

    // Body.rotate(this.spindleOne, 0.01)
    // Body.rotate(this.spindleTwo, 0.01)
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
