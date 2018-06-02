/* eslint-env browser */
import React, { Component } from 'react'

import Box from '~/utils/graphicsClasses/MovingBox.class'
import createGridLoader from '~/utils/imgHelpers'
import styles from './HelloScene.styles'

class HelloScene extends Component {

  componentDidMount = () => {
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)
    this.ctx = null
    this.canvasRef = null
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  boxes = []

  init = async () => {
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight
    this.ctx = this.canvasRef.getContext('2d')
    this.ctx.lineWidth = 2
    this.ctx.globalAlpha = 0.5
    this.ctx.fillStyle = '#444'

    const gridLoader = createGridLoader({
      position: {
        x: (this.canvasRef.width / 3) * 2,
        y: this.canvasRef.height / 2,
      },
      density: 0.5,
      scale: 7,
    })
    const emitterGrid = await gridLoader('/static/img/hello.png')
    for (let i = 0; i < emitterGrid.length; i += 1) {
      const { x, y } = emitterGrid[i]
      this.boxes.push(new Box({
        x,
        y,
        ctx: this.ctx,
        dy: -0.7,
        dx: 0,
        lifeSpan: 70 * Math.random(),
      }))
    }

    this.animate(0)

  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    for (let i = 0; i < this.boxes.length; i += 1) {
      const box = this.boxes[i]
      box.update(t)
    }
  }

  render = () => (
    <canvas
      className="HelloScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default HelloScene
