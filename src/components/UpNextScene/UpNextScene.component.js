/* eslint-env browser */
import React, { Component } from 'react'
import Matter, {
  Engine,
  World,
  Body,
  Bodies,
  Composite,
  Composites,
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
    this.addCar()
    // set up in here
    this.animate(0)
  }

  addCar = () => {
    const car = Composites.car(
      this.w / 4 * 2.5,
      0,
      100,
      20,
      23,
    )

    car.plugin.wrap = {
      min: { x: 0, y: 0 },
      max: { x: this.w, y: this.h },
    }

    World.add(
      this.physicsEngine.world,
      car
    )
  }

  addPlatforms = () => {

    const bodies = Array(...Array(4)).map((el, i, arr) => {
      const widthUnit = this.w / 4

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

    World.add(this.physicsEngine.world, bodies)
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

    if (this.bounds) Body.rotate(this.bounds, 0.005)
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
