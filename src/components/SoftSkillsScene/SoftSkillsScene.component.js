/* eslint-env browser */
import React, { Component } from 'react'

import { loadImg } from '~/utils/imgHelpers'
import { SOFT_SKILLS } from '~/constants/skillTypes'
import styles from './SoftSkillsScene.styles'

class DevSkillsScene extends Component {

  componentDidMount = async () => {
    await this.props.fetchSkills({ type: SOFT_SKILLS })
    await this.init()
  }

  componentWillUnmount = async () => {
    cancelAnimationFrame(this.frameId)
    this.ctx = null
    this.canvasRef = null
  }

  getSprites = async () => {
    const sprites = Object
      .keys(this.props.skills)
      .reduce((acc, key) => {
        acc.sprites.push(loadImg(`/static/img/soft-skills/${key}.svg`)) // TODO load correct img
        acc.keys.push(key)
        return acc
      }, {
        sprites: [],
        keys: [],
      })

    const images = await Promise.all(sprites.sprites)

    return sprites.keys.reduce((acc, key, i) => {
      acc[key] = images[i]
      return acc
    }, {})
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
      className="SoftSkillsScene anim-scene"
      ref={this.setCanvasRef}
    >
      <style jsx>{styles}</style>
    </canvas>
  )

}

// TODO proptypes / default props tests

export default DevSkillsScene
