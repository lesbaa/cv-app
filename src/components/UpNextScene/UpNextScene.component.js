/* eslint-env browser */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UP_NEXT } from '~/constants/skillTypes'
import { pixiConnect } from '~/HOCs/withReduxStore'
import { Style3D } from '~/modules/threedux/Style3D'
import styles from './UpNextScene.styles'

let PIXI

class UpNextScene extends Component {

  skillsSprites = []

  activeSkill = 0

  componentDidMount = async () => {
    PIXI = await import('pixi.js')
    await this.props.fetchSkills({ type: UP_NEXT })
    this.init()
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.frameId)
    clearInterval(this.interval)

    this.app.ticker.stop()

    this.app.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    })
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

    await this.initFilter()

    this.addSkillsText()

    this.animate(0)
  }

  initFilter = async () => {
    const { default: liquidShader } = await import('~/shaders/liquidMorph')
    const { default: hatchShader } = await import('~/shaders/hatch')

    this.liquidFilter = pixiConnect(
      s => s,
      d => d,
    )(new PIXI.Filter('', liquidShader.fragment, liquidShader.uniforms))

    this.app.stage.filters = [
      new PIXI.Filter(
        '',
        hatchShader.fragment,
        {
          ...hatchShader.uniforms,
          uVisibility: { type: 'f', value: 0.0 },
        },
      ),
      this.liquidFilter,
    ]

    const filterBaseClass = new Style3D({
      transition: {
        transitionProperties: [
          'uniforms',
        ],
        transitionEasingFunction: 'easeInOutCubic',
        transitionDuration: 1500,
      },
      uniforms: {
        uTransitionProgress: 1.0,
      },
    })

    this.liquidFilter.classList.add(filterBaseClass)

    this.filterTransitionClass = new Style3D({
      uniforms: {
        uTransitionProgress: -0.5,
      },
    })

    this.switchSkill()

    this.interval = setInterval(() => {
      this.switchSkill()
    }, 6000)
  }

  transitionFilterOut = () => new Promise((resolve) => {
    this.liquidFilter.classList.add(this.filterTransitionClass)
    this.liquidFilter.addEventListener('transitionEnd', this.handleTransitionEnd(resolve))
  })

  transitionFilterIn = () => {
    this.liquidFilter.classList.remove(this.filterTransitionClass)
  }

  handleTransitionEnd = resolve => () => {
    this.liquidFilter.removeEventListener('transitionEnd', this.handleTransitionEnd(resolve))
    resolve()
  }

  switchSkill = async () => {
    await this.transitionFilterOut()

    const currentSkill = this.skillsSprites[this.activeSkill]
    currentSkill.visible = false

    this.activeSkill = this.activeSkill + 1 === this.skillsSprites.length
      ? 0
      : this.activeSkill + 1

    const nextSkill = this.skillsSprites[this.activeSkill]
    nextSkill.visible = true
    this.transitionFilterIn()
  }

  addSkillsText = () => {
    // TODO abstract this out to a helper func this out to a function
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'League Spartan',
      fontSize: 60,
      fill: '#555555',
      padding: 200,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: this.dims.w * 0.33,
    })

    this.skillsSprites = this.props.skills.map(({ name }, i) => {
      const text = new PIXI.Text(name, textStyle)

      text.anchor.set(0.5)
      text.visible = false
      text.x = this.dims.w * 0.66
      text.y = this.dims.h * 0.5

      this.app.stage.addChild(text)
      return text
    })
  }

  animate = (t) => {
    this.frameId = requestAnimationFrame(this.animate)
    for (let i = 0; i < this.app.stage.filters.length; i++) {
      if (this.app.stage.filters[i].tick) this.app.stage.filters[i].tick(t)
      this.app.stage.filters[i].uniforms.uTime += 0.005
    }
  }

  render = () => {
    const canvasClassName = [
      'UpNextScene',
      'anim-scene',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <canvas
        className={canvasClassName}
        ref={this.setCanvasRef}
      >
        <style jsx>{styles}</style>
      </canvas>
    )
  }
}

UpNextScene.propTypes = {
  skills: PropTypes.array,
  fetchSkills: PropTypes.func,
}

UpNextScene.defaultProps = {
  skills: [],
  fetchSkills: () => console.log('DevSkillsScene: no "fetchSkills" action passed'),
}


export default UpNextScene
