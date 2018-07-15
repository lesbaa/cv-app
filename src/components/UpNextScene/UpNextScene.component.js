/* eslint-env browser */
import React, { Component } from 'react'
import { UP_NEXT } from '~/constants/skillTypes'
import { pixiConnect } from '~/HOCs/withReduxStore'
import { Style3D } from '~/modules/threedux/Style3D'
import styles from './UpNextScene.styles'

let PIXI

class DevSkillsScene extends Component {

  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: UP_NEXT })
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
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

    const g = new PIXI.Graphics()
    g.beginFill(0xff4400, 1)
    g.drawRect(this.app.screen.width * 0.66, this.app.screen.height / 2, 100, 100)
    g.endFill()

    this.app.stage.addChild(g)

    this.g = pixiConnect(
      s => s,
      d => d,
    )(g)

    const pixiClass = new Style3D({
      transition: {
        transitionProperties: [
          'position',
        ],
        transitionEasingFunction: 'elasticOut',
        transitionDuration: 1000,
      },
      position: {
        x: 50,
        y: 50,
      },
    })

    const movedClass = new Style3D({
      position: {
        x: this.app.screen.width * 0.66,
        y: this.app.screen.height / 2,
      },
    })

    this.g.classList.add(pixiClass)

    setInterval(() => {
      this.g.classList.toggle(movedClass)
      window.g = this.g
    }, 1000)
  
    this.animate(0)
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.g.tick(t)
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
