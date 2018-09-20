/* eslint-env browser */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TYPES from '~/constants/types'
import {
  withStateTransition,
  Style3D,
} from '~/lib/threedux'
import styles from './SocialProofScene.styles'

// TODO this is a rather large component
// it needs a good refactor Les

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

    this.addReferencesText()

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

    this.switchReference(false)

    this.interval = setInterval(() => {
      this.switchReference()
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

  switchReference = async (shouldIncrement = true) => {
    await this.transitionFilterOut()

    const currentReference = this.referencesSprites[this.activeReference]
    currentReference.visible = false

    if (shouldIncrement) {
      this.activeReference = this.activeReference + 1 === this.referencesSprites.length
        ? 0
        : this.activeReference + 1
    }

    const nextReference = this.referencesSprites[this.activeReference]
    nextReference.visible = true
    this.transitionFilterIn()
  }

  addReferencesText = () => {
    // TODO refactor this, could be a bit dryer
    const { PIXI } = this.props

    const fontSize = this.dims.h * 0.02

    const referenceTextStyle = new PIXI.TextStyle({
      fontFamily: 'RobotoMono',
      fontWeight: '300',
      fontSize,
      lineHeight: fontSize * 1.75,
      align: 'left',
      fill: '#3d3d3d',
      padding: 100,
      wordWrap: true,
      letterSpacing: 1,
      wordWrapWidth: this.dims.w * 0.40,
    })

    const baseTextStyle = {
      fontSize,
      padding: 20,
      lineHeight: fontSize,
      align: 'right',
      fill: '#3d3d3d',
    }

    const personNameTextStyle = new PIXI.TextStyle({
      ...baseTextStyle,
      fontSize: fontSize * 1.5,
      fontFamily: 'League Spartan',
    })

    const relationshipTextStyle = new PIXI.TextStyle({
      ...baseTextStyle,
      fontFamily: 'RobotoMono',
      fontSize: 0.9 * fontSize,
    })

    this.referencesSprites = this.props.references.map(({
      reference,
      name,
      currentPosition,
      relationship,
    }) => {
      const textContainer = new PIXI.Container()
      textContainer.visible = false

      const createTextObject = this.createPixiTextCreator(textContainer)

      const referenceText = createTextObject({
        text: reference,
        style: referenceTextStyle,
      })

      const personNameText = createTextObject({
        text: `- ${name}`,
        style: personNameTextStyle,
        y: referenceText.height + fontSize,
      })

      personNameText.x = referenceText.width - personNameText.width

      const relationshipText = createTextObject({
        text: relationship,
        style: relationshipTextStyle,
        y: referenceText.height + personNameText.height + fontSize,
      })

      relationshipText.x = referenceText.width - relationshipText.width

      textContainer.pivot = new PIXI.Point(
        referenceText.width / 2,
        referenceText.height / 2,
      )

      textContainer.x = this.dims.w * 0.66
      textContainer.y = this.dims.h * 0.5

      const quoteMarkStyle = {
        ...personNameTextStyle,
        fontSize: 50,
      }

      const openingQuote = createTextObject({
        text: '“',
        x: 0,
        y: 0,
        style: quoteMarkStyle,
      })

      openingQuote.x = -10 - openingQuote.width
      openingQuote.y = -10 - openingQuote.height / 2

      createTextObject({
        text: '”',
        x: referenceText.width + 10,
        y: referenceText.height + personNameText.height + relationshipText.height + 10,
        style: quoteMarkStyle,
      })

      this.app.stage.addChild(textContainer)
      return textContainer
    })
  }

  createPixiTextCreator = container => ({
    text,
    style,
    x = 0,
    y = 0,
  }) => {
    const { PIXI } = this.props
    const textObject = new PIXI.Text(text, style)
    textObject.x = x
    textObject.y = y
    if (container) container.addChild(textObject)
    return textObject
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
