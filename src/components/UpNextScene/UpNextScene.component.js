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
    g.drawRect(0, 0, 100, 100)
    g.endFill()

    this.app.stage.addChild(g)

    this.g = pixiConnect(
      s => s,
      d => d,
    )(g)

    const pixiClass = new Style3D({
      transition: {
        transitionProperties: [
          'rotation',
          'position',
        ],
        transitionEasingFunction: 'elasticOut',
        transitionDuration: 1000,
      },
      rotation: 0.0,
      position: { x: 0, y: 0 },
    })

    const movedClass = new Style3D({
      rotation: 1.0,
      position: { x: 500, y: 500 },
    })

    this.g.classList.add(pixiClass)
    this.g.classList.add(movedClass)

    // setInterval(() => {
    //   this.g.classList.toggle(movedClass)
    //   window.g = this.g
    // }, 1400)

    const { default: customShader } = await import('~/shaders/liquidMorph')

    const f = new PIXI.Filter('', customShader.fragment, customShader.uniforms)

    this.filter = pixiConnect(
      s => s,
      d => d,
    )(f)

    // this.filter = f

    this.app.stage.filters = [
      this.filter,
    ]


    const filterBaseClass = new Style3D({
      transition: {
        transitionProperties: [
          'uniforms',
        ],
        transitionEasingFunction: 'easeInOutQuart',
        transitionDuration: 3000,
      },
      uniforms: {
        uTransitionProgress: 1.0,
      },
    })

    this.filter.classList.add(filterBaseClass)
    this.filter.addEventListener('transitionEnd', console.log)
    const filterTransClass = new Style3D({
      uniforms: {
        uTransitionProgress: -0.5,
      },
    })

    setInterval(() => {
      this.filter.classList.toggle(filterTransClass)
      window.filty = this.filter
    }, 4000)

    this.animate(0)
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    this.g.tick(t)
    this.filter.tick(t)
    this.filter.uniforms.uTime += 0.01
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
