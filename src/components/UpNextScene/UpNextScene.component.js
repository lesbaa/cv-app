/* eslint-env browser */
import React, { Component } from 'react'
import { UP_NEXT } from '~/constants/skillTypes'
import styles from './UpNextScene.styles'

let PIXI

class DevSkillsScene extends Component {

  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: UP_NEXT })
    this.init()
    console.log(this.context, this.props)
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)
    cancelAnimationFrame(this.frameId)
    this.ctx = null
    this.canvasRef = null
    this.app.ticker.stop()
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
  }

  init = async () => {
    this.canvasRef.width = window.innerWidth
    this.canvasRef.height = window.innerHeight

    this.w = window.innerWidth
    this.h = window.innerHeight

    this.animate(0)
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
  }

  render = () => (
    <canvas
      className="UpNextScene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )
  // TODO proptypes
}

export default DevSkillsScene
