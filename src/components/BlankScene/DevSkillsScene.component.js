/* eslint-env browser */
import React, { Component } from 'react'

import styles from './DevSkillsScene.styles'

class DevSkillsScene extends Component {

  componentDidMount = () => {
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.animate)
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
    // set up in here
    this.animate(0)

  }

  animate = (t) => {
    requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    // do stuff in here
  }

  render = () => (
    <canvas
      className="DevSkillsScene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

export default DevSkillsScene
