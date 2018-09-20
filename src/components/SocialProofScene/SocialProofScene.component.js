/* eslint-env browser */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TYPES from '~/constants/types'
import {
  withStateTransition,
  Style3D,
} from '~/lib/threedux'
import styles from './SocialProofScene.styles'

class SocialProofScene extends Component {

  activeReference = 0

  componentDidMount = async () => {
    await this.props.fetchReferences()
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
    this.app = new this.props.PIXI.Application({
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

    this.liquidFilter = withStateTransition(
      new this.props.PIXI.Filter('', liquidShader.fragment, liquidShader.uniforms)
    )

    this.app.stage.filters = [
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
    }, 15000)
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

    const currentSkill = this.referencesSprites[this.activeReference]
    currentSkill.visible = false

    this.activeReference = this.activeReference + 1 === this.referencesSprites.length
      ? 0
      : this.activeReference + 1

    const nextSkill = this.referencesSprites[this.activeReference]
    nextSkill.visible = true
    this.transitionFilterIn()
  }

  addSkillsText = () => {
    const fontSize = this.dims.h * 0.02

    const quoteTextStyle = new this.props.PIXI.TextStyle({
      fontFamily: 'RobotoMono',
      fontWeight: '300',
      fontSize,
      lineHeight: fontSize * 1.5,
      align: 'left',
      fill: '#555555',
      padding: 50,
      wordWrap: true,
      wordWrapWidth: this.dims.w * 0.40,
    })

    const baseTextStyle = {
      fontSize,
      padding: 20,
      lineHeight: fontSize,
      align: 'right',
      fill: '#555555',
    }

    const personNameTextStyle = new this.props.PIXI.TextStyle({
      ...baseTextStyle,
      fontFamily: 'League Spartan',

    })

    const relationshipTextStyle = new this.props.PIXI.TextStyle({
      ...baseTextStyle,
      fontFamily: 'RobotoMono',
      fontSize: 0.7 * fontSize,
    })

    this.referencesSprites = this.props.references.map(({
      reference,
      name,
      currentPosition,
      relationship,
    }) => {
      const textContainer = new this.props.PIXI.Container()
      textContainer.visible = false

      const quoteText = new this.props.PIXI.Text(`"${reference}"`, quoteTextStyle)
      quoteText.x = 0
      quoteText.y = 0
      textContainer.addChild(quoteText)

      const personNameText = new this.props.PIXI.Text(`- ${name}`, personNameTextStyle)
      personNameText.y = quoteText.height
      personNameText.x = quoteText.width - personNameText.width
      textContainer.addChild(personNameText)

      const relationshipText = new this.props.PIXI.Text(relationship, relationshipTextStyle)
      relationshipText.y = quoteText.height + personNameText.height
      relationshipText.x = quoteText.width - relationshipText.width
      textContainer.addChild(relationshipText)

      textContainer.pivot = new this.props.PIXI.Point(
        textContainer.width / 2,
        quoteText.height / 2,
      )

      textContainer.x = this.dims.w * 0.7
      textContainer.y = this.dims.h * 0.5

      this.app.stage.addChild(textContainer)
      return textContainer
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
      'SocialProofScene',
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

SocialProofScene.propTypes = {
  references: PropTypes.arrayOf(TYPES.REFERENCE),
  fetchReferences: PropTypes.func,
  PIXI: PropTypes.object,
}

SocialProofScene.defaultProps = {
  references: [],
  fetchReferences: () => console.log('SocialProofScene: no "fetchSkills" action passed'),
}


export default SocialProofScene
